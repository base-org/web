import { getAttestations } from '@coinbase/onchainkit/identity';
import { kv } from '@vercel/kv';
import { getLinkedAddresses } from 'apps/web/src/cdp/api';
import {
  ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_ID,
  ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_ID,
} from 'apps/web/src/constants';
import {
  CoinbaseProofResponse,
  DiscountType,
  DiscountTypes,
  PreviousClaim,
  PreviousClaims,
  VerifiedAccount,
} from 'apps/web/src/utils/proofs/types';
import { base, baseSepolia } from 'viem/chains';
import { trustedSignerAddress, trustedSignerPKey } from 'apps/web/src/constants';
import { Address, encodeAbiParameters, encodePacked, keccak256, parseAbiParameters } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {
  USERNAME_CB1_DISCOUNT_VALIDATOR,
  USERNAME_CB_DISCOUNT_VALIDATOR,
} from 'apps/web/src/addresses/usernames';

const expiry = (process.env.USERNAMES_SIGNATURE_EXPIRATION_SECONDS as unknown as number) ?? 10;
const previousClaimsKVPrefix = 'username:claims:';

type DiscountTypeMap = Record<number, DiscountTypes>;

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

export async function sybilResistantUsernameSigning(
  address: `0x${string}`,
  discountType: DiscountType,
  chain: number,
): Promise<CoinbaseProofResponse> {
  const schema = discountTypeMap[chain][discountType]?.schemaId;
  const discountValidatorAddress = discountTypeMap[chain][discountType]?.discountValidatorAddress;

  console.log(chain, schema);
  const attestations = await getAttestations(address, { id: chain } as any, {
    schemas: [schema!],
  });

  if (!attestations?.length) {
    return { attestations: [] };
  }
  const attestationsRes = attestations.map(
    (attestation) => JSON.parse(attestation.decodedDataJson)[0] as VerifiedAccount,
  );

  try {
    let { linkedAddresses, idemKey } = await getLinkedAddresses(address as string);
    const kvKey = `${previousClaimsKVPrefix}${idemKey}`;
    //check kv for previous claim entries
    let previousClaims = await kv.get<PreviousClaims>(kvKey);
    if (previousClaims) {
      const previousClaim = previousClaims[discountType];
      //check if there's an entry for this type, if there's no entry, throw an error. This means that there's already a signature for other discount, potential sybil
      if (!previousClaim) {
        throw new Error(' ');
      }
      if (previousClaim.address != address) {
        throw new Error(' ');
      }
      // return previously signed message
      return {
        linkedAddresses,
        signedMessage: previousClaim.signedMessage,
        attestations: attestationsRes,
        discountValidatorAddress: discountValidatorAddress,
      };
    }

    // generate and sign the message
    const signedMessage = await signMessageWithTrustedSigner(
      address,
      discountValidatorAddress!,
      expiry,
    );
    const claim: PreviousClaim = { address, signedMessage };
    await kv.set(kvKey, { [discountType]: claim }, { ex: expiry });

    return {
      linkedAddresses,
      signedMessage: claim.signedMessage,
      attestations: attestationsRes,
      discountValidatorAddress: discountValidatorAddress,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signMessageWithTrustedSigner(
  claimerAddress: Address,
  target: Address,
  expiry: number,
) {
  const account = privateKeyToAccount(`0x${trustedSignerPKey}`);

  // encode the message
  const message = encodePacked(
    ['bytes2', 'address', 'address', 'address', 'uint256'],
    ['0x1900', target, trustedSignerAddress, claimerAddress, BigInt(expiry)],
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
