import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import {
  FrameRequest,
  getFrameMessage,
  FrameTransactionResponse,
} from '@coinbase/onchainkit/frame';
import { encodeFunctionData, namehash } from 'viem';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import { CHAIN, NEYNAR_API_KEY } from 'apps/web/pages/api/basenames/frame/constants';

export type TxFrameStateType = {
  targetName: string;
  formattedTargetName: string;
  targetYears: number;
  registrationPriceInWei: string;
  registrationPriceInEth: string;
};

const RESOLVER_ADDRESS = USERNAME_L2_RESOLVER_ADDRESSES[CHAIN.id];
const REGISTRAR_CONTROLLER_ADDRESS = USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[CHAIN.id];

if (!NEYNAR_API_KEY) {
  throw new Error('missing NEYNAR_API_KEY');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Tx Screen — Method (${req.method}) Not Allowed` });
  }

  const body = req.body as FrameRequest;
  let message;
  let isValid;
  let messageState;
  let name;
  let years;
  let priceInWei;
  let claimingAddress;

  try {
    if (body.trustedData) {
      const result = await getFrameMessage(body, {
        neynarApiKey: NEYNAR_API_KEY,
      });
      isValid = result.isValid;
      message = result.message;
      if (!isValid) {
        throw new Error('Message is not valid');
      }
      if (!message) {
        throw new Error('No message received');
      }
    }

    claimingAddress = (message?.address ?? body.untrustedData.address) as `0x${string}`;
    if (!claimingAddress) {
      throw new Error('No address received');
    }

    messageState = JSON.parse(
      decodeURIComponent(message?.state?.serialized ?? body.untrustedData.state),
    ) as TxFrameStateType;
    if (!messageState) {
      throw new Error('No message state received');
    }
    name = messageState.targetName;
    years = messageState.targetYears;
    priceInWei = messageState.registrationPriceInWei;
  } catch (e) {
    return res.status(500).json({ error: e });
  }

  const addressData = encodeFunctionData({
    abi: L2ResolverAbi,
    functionName: 'setAddr',
    args: [namehash(formatBaseEthDomain(name, CHAIN.id)), claimingAddress],
  });

  const nameData = encodeFunctionData({
    abi: L2ResolverAbi,
    functionName: 'setName',
    args: [namehash(formatBaseEthDomain(name, CHAIN.id)), formatBaseEthDomain(name, CHAIN.id)],
  });

  const registerRequest = {
    name,
    owner: claimingAddress,
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
      chainId: `eip155:${CHAIN.id}`,
      method: 'eth_sendTransaction',
      params: {
        abi: [
          {
            type: 'function',
            name: 'register',
            inputs: [
              {
                name: 'request',
                type: 'tuple',
                internalType: 'struct RegistrarController.RegisterRequest',
                components: [
                  {
                    name: 'name',
                    type: 'string',
                    internalType: 'string',
                  },
                  {
                    name: 'owner',
                    type: 'address',
                    internalType: 'address',
                  },
                  {
                    name: 'duration',
                    type: 'uint256',
                    internalType: 'uint256',
                  },
                  {
                    name: 'resolver',
                    type: 'address',
                    internalType: 'address',
                  },
                  {
                    name: 'data',
                    type: 'bytes[]',
                    internalType: 'bytes[]',
                  },
                  {
                    name: 'reverseRecord',
                    type: 'bool',
                    internalType: 'bool',
                  },
                ],
              },
            ],
            outputs: [],
            stateMutability: 'payable',
          },
        ],
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
