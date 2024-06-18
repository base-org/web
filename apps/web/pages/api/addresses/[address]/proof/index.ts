import type { NextApiRequest, NextApiResponse } from 'next';
import { getProofsByNamespaceAndAddress, ProofTableNamespace } from 'apps/web/src/utils/proofs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  const { address, namespace } = req.query;
  if (!address) {
    return res.status(400).json({ error: 'address is required' });
  }

  try {
    const content = await getProofsByNamespaceAndAddress(
      address as string,
      namespace as ProofTableNamespace,
    );

    if (content) {
      console.log(content);
    }

    return res.status(200).json({ result: content });
  } catch (error) {
    console.error(error);
  }

  return res.status(404).json({ error: 'address is not eligible for this project' });
}
