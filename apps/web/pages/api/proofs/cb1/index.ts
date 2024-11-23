import { withTimeout } from 'apps/web/pages/api/decorators';
import { trustedSignerPKey } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';
import { DiscountType, ProofsException, proofValidation } from 'apps/web/src/utils/proofs';
import { sybilResistantUsernameSigning } from 'apps/web/src/utils/proofs/sybil_resistance';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * This endpoint checks if the provided address has access to the cb1 attestation.
 *
 * Possible Error Responses:
 * - 400: Invalid address or missing verifications.
 * - 405: Unauthorized method.
 * - 409: User has already claimed a username.
 * - 500: Internal server error.
 *
 * @returns {Object} - An object with the signed message, attestations, and discount validator address.
 * Example response:
 * {
 *   "signedMessage": "0x0000000000000000000000009c02e8e28d8b706f67dcf0fc7f46a9ee1f9649fa000000000000000000000000000000000000000000000000000000000000012c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000416f4b871a02406ddddbf6f6df1c58416830c5ce45becad5b4f30cf32f74ee39a5559659f9e29479bc76bb1ebf40fffc7119d09ed7c8dcaf6075956f83935263851b00000000000000000000000000000000000000000000000000000000000000",
 *   "attestations": [
 *     {
 *       "name": "verifiedCoinbaseOne",
 *       "type": "bool",
 *       "signature": "bool verifiedCoinbaseOne",
 *       "value": {
 *         "name": "verifiedCoinbaseOne",
 *         "type": "bool",
 *         "value": true
 *       }
 *     }
 *   ],
 *   "discountValidatorAddress": "0x502df754f25f492cad45ed85a4de0ee7540717e7"
 * }
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  try {
    const result = await sybilResistantUsernameSigning(
      address as `0x${string}`,
      DiscountType.CB1,
      parseInt(chain as string),
    );
    return res.status(200).json(result);
  } catch (error) {
    logger.error('error getting proofs for cb1 discount', error);
    if (error instanceof ProofsException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ error: 'An unexpected error occurred' });
}

export default withTimeout(handler);
