import { trustedSignerPKey } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import {
  DiscountType,
  ProofsException,
  proofValidation,
  VerifiedAccount,
} from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Address } from 'viem';
import tracer from 'apps/web/dd-trace/initialize';

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
  tracer.dogstatsd.increment('proofs.coinbase');
  console.log('test log proofs/coinbase');
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  const { address, chain } = req.query;
  const validationErr = proofValidation(address, chain);
  if (validationErr) {
    return res.status(validationErr.status).json({ error: validationErr.error });
  }
  if (!trustedSignerPKey) {
    return res.status(500).json({ error: 'currently unable to sign' });
  }

  const span = tracer.startSpan('coinbase_proof');
  try {
    const result = await sybilResistantUsernameSigning(
      address as `0x${string}`,
      DiscountType.CB,
      parseInt(chain as string),
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof ProofsException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    logger.error(error);
  } finally {
    span.finish();
  }

  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ error: 'An unexpected error occurred' });
}
