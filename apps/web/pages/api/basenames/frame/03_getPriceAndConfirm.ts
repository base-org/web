import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { ActionType, ComponentType } from 'libs/base-ui/utils/logEvent';
import logServerSideEvent, { generateDeviceId } from 'apps/web/src/utils/logServerSideEvent';
import { logger } from 'apps/web/src/utils/logger';
import {
  confirmationFrame,
  buttonIndexToYears,
} from 'apps/web/pages/api/basenames/frame/frameResponses';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';

type ButtonIndex = 1 | 2 | 3 | 4;
const validButtonIndexes: readonly ButtonIndex[] = [1, 2, 3, 4] as const;

type GetBasenameRegistrationPriceResponseType = {
  registrationPriceInWei: string;
  registrationPriceInEth: string;
};

type ConfirmationFrameStateType = {
  targetName: string;
  formattedTargetName: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Confirm Screen — Method (${req.method}) Not Allowed` });
  }

  try {
    const eventName = 'selected_years';
    const deviceId = generateDeviceId(req);
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
  const { untrustedData } = body;
  const messageState = JSON.parse(
    decodeURIComponent(untrustedData.state),
  ) as ConfirmationFrameStateType;
  const targetName = encodeURIComponent(messageState.targetName);
  const formattedTargetName = messageState.formattedTargetName;

  const buttonIndex = untrustedData.buttonIndex as ButtonIndex;
  if (!validButtonIndexes.includes(buttonIndex)) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  const targetYears = buttonIndexToYears[buttonIndex];

  const getRegistrationPriceResponse = await fetch(
    `${DOMAIN}/api/basenames/${targetName}/getBasenameRegistrationPrice?years=${targetYears}`,
  );
  const getRegistrationPriceResponseData = await getRegistrationPriceResponse.json();
  const { registrationPriceInWei, registrationPriceInEth } =
    getRegistrationPriceResponseData as GetBasenameRegistrationPriceResponseType;

  try {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(
        confirmationFrame(
          targetName,
          formattedTargetName,
          targetYears,
          registrationPriceInWei,
          registrationPriceInEth,
        ),
      );
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
