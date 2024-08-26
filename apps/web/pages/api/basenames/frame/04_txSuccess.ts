import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { txSuccessFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';
import { NEYNAR_API_KEY } from 'apps/web/pages/api/basenames/frame/constants';
import type { TxFrameStateType } from 'apps/web/pages/api/basenames/frame/tx';

if (!NEYNAR_API_KEY) {
  throw new Error('missing NEYNAR_API_KEY');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `TxSuccess Screen — Method (${req.method}) Not Allowed` });
  }

  const body = req.body as FrameRequest;
  const transactionId: string = body?.untrustedData?.transactionId ?? '...';
  let message;
  let isValid;
  let name;

  try {
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

    const messageState = JSON.parse(
      decodeURIComponent(message.state?.serialized),
    ) as TxFrameStateType;
    if (!messageState) {
      throw new Error('No message state received');
    }
    name = messageState.targetName;
    return res.status(200).setHeader('Content-Type', 'text/html').send(txSuccessFrame(name, transactionId));
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
