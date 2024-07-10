import { getAttestations } from '@coinbase/onchainkit/identity';
import { kv } from '@vercel/kv';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CB1_DISCOUNT_VALIDATOR,
  USERNAME_CB_DISCOUNT_VALIDATOR,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { getLinkedAddresses } from 'apps/web/src/cdp/api';
import { getPublicClient } from 'apps/web/src/cdp/utils';
import {
  ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_ID,
  ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_ID,
  trustedSignerAddress,
  trustedSignerPKey,
} from 'apps/web/src/constants';
import {
  DiscountType,
  DiscountTypes,
  PreviousClaim,
  PreviousClaims,
  VerifiedAccount,
} from 'apps/web/src/utils/proofs/types';
import {
  Address,
  encodeAbiParameters,
  encodePacked,
  isAddress,
  keccak256,
  parseAbiParameters,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base, baseSepolia } from 'viem/chains';

const EXPIRY = process.env.USERNAMES_SIGNATURE_EXPIRATION_SECONDS ?? '30';
const previousClaimsKVPrefix = 'username:claims:';

type DiscountTypeMap = Record<84532 | 8453, DiscountTypes>;

const discountTypeMap: DiscountTypeMap = {
  [baseSepolia.id]: {
    CB: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_ID[baseSepolia.id],
      discountValidatorAddress: USERNAME_CB_DISCOUNT_VALIDATOR[baseSepolia.id],
    },
    CB1: {
      schemaId: ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_ID[baseSepolia.id],
      discountValidatorAddress: USERNAME_CB1_DISCOUNT_VALIDATOR[baseSepolia.id],
    },
  },
  [base.id]: {
    CB: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_ID[base.id],
      discountValidatorAddress: USERNAME_CB_DISCOUNT_VALIDATOR[base.id],
    },
    CB1: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_ID[base.id],
      discountValidatorAddress: USERNAME_CB1_DISCOUNT_VALIDATOR[base.id],
    },
  },
};

export async function hasRegisteredWithDiscount(
  addresses: Address[],
  chainId: number,
): Promise<boolean> {
  const publicClient = getPublicClient(chainId);

  return publicClient.readContract({
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
    abi: RegistrarControllerABI,
    functionName: 'hasRegisteredWithDiscount',
    args: [addresses],
  });
}

async function signMessageWithTrustedSigner(
  claimerAddress: Address,
  targetAddress: Address,
  expiry: number,
) {
  const account = privateKeyToAccount(`0x${trustedSignerPKey}`);

  // encode the message
  const message = encodePacked(
    ['bytes2', 'address', 'address', 'address', 'uint256'],
    ['0x1900', targetAddress, trustedSignerAddress, claimerAddress, BigInt(expiry)],
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

export async function sybilResistantUsernameSigning(
  address: `0x${string}`,
  discountType: DiscountType,
  chain: 84532 | 8453,
): Promise<CoinbaseProofResponse> {
  const schema = discountTypeMap[chain][discountType]?.schemaId;
  let attestationsChain = chain === base.id ? base : baseSepolia;

  const discountValidatorAddress = discountTypeMap[chain][discountType]?.discountValidatorAddress;
  if (!discountValidatorAddress || !isAddress(discountValidatorAddress)) {
    throw new Error('Must provide a valid discountValidatorAddress');
  }

  // @ts-expect-error onchainkit expects a different type for Chain (??)
  const attestations = await getAttestations(address, attestationsChain, { schemas: [schema] });
  if (!attestations?.length) {
    return { attestations: [], discountValidatorAddress };
  }
  const attestationsRes = attestations.map(
    (attestation) => JSON.parse(attestation.decodedDataJson)[0] as VerifiedAccount,
  );

  try {
    let { linkedAddresses, idemKey } = await getLinkedAddresses(address as string);

    const hasPreviouslyRegistered = await hasRegisteredWithDiscount(linkedAddresses, chain);
    // if any linked address registered previously return an error
    if (hasPreviouslyRegistered) {
      throw new Error('You have already claimed a username with a different address (onchain).');
    }

    const kvKey = `${previousClaimsKVPrefix}${idemKey}`;
    //check kv for previous claim entries
    let previousClaims = await kv.get<PreviousClaims>(kvKey);
    if (previousClaims) {
      const previousClaim = previousClaims[discountType];
      //check if there's an entry for this type, if there's no entry, throw an error. This means that there's already a signature for other discount, potential sybil
      if (!previousClaim) {
        throw new Error('You have already claimed a username with a different discount.');
      }
      if (previousClaim.address != address) {
        console.log(previousClaim.address, address);
        // await kv.del(kvKey);
        throw new Error('You have already claimed a username with a different address.');
      }

      // return previously signed message
      return {
        signedMessage: previousClaim.signedMessage,
        attestations: attestationsRes,
        discountValidatorAddress,
        expires: EXPIRY.toString(),
      };
    }

    // generate and sign the message
    const signedMessage = await signMessageWithTrustedSigner(
      address,
      discountValidatorAddress,
      parseInt(EXPIRY),
    );
    const claim: PreviousClaim = { address, signedMessage };
    await kv.set(kvKey, { [discountType]: claim }, { nx: true, ex: parseInt(EXPIRY) });

    return {
      signedMessage: claim.signedMessage,
      attestations: attestationsRes,
      discountValidatorAddress,
      expires: EXPIRY,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
