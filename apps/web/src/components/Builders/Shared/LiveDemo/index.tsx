'use client';

import sun from 'apps/web/src/components/Builders/Shared/assets/sun.svg';
import moon from 'apps/web/src/components/Builders/Shared/assets/moon.svg';
import Image, { type StaticImageData } from 'next/image';
import { Buy } from '@coinbase/onchainkit/buy';
import { Checkout, CheckoutButton } from '@coinbase/onchainkit/checkout';
import { Earn } from '@coinbase/onchainkit/earn';
import { FundCard } from '@coinbase/onchainkit/fund';
// import { NFTMintCard } from '@coinbase/onchainkit/nft';
// import {
//   NFTAssetCost,
//   NFTCollectionTitle,
//   NFTCreator,
//   NFTMintButton,
//   NFTMinters,
//   NFTQuantitySelector,
// } from '@coinbase/onchainkit/nft/mint';
// import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import { SwapDefault } from '@coinbase/onchainkit/swap';
import { TransactionDefault } from '@coinbase/onchainkit/transaction';
import {
  ConnectWallet,
  Wallet,
  WalletAdvanced,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
} from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import {
  CLICK_CALLS,
  codeSnippets,
  codeStyles,
  COMPONENT_DESCRIPTIONS,
  earnVaultAddress,
  fundPresetAmountInputs,
  ONCHAINKIT_DEMO_TABS,
  swappableTokens,
  Tab,
  usdcToken,
} from 'apps/web/src/components/Builders/Shared/LiveDemo/constants';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { CodeSnippet } from 'apps/web/src/components/Builders/Shared/CodeSnippet';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Link from 'apps/web/src/components/Link';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';

type LiveDemoProps = {
  components: (typeof ONCHAINKIT_DEMO_TABS)[number][];
  title?: string;
  hideDescription?: boolean;
};

const walletAdvancedAddressDetailsClasses = {
  avatar: '!hidden',
};

