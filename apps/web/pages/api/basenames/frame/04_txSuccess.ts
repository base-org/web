import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';

import { txSuccessFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';
import type { TxFrameStateType } from 'apps/web/pages/api/basenames/frame/tx';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `TxSuccess Screen — Method (${req.method}) Not Allowed` });
  }

  const body = req.body as FrameRequest;
  let message;
  let isValid;
  let name;

  try {
    const result = await getFrameMessage(body, {
      neynarApiKey: 'BF56615F-9028-4774-9E8C-2745308382C1', // TODO DON"T HARDCODE THIS
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
    return res.status(200).setHeader('Content-Type', 'text/html').send(txSuccessFrame(name));
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}
