import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import {
  FrameRequest,
  getFrameMessage,
  FrameTransactionResponse,
} from '@coinbase/onchainkit/frame';
import { encodeFunctionData, namehash } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';

type TxFrameStateType = {
  targetName: string;
  formattedTargetName: string;
  targetYears: number;
  registrationPriceInWei: string;
  registrationPriceInEth: string;
};

const RESOLVER_ADDRESS = USERNAME_L2_RESOLVER_ADDRESSES[baseSepolia.id];
const REGISTRAR_CONTROLLER_ADDRESS = USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[baseSepolia.id];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Tx Screen — Method (${req.method}) Not Allowed` });
  }

  const body = req.body as FrameRequest;
  let message;
  let isValid;
  let name;
  let years;
  let priceInEth;
  let priceInWei;

  try {
    const result = await getFrameMessage(body, {
      neynarApiKey: 'BF56615F-9028-4774-9E8C-2745308382C1',
    });
    isValid = result.isValid;
    message = result.message;
    if (!isValid || !message) {
      throw new Error('Message is not valid');
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }

  console.warn({ message });

  const messageState: TxFrameStateType = JSON.parse(decodeURIComponent(message.state?.serialized));

  console.warn({ messageState });

  if (!messageState) {
    return res.status(500).json({ error: 'Internal server error: No message state.' });
  }
  name = messageState.targetName;
  years = messageState.targetYears;
  priceInEth = messageState.registrationPriceInEth;
  priceInWei = messageState.registrationPriceInWei;

  const TODO_ADDRESS_FROM_NEYNAR = '0x';

  const addressData = encodeFunctionData({
    abi: L2ResolverAbi,
    functionName: 'setAddr',
    args: [namehash(formatBaseEthDomain(name, baseSepolia.id)), TODO_ADDRESS_FROM_NEYNAR],
  });

  const nameData = encodeFunctionData({
    abi: L2ResolverAbi,
    functionName: 'setName',
    args: [
      namehash(formatBaseEthDomain(name, baseSepolia.id)),
      formatBaseEthDomain(name, baseSepolia.id),
    ],
  });

  const registerRequest = {
    name,
    owner: TODO_ADDRESS_FROM_NEYNAR, // TODO: The address of the owner for the name.
    duration: secondsInYears(years),
    resolver: RESOLVER_ADDRESS,
    data: [addressData, nameData],
    reverseRecord: true,
  };

  const data = encodeFunctionData({
    abi: RegistrarControllerABI,
    functionName: 'register',
    args: [registerRequest],
  });

  try {
    const txData: FrameTransactionResponse = {
      chainId: `eip155:${baseSepolia.id}`,
      method: 'eth_sendTransaction',
      params: {
        abi: [],
        data,
        to: REGISTRAR_CONTROLLER_ADDRESS,
        value: priceInWei.toString(),
      },
    };
    return res.status(200).json(txData);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}
