// import allowlistAddresses from 'apps/web/src//allowlistAddresses';
import { buildTree, verify } from 'apps/web/src/utils/merkleTree';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
  address: `0x${string}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const { address } = JSON.parse(req.body as string) as RequestBody;

  const tree = buildTree(allowlistAddresses);
  const proof = verify(address, tree);

  if (proof) {
    res.status(200).json({ result: proof });
  } else {
    res.status(400).json({ error: 'address is not eligible for the nft' });
  }
}
