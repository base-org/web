import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const chainId = parseInt(publicRuntimeConfig.l1ChainID) ?? 1;

import dynamic from 'next/dynamic';

const title = chainId === 1 ? 'Superchain Bridges' : 'Testnet Superchain Bridges';

function Disclaimer() {
  return (
    <p className="py-6 text-muted lg:pr-16">
      Coinbase Technologies, Inc., provides links to these independent service providers for your
      convenience but assumes no responsibility for their operations. Any interactions with these
      providers are solely between you and the provider.
    </p>
  );
}

// This helps us avoid hydration errors as we randomize the order of cards
const BridgeCardsDynamic = dynamic(async () => import('./BridgeCards'), { ssr: false });

function Content() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 lg:pr-16">
        <h1 className="mb-8 text-6xl">{title}</h1>
        <p className="mb-16 text-2xl lg:max-w-[33em]">
          Go to Superbridge or Brid.gg to bridge your assets to and from Base. For questions, see
          our FAQ.
        </p>

        <BridgeCardsDynamic />
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
    <div className="flex flex-col items-stretch border-t border-sidebar-border lg:flex-row">
      <div className="flex grow flex-col">
        <Content />
      </div>
      <FaqSidebar />
      <div className="p-4 lg:hidden">
        <Disclaimer />
      </div>
    </div>
  );
}
