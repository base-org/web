import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import getConfig from 'next/config';
import wonderbridgeLogo from 'apps/bridge/public/images/wonderbridge.png';
import superbridgeLogo from 'apps/bridge/public/images/superbridge.png';
import linkIcon from 'apps/bridge/public/images/ui/diagonalUpArrow.svg';
import Image from 'next/image';

const { publicRuntimeConfig } = getConfig();

const chainId = parseInt(publicRuntimeConfig.l1ChainID) ?? 1;

const superbridgeUrls: Record<number, string> = {
  1: 'https://superbridge.app/base',
  11155111: 'https://testnets.superbridge.app/base-sepolia',
};

const wonderbridgeUrls: Record<number, string> = {
  1: 'https://brid.gg/base?token=ETH',
  11155111: 'https://testnet.brid.gg/base-sepolia?token=ETH',
};

const bridges = [
  {
    name: 'Superbridge',
    url: superbridgeUrls[chainId],
    logo: superbridgeLogo,
    color: '#305FF6',
    team: 'Blob Engineering',
  },
  {
    name: 'Brid.gg',
    url: wonderbridgeUrls[chainId],
    logo: wonderbridgeLogo,
    color: '#0F152A',
    team: 'Wonderland',
  },
];

function BridgeCard({ name, url, logo, color, team }: (typeof bridges)[0]) {
  return (
    <a href={url} className={`flex flex-col items-center justify-center rounded-lg bg-${color}`}>
      <div
        className="flex h-80 w-full flex-col items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Image src={logo} alt={name} className="mb-4" />
      </div>
      <div className="flex w-full flex-row items-start justify-between bg-gray p-12">
        <div className="flex flex-col">
          <h2 className="font-mono text-3xl uppercase">{name}</h2>
          <p className="mt-2 text-xl text-muted">By {team}</p>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image src={linkIcon} alt="Link" className="" />
      </div>
    </a>
  );
}

function Disclaimer() {
  return (
    <p className="text-muted">
      Coinbase Technologies, Inc., provides links to these independent service providers for your
      convenience but assumes no responsibility for their operations. Any interactions with these
      providers are solely between you and the provider.
    </p>
  );
}

function Content() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-6xl">Superchain Bridges</h1>
        <p className="mb-16 text-2xl ">
          Go to Superbridge or Brid.gg to bridge your assets to and from Base. For questions, see
          our FAQ.
        </p>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {bridges.map((bridge) => (
            <BridgeCard key={bridge.name} {...bridge} />
          ))}
        </div>
      </div>

      <div className="hidden w-full border-t border-sidebar-border pt-4 lg:inline-block" />
      <div className="container mx-auto px-4">
        <div className="hidden lg:inline-block">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

export default Content;

export function DeprecationContent() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex grow flex-col">
        <Content />
      </div>
      <FaqSidebar />
      <div className="p-4 text-center lg:hidden">
        <Disclaimer />
      </div>
    </div>
  );
}
