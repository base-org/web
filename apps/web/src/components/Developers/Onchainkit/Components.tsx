'use client';

import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { Checkout, CheckoutButton } from '@coinbase/onchainkit/checkout';
import { DynamicCryptoProviders } from 'apps/web/app/CryptoProviders.dynamic';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useCallback, useMemo, useState } from 'react';
import { TransactionDefault } from '@coinbase/onchainkit/transaction';

const headers = ['Wallet', 'Earn', 'Fund', 'Pay', 'Buy', 'Checkout', 'Mint', 'Transact'];

export function Components() {
  const [selectedTab, setSelectedTab] = useState(headers[0]);

  const handleClick = useCallback((header: string) => {
    return () => setSelectedTab(header);
  }, []);

  const handleCopy = useCallback(() => {
    // TODO: add code copy
    void navigator.clipboard.writeText('');
  }, []);

  const selectedComponent = useMemo(() => {
    if (selectedTab === 'Transact') {
      return <TransactionDefault calls={[]} className="mr-auto w-auto" />;
    }
    if (selectedTab === 'Checkout') {
      return (
        <Checkout className="mr-auto w-auto">
          <CheckoutButton />
        </Checkout>
      );
    }
    return <WalletDefault />;
  }, [selectedTab]);

  return (
    <section className="flex w-full grow flex-col rounded-lg border border-gray-muted">
      <div className="flex justify-between gap-6 border-b border-gray-muted px-6 py-4">
        <div className="flex gap-12">
          {headers.map((header) => {
            const isSelected = selectedTab === header;
            return (
              <button
                className={isSelected ? 'text-white' : 'text-dark-palette-foregroundMuted'}
                key={header}
                onClick={handleClick(header)}
                type="button"
              >
                {header}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button className="!px-2" variant={ButtonVariants.SecondaryOutline}>
            <Icon name="copy" width="12" height="12" color="currentColor" />
          </Button>
        </div>
      </div>
      <div className="p-6">
        <DynamicCryptoProviders>
          <div className="flex">{selectedComponent}</div>
        </DynamicCryptoProviders>
      </div>
    </section>
  );
}
