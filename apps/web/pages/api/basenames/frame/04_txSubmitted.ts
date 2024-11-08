import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { ActionType, ComponentType } from 'libs/base-ui/utils/logEvent';
import { getTransactionStatus } from 'apps/web/src/utils/frames/basenames';
import logServerSideEvent, { generateDeviceId } from 'apps/web/src/utils/logServerSideEvent';
import { logger } from 'apps/web/src/utils/logger';
import {
  txSucceededFrame,
  txRevertedFrame,
} from 'apps/web/pages/api/basenames/frame/frameResponses';
import { NEYNAR_API_KEY } from 'apps/web/pages/api/basenames/frame/constants';
import { CHAIN } from 'apps/web/pages/api/basenames/frame/constants';
import type { TxFrameStateType } from 'apps/web/pages/api/basenames/frame/tx';

if (!NEYNAR_API_KEY) {
  throw new Error('missing NEYNAR_API_KEY');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `TxSuccess Screen — Method (${req.method}) Not Allowed` });
  }
  const deviceId = generateDeviceId(req);

  try {
    const eventName = 'tx_submitted';
    const eventProperties = {
      action: ActionType.click,
      context: 'basenames_claim_frame',
      componentType: ComponentType.button,
    };

    logServerSideEvent(eventName, deviceId, eventProperties);
  } catch (error) {
    logger.error('Could not log event:', error);
  }

  const body = req.body as FrameRequest;
  const transactionId: string | undefined = body?.untrustedData?.transactionId;
  let message;
  let isValid;
  let name;

  try {
    if (body.trustedData) {
      const result = await getFrameMessage(body, {
        neynarApiKey: NEYNAR_API_KEY,
      });
      isValid = result.isValid;
      message = result.message;
      if (!isValid) {
        throw new Error('Message is not valid');
      }
      if (!message) {
        throw new Error('No message received');
      }
    }

    const messageState = JSON.parse(
      decodeURIComponent(message?.state?.serialized ?? body.untrustedData.state),
    ) as TxFrameStateType;
    if (!messageState) {
      throw new Error('No message state received');
    }
    name = messageState.targetName;

    if (!transactionId) {
      throw new Error('transactionId is not valid');
    }
    const txStatus = await getTransactionStatus(CHAIN, transactionId);
    if (txStatus !== 'success') {
      try {
        const eventName = 'tx_reverted';
        const eventProperties = {
          action: ActionType.process,
          context: 'basenames_claim_frame',
          componentType: ComponentType.service_worker,
        };

        logServerSideEvent(eventName, deviceId, eventProperties);
      } catch (error) {
        logger.error('Could not log event:', error);
      }

      return res
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .send(txRevertedFrame(txStatus as string, transactionId));
    }

    try {
      const eventName = 'tx_succeeded';
      const eventProperties = {
        action: ActionType.process,
        context: 'basenames_claim_frame',
        componentType: ComponentType.service_worker,
      };

      logServerSideEvent(eventName, deviceId, eventProperties);
    } catch (error) {
      logger.error('Could not log event:', error);
    }

    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(txSucceededFrame(name, transactionId));
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
