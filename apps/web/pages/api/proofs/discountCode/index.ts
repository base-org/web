import type { NextApiRequest, NextApiResponse } from 'next';
import { proofValidation, signDiscountMessageWithTrustedSigner } from 'apps/web/src/utils/proofs';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/pages/api/decorators';
import { Address, Hash, stringToHex } from 'viem';
import { USERNAME_DISCOUNT_CODE_VALIDATORS } from 'apps/web/src/addresses/usernames';
import { baseSepolia } from 'viem/chains';
import { getDiscountCode } from 'apps/web/src/utils/proofs/discount_code_storage';

export type DiscountCodeResponse = {
  discountValidatorAddress: Address;
  address: Address;
  signedMessage: Hash;
};

/*
this endpoint returns whether or a discount code is valid

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

  try {
    // 1. get the database model
    const discountCodes = await getDiscountCode('LA_DINNER_TEST');
    const discountCode = discountCodes[0];

    // 2. Sign the payload
    const couponCodeUuid = stringToHex(discountCode.code, { size: 32 });
    const expirationTimeUnix = Math.floor(discountCode.expires_at.getTime() / 1000);

    const signature = await signDiscountMessageWithTrustedSigner(
      address as Address,
      couponCodeUuid,
      USERNAME_DISCOUNT_CODE_VALIDATORS[baseSepolia.id],
      expirationTimeUnix,
    );

    const result: DiscountCodeResponse = {
      discountValidatorAddress: USERNAME_DISCOUNT_CODE_VALIDATORS[baseSepolia.id],
      address: address as Address,
      signedMessage: signature,
    };

    return res.status(200).json(result);
  } catch (error: unknown) {
    console.log({ error });
    logger.error('error getting proofs for discount code', error);
  }
  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ error: 'An unexpected error occurred' });
}

export default withTimeout(handler);