export function LiveDemo({ components, title, hideDescription = false }: LiveDemoProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState<'code' | 'preview'>('code');
  const [isComponentMenuOpen, setIsComponentMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('Wallet');
  const [copied, setCopied] = useState(false);

  const buttonClasses = useMemo(
    () => ({
      active: mode === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
      inactive:
        mode === 'dark'
          ? 'text-dark-palette-foregroundMuted hover:text-white'
          : 'text-dark-gray-50 hover:text-dark-palette-backgroundAlternate',
    }),
    [mode],
  );

  const demoComponent = useMemo(() => {
    if (!isMounted) {
      return null;
    }

    switch (activeTab) {
      case 'Wallet':
        return (
          <Wallet>
            <ConnectWallet>
              <UserAvatar />
              <Name />
            </ConnectWallet>
            <WalletAdvanced>
              <WalletAdvancedWalletActions />
              <WalletAdvancedAddressDetails classNames={walletAdvancedAddressDetailsClasses} />
              <WalletAdvancedTransactionActions />
              <WalletAdvancedTokenHoldings />
            </WalletAdvanced>
          </Wallet>
        );
      case 'Buy':
        return <Buy toToken={usdcToken} disabled />;
      case 'Pay':
        return (
          <Checkout productId="my-product-id">
            <CheckoutButton className="text-white" />
          </Checkout>
        );
      case 'Swap':
        return <SwapDefault to={swappableTokens} from={swappableTokens} className="w-full" />;
      case 'Earn':
        return <Earn vaultAddress={earnVaultAddress} />;
      // case 'Mint':
      //   return (
      //     <NFTMintCard contractAddress="0xed2f34043387783b2727ff2799a46ce3ae1a34d2" tokenId="2">
      //       <NFTCreator />
      //       <NFTMedia />
      //       <NFTCollectionTitle />
      //       <NFTMinters />
      //       <NFTQuantitySelector />
      //       <NFTAssetCost />
      //       <NFTMintButton />
      //     </NFTMintCard>
      //   );
      case 'Fund':
        return (
          <FundCard
            assetSymbol="ETH"
            country="US"
            currency="USD"
            presetAmountInputs={fundPresetAmountInputs}
            className="w-[300px] max-w-full md:w-[400px]"
          />
        );
      case 'Transact':
        return <TransactionDefault calls={CLICK_CALLS} className="mr-auto w-auto" />;
      default:
        return null;
    }
  }, [isMounted, activeTab]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  if (!isMounted) {
    return <div className="flex h-[300px] items-center justify-center p-8 lg:h-[500px]" />;
  }

  return (
    <>
      <DesktopDemo
        components={components}
        mode={mode}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        buttonClasses={buttonClasses}
        handleCopy={handleCopy}
        demoComponent={demoComponent}
        toggleMode={toggleMode}
        copied={copied}
        title={title}
        hideDescription={hideDescription}
      />
      <MobileDemo
        components={components}
        mode={mode}
        isComponentMenuOpen={isComponentMenuOpen}
        setActiveTab={setActiveTab}
        setIsComponentMenuOpen={setIsComponentMenuOpen}
        activeTab={activeTab}
        buttonClasses={buttonClasses}
        content={content}
        demoComponent={demoComponent}
        toggleMode={toggleMode}
        setContent={setContent}
        title={title}
      />
    </>
  );
}

function DesktopDemo({
  components,
  mode,
  setActiveTab,
  activeTab,
  buttonClasses,
  handleCopy,
  demoComponent,
  toggleMode,
  copied,
  title,
  hideDescription,
}: {
  components: (typeof ONCHAINKIT_DEMO_TABS)[number][];
  mode: 'dark' | 'light';
  setActiveTab: (tab: Tab) => void;
  activeTab: Tab;
  buttonClasses: { active: string; inactive: string };
  handleCopy: () => void;
  demoComponent: React.ReactNode;
  toggleMode: () => void;
  copied: boolean;
  title?: string;
  hideDescription?: boolean;
}) {
  const createTabSelectionHandler = useCallback(
    (tab: Tab) => () => {
      setActiveTab(tab);
    },
    [setActiveTab],
  );

  return (
    <section className="hidden w-full md:block">
      <style>{codeStyles}</style>
      {title && (
        <div className="mb-9 flex-row gap-2">
          <Title level={TitleLevel.Title1} as="h2">
            {title}
          </Title>
        </div>
      )}
      <div
        className={classNames(
          'relative rounded-xl border transition-colors',
          mode === 'dark'
            ? 'border-dark-palette-line/20 bg-black'
            : 'border-dark-palette-line/20 bg-white',
        )}
      >
        <div
          className={classNames(
            'flex items-center justify-between border-b py-2 pl-6 pr-2 transition-colors',
            mode === 'dark' ? 'border-dark-palette-line/20' : 'border-dark-palette-line/20',
          )}
        >
          {components?.length > 1 && (
            <div className="no-scrollbar items-center space-x-8 overflow-x-auto">
              <div className="flex space-x-8 px-1">
                {components.map((component) => (
                  <button
                    key={component}
                    type="button"
                    onClick={createTabSelectionHandler(component as Tab)}
                    className={classNames(
                      'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                      activeTab === component ? buttonClasses.active : buttonClasses.inactive,
                    )}
                  >
                    {component}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="ml-auto flex items-center space-x-2">
            <Link
              href="https://docs.base.org/builderkits/onchainkit/getting-started"
              target="_blank"
              className={classNames(
                'rounded-lg border px-2 py-1 transition-colors',
                mode === 'dark'
                  ? 'border-dark-palette-line/20 hover:bg-white/10'
                  : 'border-dark-palette-line/20 text-dark-palette-backgroundAlternate hover:bg-white/10',
              )}
            >
              Docs
            </Link>
            <button
              type="button"
              onClick={handleCopy}
              className={classNames(
                'block rounded-lg border p-2 transition-colors',
                mode === 'dark'
                  ? 'border-dark-palette-line/20 hover:bg-white/10'
                  : 'border-dark-palette-line/20 text-dark-palette-backgroundAlternate hover:bg-white/10',
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
              onClick={toggleMode}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                mode === 'dark'
                  ? 'border-dark-palette-line/20 hover:bg-white/10'
                  : 'border-dark-palette-line/20 hover:bg-white/10',
              )}
            >
              {mode === 'dark' ? (
                <Image src={sun as StaticImageData} alt="light mode" width={16} height={16} />
              ) : (
                <Image src={moon as StaticImageData} alt="dark mode" width={16} height={16} />
              )}
            </button>
          </div>
        </div>

        {!hideDescription && (
          <div
            className={classNames(
              'flex items-center justify-between border-b py-2 pl-6 pr-2 transition-colors',
              mode === 'dark'
                ? 'border-dark-palette-line/20 text-white'
                : 'border-dark-palette-line/20 text-dark-palette-backgroundAlternate',
            )}
          >
            <Text variant={TextVariant.Body} className="font-normal">
              {COMPONENT_DESCRIPTIONS[activeTab]}
            </Text>
          </div>
        )}

        <div className="grid h-auto min-h-[600px] grid-cols-1 lg:grid-cols-2">
          <ComponentDemo mode={mode} demoComponent={demoComponent} />
          <div className="h-[300px] py-6 pl-6 pr-1 lg:h-[500px]">
            <div className={`${mode} relative h-full`}>
              <CodeSnippet code={codeSnippets[activeTab]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileDemo({
  components,
  mode,
  isComponentMenuOpen,
  setActiveTab,
  setIsComponentMenuOpen,
  activeTab,
  buttonClasses,
  content,
  demoComponent,
  toggleMode,
  setContent,
  title,
}: {
  components: (typeof ONCHAINKIT_DEMO_TABS)[number][];
  mode: 'dark' | 'light';
  isComponentMenuOpen: boolean;
  setActiveTab: (tab: Tab) => void;
  setIsComponentMenuOpen: Dispatch<SetStateAction<boolean>>;
  activeTab: Tab;
  buttonClasses: { active: string; inactive: string };
  content: 'code' | 'preview';
  demoComponent: React.ReactNode;
  toggleMode: () => void;
  setContent: (content: 'code' | 'preview') => void;
  title?: string;
}) {
  const createTabSelectionHandler = useCallback(
    (tab: Tab) => () => {
      setActiveTab(tab);
      setIsComponentMenuOpen(false);
    },
    [setActiveTab, setIsComponentMenuOpen],
  );

  const handleCodePreviewToggle = useCallback(
    (option: 'code' | 'preview') => () => setContent(option),
    [setContent],
  );

  const handleComponentSelectionMenu = useCallback(
    () => setIsComponentMenuOpen((prev) => !prev),
    [setIsComponentMenuOpen],
  );

  const handleCloseComponentMenu = useCallback(
    () => setIsComponentMenuOpen(false),
    [setIsComponentMenuOpen],
  );

  return (
    <section className="w-full md:hidden">
      <style>{codeStyles}</style>
      {title && (
        <div className="mb-9 flex flex-col gap-2 font-bold">
          <Title level={TitleLevel.Title1}>{title}</Title>
        </div>
      )}
      <div
        className={classNames(
          'relative rounded-xl border transition-colors',
          mode === 'dark'
            ? 'border-dark-palette-line/20 bg-black'
            : 'border-dark-palette-line/20 bg-white',
        )}
      >
        {isComponentMenuOpen && (
          <div
            className={classNames(
              'h-full w-3/4 p-6',
              'absolute right-0 top-0 z-10',
              'border-l border-palette-lineHeavy/65',
              'rounded-r-xl',
              'font-medium',
              mode === 'dark' ? 'bg-palette-foreground' : 'bg-white',
            )}
          >
            <div className="flex w-full flex-col items-start space-y-4 px-1">
              {components.map((component, index) =>
                index === 0 ? (
                  <div key={component} className="flex w-full justify-between">
                    <button
                      type="button"
                      onClick={createTabSelectionHandler(component as Tab)}
                      className={classNames(
                        'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                        activeTab === component ? buttonClasses.active : buttonClasses.inactive,
                      )}
                    >
                      {component}
                    </button>
                    <button
                      type="button"
                      aria-label="Close component menu"
                      onClick={handleCloseComponentMenu}
                      className={classNames(
                        'rounded-lg p-2',
                        mode === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
                      )}
                    >
                      <Icon name="close" color="currentColor" width={16} height={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    key={component}
                    type="button"
                    onClick={createTabSelectionHandler(component as Tab)}
                    className={classNames(
                      'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                      activeTab === component ? buttonClasses.active : buttonClasses.inactive,
                    )}
                  >
                    {component}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
        <div
          className={classNames(
            'flex items-center justify-between border-b py-2 pl-6 pr-2 transition-colors',
            mode === 'dark' ? 'border-dark-palette-line/20' : 'border-dark-palette-line/20',
          )}
        >
          <div className="no-scrollbar flex items-center space-x-8 overflow-x-auto">
            <div className="flex space-x-8 px-1">
              <button
                type="button"
                onClick={handleCodePreviewToggle('code')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  content === 'code' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Code
              </button>
              <button
                type="button"
                onClick={handleCodePreviewToggle('preview')}
                className={classNames(
                  'whitespace-nowrap rounded-lg text-base font-medium transition-colors',
                  content === 'preview' ? buttonClasses.active : buttonClasses.inactive,
                )}
              >
                Preview
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="https://docs.base.org/builderkits/onchainkit/getting-started"
              target="_blank"
              className={classNames(
                'rounded-lg border px-2 py-1 transition-colors',
                mode === 'dark'
                  ? 'border-dark-palette-line/20 hover:bg-white/10'
                  : 'border-dark-palette-line/20 text-dark-palette-backgroundAlternate hover:bg-white/10',
              )}
            >
              Docs
            </Link>
            <button
              type="button"
              aria-label="Toggle component menu"
              onClick={handleComponentSelectionMenu}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                mode === 'dark'
                  ? 'border-dark-palette-line/20 hover:bg-white/10'
                  : 'border-dark-palette-line/20 text-dark-palette-backgroundAlternate hover:bg-white/10',
              )}
            >
              <div
                className={classNames(
                  mode === 'dark' ? 'text-white' : 'text-dark-palette-backgroundAlternate',
                )}
              >
                <Icon name="hamburger" color="currentColor" width={16} height={16} />
              </div>
            </button>
            <button
              type="button"
              onClick={toggleMode}
              className={classNames(
                'rounded-lg border p-2 transition-colors',
                mode === 'dark'
                  ? 'border-dark-palette-line/20 hover:bg-white/10'
                  : 'border-dark-palette-line/20 hover:bg-white/10',
              )}
            >
              {mode === 'dark' ? (
                <Image src={sun as StaticImageData} alt="light mode" width={16} height={16} />
              ) : (
                <Image src={moon as StaticImageData} alt="dark mode" width={16} height={16} />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 text-xs">
          {content === 'preview' ? (
            <ComponentDemo mode={mode} demoComponent={demoComponent} />
          ) : (
            <div className="h-[300px] p-6">
              <div className={`${mode} relative h-full`}>
                <CodeSnippet code={codeSnippets[activeTab]} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ComponentDemo({
  mode,
  demoComponent,
}: {
  mode: 'dark' | 'light';
  demoComponent: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        'h-full min-h-[300px] p-8 lg:p-12',
        'border-b lg:border-b-0 lg:border-r',
        'flex items-center justify-center transition-colors',
        'overflow-visible',
        mode === 'dark' ? 'border-dark-palette-line/20' : 'border-dark-palette-line/20',
      )}
    >
      <DynamicCryptoProviders mode={mode} theme="default">
        {demoComponent}
      </DynamicCryptoProviders>
    </div>
  );
}
