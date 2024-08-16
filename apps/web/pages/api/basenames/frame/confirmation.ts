import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

const buttonIndexToYears = {
  1: 1,
  2: 2,
  3: 5,
  4: 10,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: FrameRequest = req.body;
  const { untrustedData } = body;
  console.log('confirmation.....', { untrustedData });

  const messageState = JSON.parse(untrustedData.state)

  const targetName = messageState.targetName;

  const targetYears = buttonIndexToYears[untrustedData.buttonIndex];

  try {
    const frameResponse = getFrameHtmlResponse({
      buttons: [
        {
          action: 'tx',
          label: `Confirm: Claim ${targetName} for ${targetYears} years`,
          target: `http://localhost:3000/api/basenames/frame/tx`,
        },
      ],
      image: {
        src: `http://localhost:3000/api/basenames/${targetName}/assets/coverImage.png`,
      },
      target: `http://localhost:3000/api/basenames/frame/tx`,
      postUrl: `http://localhost:3000/api/basenames/frame/tx`,
    });

    return res.status(200).setHeader('Content-Type', 'text/html').send(frameResponse);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
