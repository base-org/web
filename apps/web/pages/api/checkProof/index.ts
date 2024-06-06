import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient, VercelKV } from '@vercel/kv';

enum ProofProjectType {
  NFTBuilder = 'NFTBuilder',
  Usernames = 'Usernames',
}

type RequestBody = {
  address: `0x${string}`;
  projectType?: ProofProjectType;
};

const kvConfigs = {
  NFTBuilder: {
    url: process.env.KV_REST_API_URL ?? '',
    token: process.env.KV_REST_API_TOKEN ?? '',
  },
  Usernames: {
    url: process.env.KV_USERNAMES_REST_API_URL ?? '',
    token: process.env.KV_USERNAMES_REST_API_TOKEN ?? '',
  },
};

function getKVClient(projectType?: ProofProjectType): VercelKV {
  if (!projectType || !kvConfigs[projectType]) {
    throw new Error(`Unsupported project type: ${projectType}`);
  }
  return createClient(kvConfigs[projectType]);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const { address, projectType } = req.body as RequestBody;

  const kvClient = getKVClient(projectType);
  try {
    const proof = await kvClient.get<string[]>(`proof:${address}`);
    if (proof) {
      return res.status(200).json({ result: proof });
    }
  } catch (error) {
    console.error(error);
  }

  return res.status(404).json({ error: 'address is not eligible for the nft' });
}
