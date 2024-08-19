import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';

import { txSuccessFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as FrameRequest;
  let message;
  let isValid;

  try {
    const result = await getFrameMessage(body, {
      neynarApiKey: 'BF56615F-9028-4774-9E8C-2745308382C1',
    });
    isValid = result.isValid;
    message = result.message;
    if (!isValid || !message) {
      throw new Error('Message is not valid');
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }

  const { untrustedData } = body;
  const txId: string = untrustedData.transactionId ?? '--';

  return res.status(200).setHeader('Content-Type', 'text/html').send(txSuccessFrame(txId));
}
