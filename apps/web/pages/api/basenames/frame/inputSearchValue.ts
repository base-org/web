import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { inputSearchValueFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: FrameRequest = req.body;
  const { untrustedData } = body;
  const targetName = untrustedData.inputText;
  console.log('*********inputSearchValue:', { targetName });

  try {
    return res.status(200).setHeader('Content-Type', 'text/html').send(inputSearchValueFrame);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
