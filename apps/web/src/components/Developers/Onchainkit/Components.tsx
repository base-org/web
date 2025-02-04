'use client';

import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useCallback, useState } from 'react';

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
              >
                {header}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button className="!px-2" variant={ButtonVariants.SecondaryOutline} onClick={handleCopy}>
            <Icon name="copy" width="12" height="12" color="currentColor" />
          </Button>
        </div>
      </div>
      <div className="p-6">components here</div>
    </section>
  );
}
