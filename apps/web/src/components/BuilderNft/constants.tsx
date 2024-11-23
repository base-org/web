import { MintedSocialShare } from 'apps/web/src/components/BuilderNft/MintedSocialShare';
import { MintStatus } from './useMintState';
import { DisconnectButton } from 'apps/web/src/components/BuilderNft/DisconnectButton';
import { NftButton } from 'apps/web/src/components/BuilderNft/NftButton';

export const contractAddress = process.env.NEXT_PUBLIC_BASE_BUILDER_NFT_ADDRESS as `0x${string}`;
export const contractABI = [
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
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'hasClaimed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const DEFAULT_HEADING = 'It’s here! Claim your Base Quest Anniversary NFT';

export const HeadingForStatus: Record<MintStatus, string> = {
  'not-eligible': 'Sorry, this wallet isn’t eligible!',
  'loading-proof': 'Checking eligibility...',
  eligible: DEFAULT_HEADING,
  disconnected: DEFAULT_HEADING,
  minting: 'Minting your NFT...',
  minted: 'It’s yours! Thank you for building on Base.',
  'mint-error': 'Something went wrong',
  'already-minted': 'Congratulations on claiming your NFT!',
};
const DEFAULT_SUBHEADING =
  'A special thank you from us for being an early builder on Base, at the anniversary of the first Base Builder Quest.';

export const SubHeadingForStatus: Record<MintStatus, string> = {
  'not-eligible': 'Only builders who completed last year’s onchain quest can claim this NFT.',
  'loading-proof': 'Please wait a moment...',
  eligible: DEFAULT_SUBHEADING,
  disconnected: DEFAULT_SUBHEADING,
  minting: 'Please wait a moment...',
  minted: '',
  'mint-error': 'Please try again!',
  'already-minted': 'Thank you for being one of the earliest contributors to Base.',
};
const DEFAULT_CONTENT =
  'By completing last year’s onchain quest, your skills and vision helped push the boundaries of what’s possible onchain. This NFT, designed by digital artist Andre Oshea, commemorates the momentum we’ve built together and the creativity that builders bring to Base. There’s so much more to come.';

export const ContentForStatus: Record<MintStatus, JSX.Element | string> = {
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
  minted: '',
  'mint-error': '',
  'already-minted': '',
};

export const CTAForStatus: Record<MintStatus, JSX.Element | null> = {
  'not-eligible': <DisconnectButton title="Disconnect Wallet" />,
  'loading-proof': null,
  eligible: <NftButton />,
  disconnected: <NftButton />,
  minted: <MintedSocialShare />,
  minting: null,
  'mint-error': <NftButton />,
  'already-minted': null,
};
