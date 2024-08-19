import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { inputSearchValueFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ error: `Search Screen — Method (${req.method}) Not Allowed` });
  // }

  try {
    return res.status(200).setHeader('Content-Type', 'text/html').send(inputSearchValueFrame());
  } catch (error) {
    console.error('Could not process request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
