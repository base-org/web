'use client';

import ecosystemApps from 'apps/web/src/data/ecosystem.json';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { SearchBar } from 'apps/web/src/components/Ecosystem/SearchBar';
import { useState } from 'react';
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
      return array.indexOf(value) === index;
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
  const [selectedTag, setSelectedTag] = useState(tags[0]);
  const [search, setSearch] = useState('');
  const [showCount, setShowCount] = useState(16);

  const filteredEcosystemApps = decoratedEcosystemApps.filter((app) => {
    const isTagged = selectedTag === 'all' || app.tags.includes(selectedTag);
    const isSearched = search === '' || app.name.toLowerCase().match(search.toLocaleLowerCase());
    return isTagged && isSearched;
  });

  return (
    <div className="flex min-h-32 w-full flex-col gap-10 pb-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-row flex-wrap gap-3">
          {tags.map((tag) => (
            <TagChip
              tag={tag}
              isSelected={selectedTag === tag}
              key={tag}
              setSelectedTag={setSelectedTag}
            />
          ))}
        </div>
        <div className="order-first grow lg:order-last">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>
      <List
        selectedTag={selectedTag}
        searchText={search}
        apps={filteredEcosystemApps}
        showCount={showCount}
        setShowCount={setShowCount}
      />
    </div>
  );
}
