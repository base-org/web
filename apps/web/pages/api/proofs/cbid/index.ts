import type { NextApiRequest, NextApiResponse } from 'next';
import { getProofsByNamespaceAndAddress, ProofTableNamespace } from 'apps/web/src/utils/proofs';

/*
if result array is empty, user has no cbid
example return: 
{
    "result": [
        {
            "address": "0xB18e4C959bccc8EF86D78DC297fb5efA99550d85",
            "namespace": "usernames",
            "proofs": "[0x56ce3bbc909b90035ae373d32c56a9d81d26bb505dd935cdee6afc384bcaed8d, 0x99e940ed9482bf59ba5ceab7df0948798978a1acaee0ecb41f64fe7f40eedd17]"
        }
    ]
}
*/
// next endpoint (not this one) includes trusted signer for coinbase attestation and coinbase1 attestation

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
      '0xB18e4C959bccc8EF86D78DC297fb5efA99550d85' as string,
      namespace as ProofTableNamespace,
    );

    return res.status(200).json({ result: content });
  } catch (error) {
    console.error(error);
  }

  return res.status(404).json({ error: 'address is not eligible for this project' });
}
