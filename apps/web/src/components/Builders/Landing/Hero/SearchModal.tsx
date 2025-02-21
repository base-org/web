'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import Input from 'apps/web/src/components/Input';
import { createPortal } from 'react-dom';
import Link from 'apps/web/src/components/Link';

type SearchCategory = {
  category: string;
  subCategories: SubCategory[];
};

type SubCategory = {
  label: string;
  href: string;
  icon: string;
  iconRotation?: string;
  onClick?: () => void;
  description?: string | React.ReactNode;
};

const searchConfig: SearchCategory[] = [
  {
    category: 'Quickstart',
    subCategories: [
      {
        label: 'npm create onchain',
        description: (
          <div className="px-4 pb-2 text-xs text-dark-palette-foregroundMuted ">
            Run this command in your terminal to start building with
            <Link
              href="https://docs.base.org/builderkits/onchainkit/getting-started"
              color="white"
              className="pl-1 text-xs text-white"
              target="_blank"
            >
              OnchainKit quickstart template.
            </Link>
          </div>
        ),
        href: '',
        icon: 'copy',
        onClick: () => {
          console.log('clicked');
          const copyCreateOnchain = async () => {
            try {
              await navigator.clipboard.writeText('npm create onchain');
            } catch (error) {
              console.error('Failed to copy to clipboard', error);
            }
          };
          void copyCreateOnchain();
        },
      },
    ],
  },
  {
    category: 'Templates',
    subCategories: [
      {
        label: 'Launch an AI agent',
        href: 'https://replit.com/@CoinbaseDev/CDP-AgentKit#README.md',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Build an onchain store',
        href: 'https://onchain-commerce-template.vercel.app/',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Integrate crypto payments',
        href: 'https://replit.com/@KevinLeffew1/buy-me-a-coffee?v=1#README.md',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Build a social app',
        href: 'https://github.com/fakepixels/ock-identity',
        icon: 'diagonalUpArrow',
      },
    ],
  },
  {
    category: 'Tools',
    subCategories: [
      {
        label: 'OnchainKit',
        href: '/builders/onchainkit',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'AgentKit',
        href: '/builders/agentkit',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      // TODO: Add back after launch
      // {
      //   label: 'Base Appchains',
      //   href: '/builders/appchains',
      //   icon: 'backArrow',
      //   iconRotation: 'rotate-180',
      // },
      {
        label: 'Smart Wallet',
        href: '/builders/smart-wallet',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'MiniKit',
        href: '/builders/minikit',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },

      // TODO: Add back after launch
      // {
      //   label: 'Verifications',
      //   href: '/builders/verifications',
      //   icon: 'backArrow',
      //   iconRotation: 'rotate-180',
      // },
    ],
  },
  {
    category: 'Guides',
    subCategories: [
      {
        label: 'Onboard everyone',
        href: 'https://docs.base.org/use-cases/onboard-any-user',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Accept crypto payments',
        href: 'https://docs.base.org/use-cases/accept-crypto-payments',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Launch AI Agents',
        href: 'https://docs.base.org/use-cases/launch-ai-agents',
        icon: 'diagonalUpArrow',
      },
      {
        label: "Kickstart your app's growth",
        href: 'https://docs.base.org/use-cases/decentralize-social-app',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Unlock the power of DeFi',
        href: 'https://docs.base.org/use-cases/defi-your-app',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Remove first-timer friction',
        href: 'https://docs.base.org/use-cases/go-gasless',
        icon: 'diagonalUpArrow',
      },
    ],
  },
];

export function SearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchConfig, setActiveSearchConfig] = useState<SearchCategory[]>(searchConfig);

  const debounced = useRef<number>();
  const onSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(debounced.current);

      const value = e.target.value;
      setSearchQuery(value);
    },
    [setSearchQuery],
  );

  const clearInput = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleClick = (e: MouseEvent) => {
        const modalEl = document.querySelector('[aria-label="search-modal"]');
        if (modalEl && !modalEl.contains(e.target as Node)) {
          clearInput();
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [isOpen, clearInput, setIsOpen]);

  useEffect(() => {
    if (searchQuery) {
      const filteredCategories = searchConfig.filter((category) =>
        category.subCategories.some((subCategory) =>
          subCategory.label.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );

      const filteredSearchConfig = filteredCategories.map((category) => ({
        category: category.category,
        subCategories: category.subCategories.filter((subCategory) =>
          subCategory.label.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }));
      setActiveSearchConfig(filteredSearchConfig);
    } else {
      setActiveSearchConfig(searchConfig);
    }
  }, [searchQuery]);

  const handleSearchInputFocus = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={classNames(
        'fixed inset-0 z-50 overflow-hidden',
        'bg-black/90 text-white selection:bg-[#C5DAFC] selection:text-blue',
      )}
    >
      <div
        aria-label="search-modal"
        aria-modal="true"
        role="dialog"
        className={classNames(
          'bg-illoblack',
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'max-h-[460px] w-full overflow-y-auto md:w-[555px]',
          'rounded-xl border border-gray-muted/20  hover:border-gray-muted/20',
        )}
      >
        <Input
          ref={searchInputRef}
          onFocus={handleSearchInputFocus}
          onChange={onSearchInputChange}
          className={classNames(
            'w-full p-4',
            'bg-illoblack',
            'border-b border-gray-muted/20 hover:border-gray-muted/20 focus:outline-none',
          )}
          placeholder="Find tools, templates, or guides"
        />
        {activeSearchConfig.length > 0 && (
          <div className="flex w-full flex-col gap-4 pt-4">
            <div className="flex w-full flex-col items-start justify-center">
              {activeSearchConfig.map((searchCategory) => (
                <div key={searchCategory.category} className="w-full">
                  <div className="w-full px-4 py-2 text-sm font-medium uppercase tracking-normal text-gray-muted">
                    {searchCategory.category}
                  </div>
                  {searchCategory.subCategories.map((subCategory) => (
                    <div key={subCategory.label} className="flex flex-col">
                      <button
                        type="button"
                        className={classNames(
                          'group',
                          'w-full rounded-xl px-4 py-2',
                          {
                            'font-mono': searchCategory.category === 'Quickstart',
                          },
                          'text-white',
                          'flex items-center justify-between',
                          'hover:bg-dark-palette-backgroundAlternate active:bg-dark-palette-secondary',
                        )}
                        onClick={
                          subCategory.href
                            ? () => window.open(subCategory.href)
                            : subCategory?.onClick
                        }
                      >
                        <span className="tracking-normal">{subCategory.label}</span>
                        <div
                          className={classNames(
                            'opacity-0 transition-opacity group-hover:opacity-100',
                            subCategory?.iconRotation,
                          )}
                        >
                          <Icon name={subCategory.icon} width="16" height="16" />
                        </div>
                      </button>
                      {subCategory.description}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
