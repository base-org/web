import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';

enum ProofProjectType {
  NFTBuilder = 'nft_builder',
  Usernames = 'usernames',
}

type RequestBody = {
  address: `0x${string}`;
  projectType?: ProofProjectType;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const { address, projectType } = req.body as RequestBody;

  try {
    let key = `proof:${projectType?.valueOf()}:${address}`;
    if (ProofProjectType.Usernames === projectType) {
      key = `proof:${address}`;
    }
    const proof = await kv.get<string[]>(key);
    if (proof) {
      return res.status(200).json({ result: proof });
    }
  } catch (error) {
    console.error(error);
  }

  return res.status(404).json({ error: 'address is not eligible for the nft' });
}
