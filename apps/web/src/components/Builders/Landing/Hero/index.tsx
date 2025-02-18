'use client';

import { useCallback, useEffect, useState } from 'react';
import { GridHero } from 'apps/web/src/components/Builders/Landing/Hero/GridHero';
import classNames from 'classnames';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { SearchModal } from 'apps/web/src/components/Builders/Landing/Hero/SearchModal';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

export function Hero() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsSearchModalOpen(true);
  }, []);

  const handleLaunchAgent = useCallback(() => {
    window.open('https://vocs-migration-mvp-one.vercel.app/use-cases/launch-ai-agents', '_blank');
  }, []);

  const handleIntegrateCryptoPayments = useCallback(() => {
    window.open('https://vocs-migration-mvp-one.vercel.app/use-cases/accept-crypto-payments', '_blank');
  }, []);

  const handleBuildOnchainApp = useCallback(() => {
    window.open('https://onchain-app-template.vercel.app/', '_blank');
  }, []);


  return (
    <div className="mb-6 flex w-full flex-col items-center justify-center bg-black">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden md:h-[660px]">
        <div
          className={classNames(
            'absolute inset-0',
            'before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-20 before:bg-gradient-to-b before:from-black before:via-black/50 before:to-transparent',
            'after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-24 after:bg-gradient-to-t after:from-black after:via-black/50 after:to-transparent',
          )}
        >
          <GridHero columns={30} hasBlue className="hidden md:block" />
          <GridHero columns={50} hasBlue className="md:hidden" />
        </div>
        <Title className="z-10 font-display text-[1.25rem] leading-[1.2em] tracking-tight md:text-[2rem] lg:text-[3rem]">
          Build anything onchain
        </Title>

        <div className="mt-7 flex w-[345px] flex-col items-center md:w-[645px]">
          <div className="relative w-full">
            <button
              type="button"
              onClick={handleSearchClick}
              className={classNames(
                'whitespace-nowrap text-base', // Button shared base
                'transition-all', // Button shared transition
                'border border-gray-muted/65', // ButtonVariant.SecondaryOutline
                'w-full px-4 py-3 md:px-6',
                'bg-illoblack hover:bg-illoblack', // TODO: what hover state?
                'font-medium text-white',
                'rounded-xl border !border-dark-palette-foregroundMuted/20',
              )}
            >
              <div className="flex h-9 w-full items-center justify-between">
                <div className="tracking-normal md:hidden">Search tools or templates...</div>
                <div className="hidden tracking-normal md:inline">
                  Search tools or templates to get started
                </div>
                <div className="flex gap-1">
                  <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                    ⌘
                  </div>
                  <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                    B
                  </div>
                </div>
              </div>
            </button>
            <SearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen} />
          </div>
          <div className="z-10 mt-3 flex w-full flex-col items-start justify-between gap-3 md:mt-4 md:flex md:flex-row">
            <Button
              variant={ButtonVariants.SecondaryOutline}
              iconName="baseOrgDiagonalUpArrow"
              className="rounded-xl text-sm"
              onClick={handleLaunchAgent}
            >
              Launch an AI agent
            </Button>
            <Button
              variant={ButtonVariants.SecondaryOutline}
              iconName="baseOrgDiagonalUpArrow"
              className="rounded-xl text-sm"
              onClick={handleIntegrateCryptoPayments}
            >
              Integrate crypto payments
            </Button>
            <Button
              variant={ButtonVariants.SecondaryOutline}
              iconName="baseOrgDiagonalUpArrow"
              className="rounded-xl text-sm"
              onClick={handleBuildOnchainApp}
            >
              Build an onchain app
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
