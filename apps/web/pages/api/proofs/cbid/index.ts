import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getProofsByNamespaceAndAddress,
  hasRegisteredWithDiscount,
  ProofTableNamespace,
} from 'apps/web/src/utils/proofs';
import { Address, isAddress } from 'viem';
import { USERNAME_CB_ID_DISCOUNT_VALIDATORS } from 'apps/web/src/addresses/usernames';
import { isBasenameSupportedChain } from 'apps/web/src/hooks/useBasenameChain';

export type CBIDProofResponse = {
  discountValidatorAddress: Address;
  address: Address;
  namespace: string;
  proofs: `0x${string}`[];
};

/*
this endpoint returns whether or not the account has a cb.id
if result array is empty, user has no cb.id
example return: 
{
  "address": "0xB18e4C959bccc8EF86D78DC297fb5efA99550d85",
  "namespace": "usernames",
  "proofs": "[0x56ce3bbc909b90035ae373d32c56a9d81d26bb505dd935cdee6afc384bcaed8d, 0x99e940ed9482bf59ba5ceab7df0948798978a1acaee0ecb41f64fe7f40eedd17]"
  "discountValidatorAddress": "0x..."
}
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  const { address, chain } = req.query;
  if (!address || Array.isArray(address) || !isAddress(address)) {
    return res.status(400).json({ error: 'A single valid address is required' });
  }

  if (!chain || Array.isArray(chain)) {
    return res.status(400).json({ error: 'invalid chain' });
  }
  let parsedChain = parseInt(chain);
  if (!isBasenameSupportedChain(parsedChain)) {
    return res.status(400).json({ error: 'chain must be Base or Base Sepolia' });
  }

  try {
    const hasPreviouslyRegistered = await hasRegisteredWithDiscount([address], parsedChain);
    // if any linked address registered previously return an error
    if (hasPreviouslyRegistered) {
      return res.status(400).json({ error: 'This address has already claimed a username.' });
    }
    const [content] = await getProofsByNamespaceAndAddress(address, ProofTableNamespace.Usernames);
    const proofs = content?.proofs ? (JSON.parse(content.proofs) as `0x${string}`[]) : [];
    if (proofs.length === 0) {
      return res.status(404).json({ error: 'address is not eligible for a cbid discount' });
    }
    const responseData: CBIDProofResponse = {
      ...content,
      proofs,
      discountValidatorAddress: USERNAME_CB_ID_DISCOUNT_VALIDATORS[parsedChain],
    };
    return res.status(200).json(responseData);
  } catch (error: unknown) {
    console.error(error);
  }

  return res.status(404).json({ error: 'address is not eligible for a cbid discount' });
}
