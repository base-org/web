import {
  getWalletProofs,
  ProofsException,
  ProofTableNamespace,
  proofValidation,
} from 'apps/web/src/utils/proofs';
import { NextApiRequest, NextApiResponse } from 'next';

/*
this endpoint returns whether or not the account has early access
if result array is empty, user has no early access
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
    return { status: 405, error: 'method not allowed' };
  }
  const { address, chain } = req.query;
  const validationErr = proofValidation(address, chain);
  if (validationErr) {
    return res.status(validationErr.status).json({ error: validationErr.error });
  }

  try {
    const responseData = await getWalletProofs(
      address as `0x${string}`,
      parseInt(chain as string),
      ProofTableNamespace.BNSDiscount,
    );

    return res.status(200).json(responseData);
  } catch (error: unknown) {
    if (error instanceof ProofsException) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
  }

  return res.status(404).json({ error: 'address is not eligible for a cbid discount' });
}
