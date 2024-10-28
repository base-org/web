import type { NextApiRequest, NextApiResponse } from 'next';
import { proofValidation, signDiscountMessageWithTrustedSigner } from 'apps/web/src/utils/proofs';
import { logger } from 'apps/web/src/utils/logger';
import { withTimeout } from 'apps/web/pages/api/decorators';
import { Address, Hash, stringToHex } from 'viem';
import { USERNAME_DISCOUNT_CODE_VALIDATORS } from 'apps/web/src/addresses/usernames';
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
  const { address, chain, code } = req.query;
  const validationErr = proofValidation(address, chain);
  if (validationErr) {
    return res.status(validationErr.status).json({ error: validationErr.error });
  }

  const chainId = parseInt(chain as string);

  if (!code || typeof code !== 'string') {
    return res.status(500).json({ error: 'Discount code invalid' });
  }

  try {
    // 1. get the database model
    const discountCodes = await getDiscountCode(code);

    // 2. Validation: Coupon exists
    if (!discountCodes || discountCodes.length === 0) {
      return res.status(500).json({ error: 'Discount code invalid' });
    }

    const discountCode = discountCodes[0];

    // 2.1 Validation: Coupon is expired
    if (new Date(discountCode.expires_at) < new Date()) {
      return res.status(500).json({ error: 'Discount code invalid' });
    }

    // 2.2 Validation: Coupon can be redeemed
    if (Number(discountCode.usage_count) >= Number(discountCode.usage_limit)) {
      return res.status(500).json({ error: 'Discount code invalid' });
    }

    // 3. Sign the validationData
    const couponCodeUuid = stringToHex(discountCode.code, { size: 32 });
    const expirationTimeUnix = Math.floor(discountCode.expires_at.getTime() / 1000);

    const signature = await signDiscountMessageWithTrustedSigner(
      address as Address,
      couponCodeUuid,
      USERNAME_DISCOUNT_CODE_VALIDATORS[chainId],
      expirationTimeUnix,
    );

    // 4. Return the discount data
    const result: DiscountCodeResponse = {
      discountValidatorAddress: USERNAME_DISCOUNT_CODE_VALIDATORS[chainId],
      address: address as Address,
      signedMessage: signature,
    };

    return res.status(200).json(result);
  } catch (error: unknown) {
    logger.error('error getting proofs for discount code', error);
  }
  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ error: 'An unexpected error occurred' });
}

export default withTimeout(handler);
