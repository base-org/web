import { getAttestations } from '@coinbase/onchainkit/identity';
import { kv } from '@vercel/kv';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CB1_DISCOUNT_VALIDATORS,
  USERNAME_CB_DISCOUNT_VALIDATORS,
  USERNAME_EA_DISCOUNT_VALIDATORS,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import { getLinkedAddresses } from 'apps/web/src/cdp/api';
import {
  ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS,
  ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS,
  trustedSignerAddress,
  trustedSignerPKey,
} from 'apps/web/src/constants';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
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

type DiscountTypesByChainId = Record<number, DiscountTypes>;
const discountTypes: DiscountTypesByChainId = {
  [base.id]: {
    [DiscountType.CB]: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS[base.id],
      discountValidatorAddress: USERNAME_CB_DISCOUNT_VALIDATORS[base.id],
    },
    [DiscountType.CB1]: {
      schemaId: ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS[base.id],
      discountValidatorAddress: USERNAME_CB1_DISCOUNT_VALIDATORS[base.id],
    },
    [DiscountType.EARLY_ACCESS]: {
      discountValidatorAddress: USERNAME_EA_DISCOUNT_VALIDATORS[base.id],
    },
  },
  [baseSepolia.id]: {
    [DiscountType.CB]: {
      schemaId: ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS[baseSepolia.id],
      discountValidatorAddress: USERNAME_CB_DISCOUNT_VALIDATORS[baseSepolia.id],
    },
    [DiscountType.CB1]: {
      schemaId: ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS[baseSepolia.id],
      discountValidatorAddress: USERNAME_CB1_DISCOUNT_VALIDATORS[baseSepolia.id],
    },
    [DiscountType.EARLY_ACCESS]: {
      discountValidatorAddress: USERNAME_EA_DISCOUNT_VALIDATORS[baseSepolia.id],
    },
  },
};

export async function hasRegisteredWithDiscount(
  addresses: Address[],
  chainId: number,
): Promise<boolean> {
  const publicClient = getBasenamePublicClient(chainId);

  return publicClient.readContract({
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[chainId],
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
  chainId: number,
): Promise<CoinbaseProofResponse> {
  const schema = discountTypes[chainId][discountType]?.schemaId;

  const discountValidatorAddress = discountTypes[chainId][discountType]?.discountValidatorAddress;

  if (!discountValidatorAddress || !isAddress(discountValidatorAddress)) {
    throw new Error('Must provide a valid discountValidatorAddress');
  }

  const attestations = await getAttestations(
    address,
    // @ts-expect-error onchainkit expects a different type for Chain (??)
    { id: chainId },
    { schemas: [schema] },
  );
  if (!attestations?.length) {
    return { attestations: [], discountValidatorAddress };
  }
  const attestationsRes = attestations.map(
    (attestation) => JSON.parse(attestation.decodedDataJson)[0] as VerifiedAccount,
  );

  try {
    let { linkedAddresses, idemKey } = await getLinkedAddresses(address as string);

    const hasPreviouslyRegistered = await hasRegisteredWithDiscount(linkedAddresses, chainId);
    // if any linked address registered previously return an error
    if (hasPreviouslyRegistered) {
      throw new Error('You have already claimed a username with a different address (onchain).');
    }

    const kvKey = `${previousClaimsKVPrefix}${idemKey}`;
    //check kv for previous claim entries
    let previousClaims = (await kv.get<PreviousClaims>(kvKey)) ?? {};
    const previousClaim = previousClaims[discountType];
    if (previousClaim) {
      if (previousClaim.address != address) {
        throw new Error(
          'You tried claiming this with a different address, wait a couple minutes to try again.',
        );
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
    previousClaims[discountType] = claim;
    await kv.set(kvKey, previousClaims, { nx: true, ex: parseInt(EXPIRY) });

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
