import { getAttestations } from '@coinbase/onchainkit/identity';
import { kv } from '@vercel/kv';
import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { LinkedAddresses, getLinkedAddresses } from 'apps/web/src/cdp/api';
import { cdpBaseRpcEndpoint } from 'apps/web/src/cdp/constants';
import {
  isDevelopment,
  trustedSignerAddress,
  trustedSignerPKey,
  verifiedAccountSchemaId,
  verifiedCb1AccountSchemaId,
} from 'apps/web/src/constants';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Address,
  createPublicClient,
  encodeAbiParameters,
  encodePacked,
  http,
  isAddress,
  isHex,
  keccak256,
  parseAbiParameters,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base, baseSepolia } from 'viem/chains';

const publicClient = createPublicClient({
  chain: isDevelopment ? baseSepolia : base,
  transport: http(cdpBaseRpcEndpoint),
});

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

async function signMessage(claimerAddress: Address) {
  const account = privateKeyToAccount(trustedSignerPKey);

  // encode the message
  const message = encodePacked(
    ['bytes2', 'address', 'address', 'uint256'],
    ['0x1900', trustedSignerAddress, claimerAddress, BigInt(expiry)],
  );

  // hash the message
  const msgHash = keccak256(message);

  // sign the hashed message
  const signature = await account.signMessage({ message: msgHash });

  // return the encoded signed message
  return encodeAbiParameters(parseAbiParameters('address, uint256, bytes'), [
    claimerAddress,
    BigInt(expiry),
    signature,
  ]);
}
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

  if (!address || Array.isArray(address) || !isAddress(address)) {
    return res.status(400).json({ error: 'valid address is required' });
  }

  if (!trustedSignerPKey) {
    return res.status(500).json({ error: 'currently unable to sign' });
  }

  if (!isHex(verifiedAccountSchemaId)) {
    return res.status(500).json({ error: 'invalid verifiedCb1AccountSchemaId' });
  }

  if (!isHex(verifiedCb1AccountSchemaId)) {
    return res.status(500).json({ error: 'invalid verifiedCb1AccountSchemaId' });
  }

  const attestations = await getAttestations(address, chain as any, {
    schemas: [verifiedAccountSchemaId, verifiedCb1AccountSchemaId],
  });

  if (!attestations?.length) {
    return res.status(200).json({ result: { attestations } });
  }
  const attestationsRes = attestations.map(
    (attestation) => JSON.parse(attestation.decodedDataJson)[0] as VerifiedAccount,
  );

  let linkedAddressResponse: LinkedAddresses;
  try {
    // hit CDP to get linked addresses
    linkedAddressResponse = await getLinkedAddresses(address as string);
    const addresses = linkedAddressResponse.linkedAddresses;
    if (!addresses.every((address) => isAddress(address))) {
      return res.status(500).json({
        error: 'not all linked addresses are valid addresses',
        addresses: linkedAddressResponse.linkedAddresses,
      });
    }
    // check onchain if any linked address has registered previously
    const hasPreviouslyRegistered = await publicClient.readContract({
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[baseSepolia.id],
      abi,
      functionName: 'hasRegisteredWithDiscount',
      args: [addresses],
    });

    // if any linked address registered previously return an error
    if (hasPreviouslyRegistered) {
      return res.status(409).json({ error: 'user has already redeemed a discount' });
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
    const signedMessage = await signMessage(address);
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
