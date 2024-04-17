import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

type RequestBody = {
  address: `0x${string}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const { address } = JSON.parse(req.body as string) as RequestBody;

  const val = await kv.get<string>(`proof:${address}`);
  if (!val) {
    return res.status(404).json({ error: 'address is not eligible for the nft' });
  }

  const proof = JSON.parse(val) as string[];

  if (proof) {
    res.status(200).json({ result: proof });
  } else {
  }
}
