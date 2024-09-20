import { createClient, reservoirChains } from '@reservoir0x/reservoir-sdk';
import { TransactionTargetResponse, getTokenFromUrl } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, hexToBigInt, http, parseAbi } from 'viem';
import * as viemChains from 'viem/chains';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const taker = searchParams.get('taker');
    const target = searchParams.get('target'); // CAIP-10 ID
    const referrer = searchParams.get('referrer') ?? undefined;

    if (!taker || !target) {
      throw new Error('Missing required parameters');
    }

    // Extract contract, type, and chain ID from itemId
    const { address: contractAddress, chainId, tokenId } = getTokenFromUrl(target);

    const reservoirChain = [...Object.values(reservoirChains)].find(
      (chain) => chain.id === chainId,
    );

    const viemChain = Object.values(viemChains).find((chain) => chain.id === chainId);

    if (!reservoirChain || !viemChain) {
      throw new Error('Unsupported chain');
    }

    const publicClient = createPublicClient({
      chain: viemChain,
      transport: http(),
    });

    const ERC1155_ERC165 = '0xd9b67a26';
    const ERC721_ERC165 = '0x80ac58cd';

    async function supportsInterface(interfaceId: `0x${string}`): Promise<boolean> {
      return publicClient
        .readContract({
          address: contractAddress as `0x${string}`,
          abi: parseAbi([
            'function supportsInterface(bytes4 interfaceID) external view returns (bool)',
          ]),
          functionName: 'supportsInterface',
          args: [interfaceId],
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    }

    // Get token type
    const [isERC721, isERC1155] = await Promise.all([
      supportsInterface(ERC721_ERC165),
      supportsInterface(ERC1155_ERC165),
    ]);

    let buyTokenPartial: { token?: string; collection?: string };
    if (isERC721) {
      buyTokenPartial = { collection: contractAddress };
    } else if (isERC1155) {
      buyTokenPartial = { token: `${contractAddress}:${tokenId}` };
    } else {
      buyTokenPartial = { collection: contractAddress };
    }

    // Create reservoir client with applicable chain
    const reservoirClient = createClient({
      chains: [{ ...reservoirChain, active: true }],
    });

    const wallet = createWalletClient({
      account: taker as `0x${string}`,
      transport: http(),
      chain: viemChain,
    });

    const res = await reservoirClient.actions.buyToken({
      items: [{ ...buyTokenPartial, quantity: 1, fillType: 'mint' }],
      options: {
        referrer,
      },
      wallet,
      precheck: true,
      onProgress: () => void 0,
    });

    if (res === true) {
      return NextResponse.json(res);
    }

    const mintTx = res.steps?.find((step) => step?.id === 'sale')?.items?.[0];

    const txResponse: TransactionTargetResponse = {
      chainId: `eip155:${viemChain.id}`,
      method: 'eth_sendTransaction',
      params: {
        ...mintTx!.data,
        value: hexToBigInt(mintTx?.data.value).toString(),
      },
    };

    return NextResponse.json({
      data: txResponse,
      explorer: viemChain.blockExplorers?.default,
    });
  } catch (err) {
    // @ts-expect-error unknown
    let message = err.response?.data?.message ?? err.message ?? 'error';
    // @ts-expect-error unknown
    let status = err.status ?? 400;
    return NextResponse.json({ message }, { status });
  }
}
