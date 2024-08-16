import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: FrameRequest = req.body;
  const { untrustedData } = body;
  console.log('years....', { untrustedData });

  const targetName = untrustedData.inputText;
  console.log({ targetName });

  try {
    const frameResponse = getFrameHtmlResponse({
      buttons: [
        {
          action: 'post',
          label: '1 year',
          target: `http://localhost:3000/api/basenames/frame/confirmation`,
        },
        {
          action: 'post',
          label: '2 years',
          target: `http://localhost:3000/api/basenames/frame/confirmation`,
        },
        {
          action: 'post',
          label: '5 years',
          target: `http://localhost:3000/api/basenames/frame/confirmation`,
        },
        {
          action: 'post',
          label: '10 years',
          target: `http://localhost:3000/api/basenames/frame/confirmation`,
        },
      ],
      image: {
        src: `http://localhost:3000/api/basenames/${targetName}/assets/coverImage.png`,
      },
      // input: {
      //   text: 'Claim basename',
      // },
      postUrl: `http://localhost:3000/api/basenames/frame/confirmation`,
      state: {
        targetName: targetName,
      },
    });

    return res.status(200).setHeader('Content-Type', 'text/html').send(frameResponse);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
