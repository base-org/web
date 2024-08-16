import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { confirmationFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

const buttonIndexToYears = {
  1: 1,
  2: 5,
  3: 10,
  4: 100,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: FrameRequest = req.body;
  const { untrustedData } = body;
  console.log('confirmation.....', { untrustedData });

  const messageState = JSON.parse(untrustedData.state);
  const targetName = messageState.targetName;
  const targetYears = buttonIndexToYears[untrustedData.buttonIndex];

  const response = await fetch(
    `http://localhost:3000/api/basenames/${targetName}/getBasenameRegistrationPrice?years=${targetYears}`,
  );
  const data = await response.json();

  console.log('************** ', { data });

  try {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(confirmationFrame(targetName, targetYears));
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
