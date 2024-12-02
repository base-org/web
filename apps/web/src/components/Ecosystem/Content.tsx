'use client';

import ecosystemApps from 'apps/web/src/data/ecosystem.json';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { SearchBar } from 'apps/web/src/components/Ecosystem/SearchBar';
import { useMemo, useState } from 'react';
import { List } from 'apps/web/src/components/Ecosystem/List';
import { useSearchParams } from 'next/navigation';

export type EcosystemApp = {
  searchName: string;
  name: string;
  category: string;
  subcategory: string;
  url: string;
  description: string;
  imageUrl: string;
};

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

// Get unique categories and subcategories
const categories = ['all', ...new Set(ecosystemApps.map((app) => app.category))];

function orderedEcosystemAppsAsc() {
  return ecosystemApps.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1;
    }
    return 0;
  });
}

const decoratedEcosystemApps: EcosystemApp[] = orderedEcosystemAppsAsc().map((d) => ({
  ...d,
  searchName: d.name.toLowerCase(),
}));

const updateUrlParams = (params: { category?: string[]; subcategory?: string[] }) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (params.category) {
    searchParams.set('category', params.category.join(','));
  }
  if (params.subcategory) {
    searchParams.set('subcategory', params.subcategory.join(','));
  }

  window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
};

export default function Content() {
  //  This is in Next.js's docs
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const searchParams = useSearchParams()!;

  // Parse multiple categories/subcategories from URL
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cats = searchParams.get('category')?.split(',') ?? ['all'];
    return cats.filter(Boolean); // Remove empty strings
  });

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(() => {
    const subs = searchParams.get('subcategory')?.split(',') ?? ['all'];
    return subs.filter(Boolean);
  });

  const [search, setSearch] = useState<string>('');
  const [showCount, setShowCount] = useState<number>(16);

  const selectCategory = (category: string): void => {
    setSelectedCategories((prevCategories) => {
      const newCategories =
        category === 'all'
          ? ['all']
          : prevCategories.includes(category)
          ? prevCategories.filter((c) => c !== category)
          : [...prevCategories.filter((c) => c !== 'all'), category];

      const finalCategories = newCategories.length === 0 ? ['all'] : newCategories;

      if (category === 'all') {
        // Clear URL params when 'all' is selected
        window.history.pushState({}, '', window.location.pathname);
        setSelectedSubcategories(['all']);
        return finalCategories;
      }

      // Rest of the logic for other categories
      if (!prevCategories.includes(category) && config[category as keyof typeof config]) {
        const newSubs = [
          ...selectedSubcategories.filter((s) => s !== 'all'),
          ...config[category as keyof typeof config],
        ];
        setSelectedSubcategories(newSubs);
        updateUrlParams({ category: finalCategories, subcategory: newSubs });
      } else {
        const categorySubcategories = config[category as keyof typeof config] || [];
        const newSubs = selectedSubcategories.filter(
          (sub) => sub === 'all' || !categorySubcategories.includes(sub),
        );
        setSelectedSubcategories(newSubs);
        updateUrlParams({ category: finalCategories, subcategory: newSubs });
      }

      return finalCategories;
    });
  };

  const selectSubcategory = (subcategory: string): void => {
    setSelectedSubcategories((prevSubcategories) => {
      const newSubcategories =
        subcategory === 'all'
          ? ['all']
          : prevSubcategories.includes(subcategory)
          ? prevSubcategories.filter((s) => s !== subcategory)
          : [...prevSubcategories.filter((s) => s !== 'all'), subcategory];

      const finalSubcategories = newSubcategories.length === 0 ? ['all'] : newSubcategories;

      updateUrlParams({ subcategory: finalSubcategories });
      return finalSubcategories;
    });
  };

  const filteredEcosystemApps = useMemo(() => {
    return decoratedEcosystemApps.filter((app) => {
      const isCategoryMatched =
        selectedCategories.includes('all') || selectedCategories.includes(app.category);
      const isSubcategoryMatched =
        selectedSubcategories.includes('all') || selectedSubcategories.includes(app.subcategory);
      const isSearched = search === '' || app.searchName.includes(search.toLowerCase());
      return isCategoryMatched && isSubcategoryMatched && isSearched;
    });
  }, [selectedCategories, selectedSubcategories, search]);

  return (
    <div className="flex min-h-32 w-full flex-col gap-10 pb-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row flex-wrap gap-3">
            {categories.map((category) => (
              <TagChip
                tag={category}
                isSelected={selectedCategories.includes(category)}
                key={category}
                selectTag={selectCategory}
                subcategories={config[category as keyof typeof config]}
                selectedSubcategories={selectedSubcategories}
                selectSubcategory={selectSubcategory}
              />
            ))}
          </div>
        </div>
        <div className="order-first grow lg:order-last">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      <List
        selectedCategories={selectedCategories}
        searchText={search}
        apps={filteredEcosystemApps}
        showCount={showCount}
        setShowCount={setShowCount}
      />
    </div>
  );
}
