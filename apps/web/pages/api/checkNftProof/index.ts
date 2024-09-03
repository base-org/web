import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import { logger } from 'apps/web/src/utils/logger';

type RequestBody = {
  address: `0x${string}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const { address } = req.body as RequestBody;

  try {
    const proof = await kv.get<string[]>(`proof:${address}`);

    if (proof) {
      return res.status(200).json({ result: proof });
    }
  } catch (error) {
    logger.error('error getting message', error);
  }

  return res.status(404).json({ error: 'address is not eligible for the nft' });
}
