import { trustedSignerPKey } from 'apps/web/src/constants';
import { isBasenameSupportedChain } from 'apps/web/src/hooks/useBasenameChain';
import { DiscountType, VerifiedAccount } from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Address, isAddress } from 'viem';

// Coinbase verified account *and* CB1 structure
export type CoinbaseProofResponse = {
  signedMessage?: string;
  attestations: VerifiedAccount[];
  discountValidatorAddress: Address;
  expires?: string;
};

/**
 * This endpoint reports whether or not the provided access has access to the verified account attestation
 *
 * Error responses:
 * 400: if address is invalid or missing verifications
 * 405: for unauthorized methods
 * 409: if user has already claimed a username
 * 500: for internal server errors
 *
 * @param req
 * {
 *   address: address to check if user is allowed to claim a new username with discount
 * }
 * @param res
 * {
 *  signedMessage: this is to be passed into the contract to claim a username
 *  attestations: will show the attestations that the user has  for verified account and verified cb1 account
 * }
 * @returns
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const { address, chain } = req.query;

  if (!address || Array.isArray(address) || !isAddress(address)) {
    return res.status(400).json({ error: 'valid address is required' });
  }

  if (!trustedSignerPKey) {
    return res.status(500).json({ error: 'currently unable to sign' });
  }

  if (!chain || Array.isArray(chain)) {
    return res.status(400).json({ error: 'chain must be a single value' });
  }
  let parsedChain = parseInt(chain);
  if (!isBasenameSupportedChain(parsedChain)) {
    return res.status(400).json({ error: 'chain must be Base or Base Sepolia' });
  }

  try {
    const result = await sybilResistantUsernameSigning(address, DiscountType.CB, parsedChain);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(409).json({ error: error.message });
    }

    // If error is not an instance of Error, return a generic error message
    return res.status(409).json({ error: 'An unexpected error occurred' });
  }
}
