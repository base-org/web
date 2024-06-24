import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import { hasRegisteredWithDiscount } from 'apps/web/src/contracts/Usernames/registrarController';
import { ethers } from 'ethers';
import {
  isDevelopment,
  trustedSignerAddress,
  trustedSignerPKey,
  verifiedAccountSchemaId,
  verifiedCb1AccountSchemaId,
} from 'apps/web/src/constants';
import { getLinkedAddresses, LinkedAddresses } from 'apps/web/src/cdp/api';
import { getAttestations } from '@coinbase/onchainkit/identity';
import { base, baseSepolia } from 'viem/chains';

type PreviousClaim = {
  address: string;
  signedMessage: string;
};
type VerifiedAccount = {
  name: string;
  type: string;
  signature: string;
  value: {
    name: string;
    type: string;
    value: boolean;
  };
};

const expiry = (process.env.USERNAMES_SIGNATURE_EXPIRATION_SECONDS as unknown as number) ?? 300;
const previousClaimsKVPrefix = 'username:claims:';
const chain = isDevelopment ? baseSepolia : base;

async function signMessage(claimerAddress: string) {
  const wallet = new ethers.Wallet(trustedSignerPKey);

  // encode the message
  const message = ethers.utils.solidityPack(
    ['bytes2', 'address', 'address', 'uint256'],
    ['0x1900', trustedSignerAddress, claimerAddress, expiry],
  );
  // hash the message
  const msgHash = ethers.utils.keccak256(message);

  // sign the hashed message
  const signature = await wallet.signMessage(ethers.utils.arrayify(msgHash));

  // return the encoded signed message
  return ethers.utils.defaultAbiCoder.encode(
    ['address', 'uint256', 'bytes'],
    [claimerAddress, expiry, signature],
  );
}
/**
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
  const { address } = req.query;

  if (!address || !ethers.utils.isAddress(address as string)) {
    return res.status(400).json({ error: 'valid address is required' });
  }

  const attestations = await getAttestations(address as `0x${string}`, chain, {
    schemas: [verifiedAccountSchemaId, verifiedCb1AccountSchemaId],
  });

  if (!attestations?.length) {
    return res.status(400).json({ error: 'address is not verified' });
  }
  const attestationsRes = attestations.map(
    (attestation) => JSON.parse(attestation.decodedDataJson)[0] as VerifiedAccount,
  );

  let linkedAddressResponse: LinkedAddresses;
  try {
    //hit CDP to get linked addresses
    linkedAddressResponse = await getLinkedAddresses(address as string);

    // check onchain if any linked address has registered previously
    const hasPreviouslyRegistered = await hasRegisteredWithDiscount(
      linkedAddressResponse.linkedAddresses,
    );
    // if any linked address registered previously return an error
    if (hasPreviouslyRegistered) {
      return res.status(409).json({ result: 'user has already claimed a username' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'error checking linked addresses' });
  }

  const kvKey = `${previousClaimsKVPrefix}${linkedAddressResponse.idemKey}`;

  try {
    //check kv for previous claim entry
    const previousClaim = await kv.get<PreviousClaim>(kvKey);
    if (previousClaim) {
      if (previousClaim.address != address) {
        return res.status(409).json({ error: ' ' });
      }
      // return previously signed message
      return res.status(200).json({
        result: {
          signedMessage: previousClaim.signedMessage,
          attestations: attestationsRes,
        },
      });
    }

    // generate and sign the message
    const signedMessage = await signMessage(address as string);
    const claim: PreviousClaim = {
      address: address as string,
      signedMessage: signedMessage,
    };

    // save the signed message on kv with expiry time
    await kv.set(kvKey, claim, { ex: expiry });

    return res.status(200).json({
      result: {
        signedMessage: claim.signedMessage,
        attestations: attestationsRes,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'error generating discount message' });
  }
}
