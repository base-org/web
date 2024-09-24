import { NextRequest, NextResponse } from 'next/server';
import { mnemonicToAccount } from 'viem/accounts';

const FARCASTER_DEVELOPER_FID = process.env.FARCASTER_DEVELOPER_FID;
if (!FARCASTER_DEVELOPER_FID) {
  console.error('FARCASTER_DEVELOPER_FID is required to facilitate frame interactivity');
}
const FARCASTER_DEVELOPER_MNEMONIC = process.env.FARCASTER_DEVELOPER_MNEMONIC;
if (!FARCASTER_DEVELOPER_MNEMONIC) {
  console.error('FARCASTER_DEVELOPER_MNEMONIC is required to facilitate frame interactivity');
}

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: 'Farcaster SignedKeyRequestValidator',
  version: '1',
  chainId: 10,
  // Farcaster's SignedKeyRequestValidator
  // https://github.com/farcasterxyz/contracts?tab=readme-ov-file#op-mainnet
  // block explorer: https://optimistic.etherscan.io/address/0x00000000fc700472606ed4fa22623acf62c60553#code
  // architecture overview: https://github.com/farcasterxyz/contracts/blob/v3.1.0/docs/docs.md#151-signed-key-request-validator
  // used to authenticate requests to add a signer
  verifyingContract: '0x00000000fc700472606ed4fa22623acf62c60553',
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: 'requestFid', type: 'uint256' },
  { name: 'key', type: 'bytes' },
  { name: 'deadline', type: 'uint256' },
] as const;

type RequestData = {
  publicKey: `0x${string}`;
};

export async function POST(req: NextRequest) {
  if (!FARCASTER_DEVELOPER_FID || !FARCASTER_DEVELOPER_MNEMONIC) {
    console.error('FARCASTER_DEVELOPER_FID or FARCASTER_DEVELOPER_MNEMONIC not set');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }

  try {
    const data = (await req.json()) as RequestData;
    const account = mnemonicToAccount(FARCASTER_DEVELOPER_MNEMONIC);

    const deadline = Math.floor(Date.now() / 1000) + 86400; // signature is valid for 1 day
    const signature = await account.signTypedData({
      domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
      types: {
        SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
      },
      primaryType: 'SignedKeyRequest',
      message: {
        requestFid: BigInt(FARCASTER_DEVELOPER_FID),
        key: data.publicKey,
        deadline: BigInt(deadline),
      },
    });

    return NextResponse.json(
      {
        signature,
        requestFid: parseInt(FARCASTER_DEVELOPER_FID),
        deadline,
        requestSigner: account.address,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  } catch (err) {
    console.error(err);
    const res = NextResponse.error();
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  }
}
