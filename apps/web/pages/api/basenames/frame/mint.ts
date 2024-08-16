import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // const body: FrameRequest = req.body;
  // console.log({ body });

  try {
    const frameResponse = getFrameHtmlResponse({
      buttons: [
        {
          action: 'post',
          label: 'Enter your desired basename',
          target: `http://localhost:3000/api/basenames/frame/setYears`,
        },
      ],
      image: {
        src: `http://localhost:3000/images/basenames/contract-uri/cover-image.png`,
      },
      input: {
        text: 'Claim basename',
      },
      postUrl: `http://localhost:3000/api/basenames/frame/setYears`,
    });

    return res.status(200).setHeader('Content-Type', 'text/html').send(frameResponse);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
