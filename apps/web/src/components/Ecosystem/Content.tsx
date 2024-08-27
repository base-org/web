'use client';

import ecosystemApps from 'apps/web/src/data/ecosystem.json';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { SearchBar } from 'apps/web/src/components/Ecosystem/SearchBar';
import { Suspense } from 'react';
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

export type EcosystemProps = {
  searchParams: { tag?: string; search?: string; showCount: number };
};

export default function Content({ searchParams }: EcosystemProps) {
  const selectedTag = searchParams.tag ?? tags[0];
  const search = searchParams.search ?? '';
  const showCount = searchParams.showCount ? Number(searchParams.showCount) : 16;

  const filteredEcosystemApps = decoratedEcosystemApps.filter((app) => {
    const isTagged = selectedTag === 'all' || app.tags.includes(selectedTag);
    const isSearched = search === '' || app.name.toLowerCase().match(search.toLocaleLowerCase());
    return isTagged && isSearched;
  });

  return (
    <div className="flex min-h-32 w-full max-w-[1440px] flex-col gap-10 px-8 pb-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-row flex-wrap gap-3">
          {tags.map((tag) => (
            <TagChip tag={tag} isSelected={selectedTag === tag} key={tag} />
          ))}
        </div>
        <div className="order-first grow lg:order-last">
          <Suspense>
            <SearchBar value={search} />
          </Suspense>
        </div>
      </div>
      <List
        selectedTag={selectedTag}
        searchText={search}
        apps={filteredEcosystemApps}
        showCount={showCount}
      />
    </div>
  );
}
