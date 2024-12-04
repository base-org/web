'use client';

import Card from '../base-org/Card';
import classNames from 'classnames';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const config = {
  wallet: ['self-custody', 'account abstraction', 'multisig'],
  defi: [
    'stablecoin',
    'dex',
    'dex aggregator',
    'lending/borrowing',
    'derivatives',
    'liquidity management',
    'perpetuals',
    'options',
    'portfolio',
    'insurance',
    'yield vault',
  ],
  consumer: [
    'creator',
    'social',
    'gaming',
    'messaging',
    'payments',
    'music',
    'real world',
    'nft',
    'dao',
    'crypto taxes',
  ],
  onramp: ['centralized exchange', 'fiat on-ramp'],
  infra: ['ai', 'depin', 'bridge', 'security', 'developer tool', 'node provider', 'raas'],
};

type Props = {
  selectedCategories: string[];
  selectedSubcategories: string[];
  onCategorySelect: (category: string) => void;
  onSubcategorySelect: (subcategory: string) => void;
};

export function EcosystemFilters({
  selectedCategories,
  selectedSubcategories,
  onCategorySelect,
  onSubcategorySelect,
}: Props) {
  const categories = ['all', ...Object.keys(config)];

  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="relative flex flex-wrap gap-2">
        {categories.map((category, index) =>
          index === 0 ? (
            <button
              type="button"
              key={category}
              onClick={() => onCategorySelect(category)}
              className={classNames(
                'h-10 whitespace-nowrap rounded-full border border-white/20 px-4 uppercase tracking-wider transition-colors',
                {
                  'bg-white text-black': selectedCategories.includes(category),
                  'text-white/50 hover:bg-white/20 hover:text-white':
                    !selectedCategories.includes(category),
                },
              )}
            >
              {category}
            </button>
          ) : (
            <Popover.Root key={category}>
              <div className="flex h-10 items-stretch overflow-hidden rounded-full border border-white/20">
                <button
                  type="button"
                  className={classNames('px-4 uppercase tracking-wider transition-colors', {
                    'bg-white text-black': selectedCategories.includes(category),
                    'text-white/50 hover:bg-white/20 hover:text-white':
                      !selectedCategories.includes(category),
                  })}
                  onClick={() => onCategorySelect(category)}
                >
                  {category}
                </button>
                <div className="hidden w-px bg-white/20 sm:block" />
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Open Subcategory Menu"
                    className={classNames('group hidden px-2 pr-3 transition-colors sm:block', {
                      'bg-white text-black': selectedCategories.includes(category),
                      'text-white/50 hover:bg-white/20 hover:text-white':
                        !selectedCategories.includes(category),
                    })}
                  >
                    <ChevronDownIcon className="h-4 w-4 transition-transform ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                  </button>
                </Popover.Trigger>
              </div>

              <Popover.Portal>
                <Popover.Content className="z-50 w-64" sideOffset={5}>
                  <Card radius={8} innerClassName="bg-[#191919] p-4">
                    <div className="flex flex-col gap-2">
                      {config[category as keyof typeof config]?.map((subcategory) => (
                        <label
                          key={subcategory}
                          htmlFor={subcategory}
                          className="flex cursor-pointer items-center gap-2 text-sm uppercase transition-colors hover:text-white"
                        >
                          <input
                            id={subcategory}
                            type="checkbox"
                            checked={selectedSubcategories.includes(subcategory)}
                            onChange={() => onSubcategorySelect(subcategory)}
                            className="h-4 w-4 rounded border-white/20 bg-transparent checked:bg-white checked:hover:bg-white/80"
                          />
                          <span
                            className={
                              selectedSubcategories.includes(subcategory)
                                ? 'text-white'
                                : 'text-white/50'
                            }
                          >
                            {subcategory}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Card>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ),
        )}
      </div>
    </div>
  );
}
