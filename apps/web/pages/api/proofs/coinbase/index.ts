import { trustedSignerPKey } from 'apps/web/src/constants';
import { isSupportedChain } from 'apps/web/src/utils/chains';
import { DiscountType } from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAddress, isHex } from 'viem';

/**
 * This endpoint reports whether or not the provided access has access to the cb1 or verified account attestations
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
 *  linkedAddresses: addresses associated with the one provided (will always include the provided address)
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

  if (!chain || !isSupportedChain(parseInt(chain as string))) {
    return res.status(400).json({ error: 'invalid chain' });
  }

  try {
    const result = await sybilResistantUsernameSigning(
      address,
      DiscountType.CB,
      parseInt(chain as string),
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error: error });
  }
}
