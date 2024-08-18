import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import {
  DOMAIN,
  inputSearchValueFrame,
  setYearsFrame,
} from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: FrameRequest = req.body;
  const { untrustedData } = body;
  const targetName = untrustedData.inputText;

  try {
    const response = await fetch(
      `${DOMAIN}/api/basenames/${targetName}/isNameAvailable`,
    );
    const { nameIsAvailable } = await response.json();

    if (!nameIsAvailable) {
      throw new Error('Name not available.');
    }

    return res.status(200).setHeader('Content-Type', 'text/html').send(setYearsFrame(targetName));
  } catch (error) {
    console.error('Error reading name availability:', error);
    return res.status(200).setHeader('Content-Type', 'text/html').send(inputSearchValueFrame);
  }
}
