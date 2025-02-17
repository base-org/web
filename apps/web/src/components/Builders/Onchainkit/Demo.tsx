'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import sun from 'apps/web/src/components/Builders/Shared/sun.svg';
import moon from 'apps/web/src/components/Builders/Shared/moon.svg';
import usdc from 'apps/web/src/components/Builders/Onchainkit/usdc.png';
import Image, { StaticImageData } from 'next/image';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import CodeSnippet from 'apps/web/src/components/Builders/Shared/CodeSnippet';
import { Checkout, CheckoutButton } from '@coinbase/onchainkit/checkout';
import { TransactionDefault } from '@coinbase/onchainkit/transaction';
import { Earn } from '@coinbase/onchainkit/earn';
import { Buy } from '@coinbase/onchainkit/buy';
import { FundCard } from '@coinbase/onchainkit/fund';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import {
  NFTCreator,
  NFTCollectionTitle,
  NFTAssetCost,
  NFTMinters,
  NFTQuantitySelector,
  NFTMintButton,
} from '@coinbase/onchainkit/nft/mint';
import {
  CLICK_CALLS,
  COMPONENT_CODE_SNIPPETS,
  ONCHAINKIT_DEMO_TABS,
} from 'apps/web/src/components/Builders/Onchainkit/constants';
import { ComponentDropdown } from 'apps/web/src/components/Builders/Onchainkit/ComponentDropdown';
import { Token } from '@coinbase/onchainkit/token';

const styles = `
  .code-snippet::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .code-snippet::-webkit-scrollbar-track {
    background: transparent;
  }
  .code-snippet::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
  .code-snippet::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .code-snippet {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }
  /* Default theme (light) */
  .shiki,
  .shiki span {
    color: var(--shiki-light) !important;
    background-color: var(--shiki-light-bg) !important;
    font-style: var(--shiki-light-font-style) !important;
    font-weight: var(--shiki-light-font-weight) !important;
    text-decoration: var(--shiki-light-text-decoration) !important;
  }
  /* Dark theme overrides */
  .dark .shiki,
  .dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
`;

export const usdcToken: Token = {
  name: 'USDC',
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  symbol: 'USDC',
  decimals: 6,
  chainId: 8453,
  image: usdc.src,
};

export function Demo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState(ONCHAINKIT_DEMO_TABS[0]);

  const handleClick = useCallback((header: string) => {
    return () => setSelectedTab(header);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const codeSnippet = useMemo(() => {
    return COMPONENT_CODE_SNIPPETS?.[selectedTab];
  }, [selectedTab]);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeSnippet]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const component = useMemo(() => {
    if (selectedTab === 'Transact') {
      return <TransactionDefault calls={CLICK_CALLS} className="mr-auto w-auto" />;
    }
    if (selectedTab === 'Checkout') {
      return (
        <Checkout className="mr-auto w-auto">
          <CheckoutButton />
        </Checkout>
      );
    }
    if (selectedTab === 'Earn') {
      return (
        <Earn
          vaultAddress="0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A"
          className="color-[#f9fafb]"
        />
      );
    }
    if (selectedTab === 'Buy') {
      return <Buy toToken={usdcToken} disabled />;
    }
    if (selectedTab === 'Mint') {
      return (
        <NFTMintCard contractAddress="0xed2f34043387783b2727ff2799a46ce3ae1a34d2" tokenId="2">
          <NFTCreator />
          <NFTMedia />
          <NFTCollectionTitle />
          <NFTMinters />
          <NFTQuantitySelector />
          <NFTAssetCost />
          <NFTMintButton />
        </NFTMintCard>
      );
    }
    if (selectedTab === 'Fund') {
      return (
        <FundCard
          assetSymbol="ETH"
          country="US"
          currency="USD"
          presetAmountInputs={['10', '20', '100']}
          className="w-[400px] max-w-full"
        />
      );
    }
    return <WalletDefault />;
  }, [selectedTab]);

  return (
    <section className="w-full">
      <style>{styles}</style>
      <div
        className={classNames(
          'relative rounded-xl border transition-colors',
          theme === 'dark'
            ? 'border-dark-palette-line/50 bg-black'
            : 'border-dark-palette-line/50 bg-white',
        )}
      >
        <div
          className={`flex items-center justify-between border-b py-2 pl-6 pr-2 transition-colors ${
            theme === 'dark' ? 'border-dark-palette-line/50' : 'border-dark-palette-line/50'
          }`}
        >
          <div className="hidden gap-12 sm:flex">
            {ONCHAINKIT_DEMO_TABS.map((header) => {
              const isSelected = selectedTab === header;
              let buttonClass;
              if (isSelected && theme === 'dark') {
                buttonClass = 'text-white';
              } else if (isSelected) {
                buttonClass = 'text-black';
              } else {
                buttonClass = 'text-dark-palette-foregroundMuted';
              }
              return (
                <button
                  className={buttonClass}
                  key={header}
                  onClick={handleClick(header)}
                  type="button"
                >
                  {header}
                </button>
              );
            })}
          </div>
          <ComponentDropdown activeTab={selectedTab} setActiveTab={setSelectedTab} theme={theme} />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopy}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                theme === 'dark'
                  ? 'border-dark-palette-line/50 hover:bg-white/10'
                  : 'border-dark-palette-line/50 text-dark-palette-backgroundAlternate hover:bg-white/10',
              )}
            >
              {copied ? (
                <div className="text-green-60">
                  <Icon name="checkmark" color="currentColor" width={16} height={16} />
                </div>
              ) : (
                <Icon name="copy" color="currentColor" width={16} height={16} />
              )}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                theme === 'dark'
                  ? 'border-dark-palette-line/50 hover:bg-white/10'
                  : 'border-dark-palette-line/50 text-black hover:bg-white/10',
              )}
            >
              {theme === 'dark' ? (
                <Image src={sun as StaticImageData} alt="light mode" width={16} height={16} />
              ) : (
                <Image
                  src={moon as StaticImageData}
                  alt="dark mode"
                  width={16}
                  height={16}
                  className="invert-0 dark:invert"
                />
              )}
            </button>
          </div>
        </div>

        {isMounted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className={classNames(
                'h-[300px] p-8 lg:h-[600px] lg:p-12',
                'border-b lg:border-b-0 lg:border-r',
                'flex items-center justify-center transition-colors',
                'overflow-scroll',
                theme === 'dark' ? 'border-dark-palette-line/50' : 'border-dark-palette-line/50',
              )}
            >
              <DynamicCryptoProviders theme={theme}>{component}</DynamicCryptoProviders>
            </div>
            <div className="h-[300px] py-6 pl-6 pr-1 lg:h-[500px]">
              <div className={`${theme} relative h-full`}>
                <CodeSnippet code={codeSnippet} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[300px] items-center justify-center p-8 lg:h-[500px]" />
        )}
      </div>
    </section>
  );
}
