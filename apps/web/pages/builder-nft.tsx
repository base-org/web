import Head from 'next/head';
import Image from 'next/image';

import nftPreview from 'apps/web/public/images/builderNft/nftPreview.webp';
import { Button } from 'apps/web/src/components/Button/Button';
import { useAccount, useDisconnect, useWriteContract, useSwitchChain, useChainId } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, createContext, useContext } from 'react';
import { base } from 'viem/chains';

type MintStatus =
  | 'disconnected'
  | 'loading-proof'
  | 'not-eligible'
  | 'eligible'
  | 'minting'
  | 'minted'
  | 'mint-error';

type MintState = {
  status: MintStatus;
  mint?: () => void;
  error?: Error;
  txHash?: `0x${string}`;
};

class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const MintStateContext = createContext<MintState>({
  status: 'disconnected',
  mint: undefined,
});

function useMintStateContext() {
  return useContext(MintStateContext);
}

function useProofQuery(): UseQueryResult<{ result: string[] }> {
  const { address, status } = useAccount();

  return useQuery({
    queryKey: ['proof', address],
    retry: (failureCount: number, error: HttpError) => failureCount < 3 && error.status !== 404,
    queryFn: async () => {
      const response = await fetch(`/api/checkNftProof`, {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new HttpError(response.status, 'Proof lookup failed');
      }

      return response.json();
    },
    enabled: status === 'connected',
  });
}

const contractAddress = process.env.NEXT_PUBLIC_BASE_BUILDER_NFT_ADDRESS as `0x${string}`;
const contractABI = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'proof',
        type: 'bytes32[]',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

function useMintState(): MintState {
  const { status, address } = useAccount();

  useEffect(() => {
    if (window.ClientAnalytics && address) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window.ClientAnalytics?.logEvent('connected_wallet', {
        address,
      });
    }
  }, [address]);

  const proofQuery = useProofQuery();
  const proof = proofQuery.data?.result;
  console.log({ proof });

  const { writeContract, isPending, isSuccess, error, data: txHash } = useWriteContract();

  const mint = useCallback(() => {
    console.log('Minting NFT with proof:', proof);
    if (contractAddress) {
      writeContract({
        abi: contractABI,
        address: contractAddress,
        functionName: 'mint',
        args: [proof],
        chainId: base.id,
      });
    }
  }, [proof, writeContract]);

  if (isPending) {
    return {
      status: 'minting',
    };
  }

  if (isSuccess) {
    return {
      status: 'minted',
      txHash,
    };
  }

  if (error) {
    console.log({ error });
    return {
      status: 'mint-error',
      error,
    };
  }

  if (status !== 'connected') {
    return {
      status: 'disconnected',
    };
  }

  if (proofQuery.isLoading) {
    return {
      status: 'loading-proof',
    };
  }

  if (proofQuery.isError) {
    return {
      status: 'not-eligible',
    };
  }

  return { status: 'eligible', mint };
}

function MintButton() {
  const { mint } = useMintStateContext();
  const chainId = useChainId();
  const isBase = chainId === base.id;
  const { switchChain } = useSwitchChain();

  const switchToBase = useCallback(() => {
    switchChain({ chainId: base.id });
  }, [switchChain]);

  if (!isBase) {
    return (
      <Button variant="primary" className="w-fit" onClick={switchToBase}>
        Switch to Base
      </Button>
    );
  }

  return (
    <Button variant="primary" className="w-fit" onClick={mint}>
      Mint
    </Button>
  );
}

function DisconnectButton({ title }: { title: string }) {
  const { disconnect } = useDisconnect();

  const onClick = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <Button variant="secondary" onClick={onClick}>
      {title}
    </Button>
  );
}

function NftButton({ status }: { status: MintStatus }) {
  const { openConnectModal } = useConnectModal();
  console.log({ status });

  if (status === 'disconnected') {
    return (
      <Button variant="primary" className="w-fit" onClick={openConnectModal}>
        Connect Wallet
      </Button>
    );
  }

  if (status === 'loading-proof') {
    return (
      <Button variant="primary" className="w-fit">
        Checking eligibility...
      </Button>
    );
  }

  if (status === 'not-eligible') {
    return <DisconnectButton title="Wallet not eligible" />;
  }

  return <MintButton />;
}

const DEFAULT_HEADING = 'It’s here! Claim your Base Builder Mainnet NFT';

const HeadingForStatus: Record<MintStatus, string> = {
  'not-eligible': 'This wallet can’t mint this NFT',
  'loading-proof': 'Checking eligibility...',
  eligible: DEFAULT_HEADING,
  disconnected: DEFAULT_HEADING,
  minting: 'Minting your NFT...',
  minted: 'It’s yours! Thank you for building on Base.',
  'mint-error': 'Something went wrong',
};

const DEFAULT_SUBHEADING = 'A special thank you from us for being an early builder on Base.';

const SubHeadingForStatus: Record<MintStatus, string> = {
  'not-eligible': 'Only builders who completed last year’s onchain quest can claim this NFT.',
  'loading-proof': 'Please wait a moment...',
  eligible: DEFAULT_SUBHEADING,
  disconnected: DEFAULT_SUBHEADING,
  minting: 'Please wait a moment...',
  minted: '',
  // TODO: handle errors
  'mint-error': 'Please try again!',
};

const DEFAULT_CONTENT =
  'By completing last year’s onchain quest, your skills and vision helped push the boundaries of what’s possible onchain. This NFT, designed by digital artist Andre Oshea, commemorates the momentum we’ve built together and the creativity that builders bring to Base. There’s so much more to come.';

