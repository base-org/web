import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import {
  FrameRequest,
  getFrameMessage,
  FrameTransactionResponse,
} from '@coinbase/onchainkit/frame';
import { encodeFunctionData } from 'viem';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';

type TxFrameStateType = {
  targetName: string;
  formattedTargetName: string;
  targetYears: number;
  registrationPriceInWei: string;
  registrationPriceInEth: string;
};

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

  console.log({ message });

  const messageState: TxFrameStateType = JSON.parse(decodeURIComponent(message.state?.serialized));

  if (!messageState) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  name = messageState.targetName;
  years = messageState.targetYears;
  priceInEth = messageState.registrationPriceInEth;
  priceInWei = messageState.registrationPriceInWei;

  const registerRequest = {
    name,
    owner: '0x74431A069d721FEe532fc6330fB0280A80AeEaF9' as `0x${string}`, // The address of the owner for the name.
    duration: secondsInYears(years), // The duration of the registration in seconds.
    resolver: '0x8d2D30cdE6c46BC81824d0732cE8395c58da3939' as `0x${string}`, // The address of the resolver to set for this name.
    data: [], //  Multicallable data bytes for setting records in the associated resolver upon registration.
    reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
  };

  const data = encodeFunctionData({
    abi: RegistrarControllerABI,
    functionName: 'register',
    args: [registerRequest],
  });

  try {
    const txData: FrameTransactionResponse = {
      chainId: `eip155:8453`,
      method: 'eth_sendTransaction',
      params: {
        abi: [],
        data,
        to: '0x16ee2051a0613e5c52127755ee3110cf4cd1ca10',
        value: priceInWei.toString(),
      },
    };
    return res.status(200).json(txData);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}
