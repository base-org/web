'use client';

import ecosystemApps from 'apps/web/src/data/ecosystem.json';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { SearchBar } from 'apps/web/src/components/Ecosystem/SearchBar';
import { useMemo, useState } from 'react';
import { List } from 'apps/web/src/components/Ecosystem/List';

export type EcosystemApp = {
  searchName: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  imageUrl: string;
};

const tags = [
  'all',
  ...ecosystemApps
    .map((app) => app.tags)
    .flat()
    .filter((value, index, array) => {
      return array.indexOf(value.toLocaleLowerCase()) === index;
    }),
];

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
  const [selectedTags, setSelectedTags] = useState<string[]>(['all']);
  const [search, setSearch] = useState<string>('');
  const [showCount, setShowCount] = useState<number>(16);

  const selectTag = (tag: string): void => {
    setSelectedTags((prevTags) => {
      if (tag === 'all') {
        return ['all'];
      }
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags.filter((t) => t !== 'all'), tag];
      return newTags.length === 0 ? ['all'] : newTags;
    });
  };

  const filteredEcosystemApps = useMemo(() => {
    return decoratedEcosystemApps.filter((app) => {
      const isTagged =
        selectedTags.includes('all') || app.tags.some((tag) => selectedTags.includes(tag));
      const isSearched = search === '' || app.name.toLowerCase().includes(search.toLowerCase());
      return isTagged && isSearched;
    });
  }, [selectedTags, search]);

  return (
    <div className="flex min-h-32 w-full flex-col gap-10 pb-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-row flex-wrap gap-3">
          {tags.map((tag) => (
            <TagChip
              tag={tag}
              isSelected={selectedTags.includes(tag)}
              key={tag}
              selectTag={selectTag}
            />
          ))}
        </div>
        <div className="order-first grow lg:order-last">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      <List
        selectedTags={selectedTags}
        searchText={search}
        apps={filteredEcosystemApps}
        showCount={showCount}
        setShowCount={setShowCount}
      />
    </div>
  );
}
