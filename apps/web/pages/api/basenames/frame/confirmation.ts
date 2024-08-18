import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import {
  confirmationFrame,
  buttonIndexToYears,
  DOMAIN,
} from 'apps/web/pages/api/basenames/frame/frameResponses';

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
    `${DOMAIN}/api/basenames/${targetName}/getBasenameRegistrationPrice?years=${targetYears}`,
  );
  const { registrationPriceInWei, registrationPriceInEth} = await response.json();

  try {
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(confirmationFrame(targetName, targetYears, registrationPriceInWei, registrationPriceInEth));
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
