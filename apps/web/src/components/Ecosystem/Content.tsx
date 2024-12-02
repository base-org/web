'use client';

import ecosystemApps from 'apps/web/src/data/ecosystem.json';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { SearchBar } from 'apps/web/src/components/Ecosystem/SearchBar';
import { useMemo, useState } from 'react';
import { List } from 'apps/web/src/components/Ecosystem/List';

export type EcosystemApp = {
  searchName: string;
  name: string;
  category: string;
  subcategory: string;
  url: string;
  description: string;
  imageUrl: string;
};

// Get unique categories and subcategories
const categories = ['all', ...new Set(ecosystemApps.map((app) => app.category))];
const subcategories = ['all', ...new Set(ecosystemApps.map((app) => app.subcategory))];

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

export default function Content() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(['all']);
  const [search, setSearch] = useState<string>('');
  const [showCount, setShowCount] = useState<number>(16);

  console.log('length of json:', ecosystemApps.length);

  const selectCategory = (category: string): void => {
    setSelectedCategories((prevCategories) => {
      if (category === 'all') {
        return ['all'];
      }
      const newCategories = prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories.filter((c) => c !== 'all'), category];
      return newCategories.length === 0 ? ['all'] : newCategories;
    });
  };

  const selectSubcategory = (subcategory: string): void => {
    setSelectedSubcategories((prevSubcategories) => {
      if (subcategory === 'all') {
        return ['all'];
      }
      const newSubcategories = prevSubcategories.includes(subcategory)
        ? prevSubcategories.filter((s) => s !== subcategory)
        : [...prevSubcategories.filter((s) => s !== 'all'), subcategory];
      return newSubcategories.length === 0 ? ['all'] : newSubcategories;
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
              />
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {subcategories.map((subcategory) => (
              <TagChip
                tag={subcategory}
                isSelected={selectedSubcategories.includes(subcategory)}
                key={subcategory}
                selectTag={selectSubcategory}
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
        selectedSubcategories={selectedSubcategories}
        searchText={search}
        apps={filteredEcosystemApps}
        showCount={showCount}
        setShowCount={setShowCount}
      />
    </div>
  );
}