const ContentForStatus: Record<MintStatus, JSX.Element | string> = {
  'not-eligible': (
    <>
      Make sure you connect a wallet that deployed a smart contract on Base Goerli testnet and
      previously minted the{' '}
      <a
        href="https://goerli.basescan.org/token/0xac6564f3718837caadd42eed742d75c12b90a052"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        Base Goerli Builder NFT
      </a>
      .
    </>
  ),
  'loading-proof': '',
  eligible: DEFAULT_CONTENT,
  disconnected: DEFAULT_CONTENT,
  minting: '',
  // Todo: social share and basescan link
  minted: 'Minted!',
  // TODO: handle errors
  'mint-error': '',
};

const CTAForStatus: Record<MintStatus, JSX.Element | null> = {
  'not-eligible': <DisconnectButton title="Disconnect Wallet" />,
  'loading-proof': null,
  eligible: null,
  disconnected: null,
  minted: null,
  minting: null,
  'mint-error': null,
};

function BuilderNftHero() {
  const mintState = useMintState();
  const { status } = mintState;

  return (
    <MintStateContext.Provider value={mintState}>
      <div className="mt-[-96px] flex w-full flex-col items-center bg-black pb-[96px]">
        <div className="flex w-full max-w-[1440px] flex-col justify-center px-8 py-8 pt-48 md:flex-row md:gap-32">
          <div className="flex w-full flex-col gap-8 md:w-1/2">
            <h1 className="font-display text-3xl text-white md:text-5xl lg:text-6xl">
              {HeadingForStatus[status]}
            </h1>
            <p className="font-display text-lg text-white">{SubHeadingForStatus[status]}</p>
            <p className="text-md font-display text-white">{ContentForStatus[status]}</p>
            {CTAForStatus[status]}
          </div>
          <div className="flex w-full flex-col gap-8 md:w-1/2 md:justify-end">
            <div className="border-4 border-white">
              <Image src={nftPreview} alt="Preview of the Base Builder NFT" />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-lg uppercase text-white">
                  The Expansion of Awareness
                </span>
                <span className="text-white">Andre Oshea</span>
              </div>
              <NftButton status={status} />
            </div>
          </div>
        </div>
      </div>
    </MintStateContext.Provider>
  );
}

function FaqItem({ question, answer }: { question: string; answer: JSX.Element | string }) {
  return (
    <div className="flex flex-col gap-6 border-t border-translucent-200 pt-8">
      <h2 className="text-2xl">{question}</h2>
      <p>{answer}</p>
    </div>
  );
}

export default function BuilderNFT() {
  return (
    <div>
      <Head>
        <title>Base | Builder NFT</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <main className="flex w-full flex-col items-center bg-black">
        <BuilderNftHero />
        <div className="mb-32 flex w-full max-w-[1440px] flex-col gap-12 text-white">
          <h1 className="text-3xl uppercase">Frequently Asked Questions</h1>
          <FaqItem
            question="What is the Base Builder Mainnet NFT?"
            answer={
              <>
                Last year, we launched an{' '}
                <a href="https://base.mirror.xyz/CsHm8poSS9HqWNMvPZEZDIn8LMjiNy5PwUd7z8F6G-Q">
                  onchain Builder Quest
                </a>{' '}
                shortly after we brought Base to testnet. Builders who completed the quest got a
                commemorative NFT on Base testnet designed by Andre Oshea. Our vision was to enable
                builders to keep a piece of onchain history with them as the earliest Base builders.
                Now, holders of the testnet NFT can claim their NFT on mainnet.
              </>
            }
          />
          <FaqItem
            question="Who is Andre Oshea?"
            answer="Andre Oshea is a digital 3D artist who makes art for those “who want to build the future.” Andre’s art explores new worlds and realities, and inspires people to think about the possibilities of the future – exactly the type of curiosity and inspiration that we’re hoping to spark among Based builders."
          />
          <FaqItem
            question="How do I claim my NFT?"
            answer={
              <>
                <p>It’s easy!</p>
                <ol>
                  <li>1. Find the wallet that holds your Goerli testnet NFT</li>
                  <li>2. Connect your wallet to Base mainnet</li>
                  <li>3. Make sure you’ve got ETH for the gas fee</li>
                  <li>4. Click “mint”</li>
                  <li>5. That’s it! Your NFT will be minted and appear in your wallet.</li>
                </ol>
              </>
            }
          />
          <FaqItem
            question="Who is eligible to claim the Base Builder Mainnet NFT?"
            answer="Builders who completed last year’s onchain quest and claimed the testnet NFT. (Please make sure you’re connecting the same wallet that holds the testnet NFT, otherwise you won’t be able to claim.)"
          />
          <FaqItem
            question="Why can’t I claim my NFT?"
            answer="Only builders who completed last year’s onchain quest and claimed the Base Builder NFT on testnet are eligible to claim the mainnet NFT. Please use the wallet that holds the testnet NFT, otherwise you won’t be able to claim."
          />
          <FaqItem
            question="I’m bummed to miss the chance. Will Base do more NFTs?"
            answer="Yes! While there is only one Base Builder Mainnet NFT (for those who have completed last year’s quest), the Base team as well as Based artists worldwide continue to create and distribute digital collectibles that showcase their creativity. Follow Base on X and Warpcast for updates around upcoming mints, and join the /base channel to catch mints from the community."
          />
        </div>
      </main>
    </div>
  );
}
