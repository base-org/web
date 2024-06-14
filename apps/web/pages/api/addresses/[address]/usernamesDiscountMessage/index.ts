import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from '@vercel/kv';
import { hasRegisteredWithDiscount } from 'apps/web/src/components/Usernames/registrarController';
import { ethers } from 'ethers';
import {
  trustedSignerAddress,
  trustedSignerPKey,
} from 'apps/web/src/components/Usernames/constants';

type PreviousClaim = {
  address: string;
  signedMessage: string;
};

type LinkedAddresses = {
  idemKey: string;
  linkedAddresses: string[];
};

const expiry = Math.floor(Date.now() / 1000) + 300; //  5 minutes
const previousClaimsKVPrefix = 'username:claims:';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: 'address is required' });
  }

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
        return res.status(409).json({ error: 'user has already claimed a username' });
      }
      console.log('returning previous claim');
      // return previously signed message
      return res.status(200).json({ result: previousClaim.signedMessage });
    }

    // generate and sign the message
    const signedMessage = await signMessage(address as string);
    const claim: PreviousClaim = {
      address: address as string,
      signedMessage: signedMessage,
    };

    // save the signed message on kv with expiry time
    await kv.set(kvKey, claim, { ex: expiry });

    return res.status(200).json({ result: signedMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'error generating discount message' });
  }
}

async function signMessage(claimerAddress: string) {
  const wallet = new ethers.Wallet(trustedSignerPKey);

  // encode the message
  const message = ethers.utils.defaultAbiCoder.encode(
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

async function getLinkedAddresses(address: string): Promise<LinkedAddresses> {
  const res = {
    idemKey: '7f4ccc22d014d4f6d1ef3dec1ac9b5049c2fa0f804f8966121b616dc78035524',
    linkedAddresses: [
      '0x6254d525DD60d4B842917e447c25446F39224baf',
      '0x57691827fd1a79793a51667F747b9905a2242e19',
    ],
  };
  return res;
}
