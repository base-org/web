import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getDiscountCode,
  ProofsException,
  proofValidation,
  signDiscountMessageWithTrustedSigner,
} from 'apps/web/src/utils/proofs';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/pages/api/decorators';

/*
this endpoint returns whether or a discount code is valid

*/
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  const { address, chain, discountCode } = req.query;
  const validationErr = proofValidation(address, chain);
  if (validationErr) {
    return res.status(validationErr.status).json({ error: validationErr.error });
  }

  try {
    console.log({ address, chain, discountCode });

    // 1. get the database model
    const discountCode = await getDiscountCode('LA_DINNER_TEST');

    // const responseData = await getWalletProofs(
    //   // to lower case to be able to use index on huge dataset
    //   (address as string).toLowerCase() as `0x${string}`,
    //   parseInt(chain as string),
    //   ProofTableNamespace.DiscountCodes,
    //   false,
    // );

    // 2. format the payload {}
    // 3. sign (reference: signMessageWithTrustedSigner (will match validator expected paylaod))
    // 4. should return something similar to CoinbaseProofResponse
    signDiscountMessageWithTrustedSigner(
      '0xvalidatoraddress',
      discountCode.expires_at,
      discountCode.salt,
    );
    console.log({ test });

    return res.status(200).json(test);
  } catch (error: unknown) {
    if (error instanceof ProofsException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log({ error });
    logger.error('error getting proofs for discount code', error);
  }
  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ error: 'An unexpected error occurred' });
}

export default withTimeout(handler);
