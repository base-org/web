export const runtime = 'edge';

import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import EcosystemHeroLogos from 'apps/web/public/images/ecosystem-hero-logos-new.png';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { List } from 'apps/web/src/components/Ecosystem/List';
import type { Metadata } from 'next';
import Image from 'next/image';
import ecosystemApps from 'apps/web/src/data/ecosystem.json';
import { TagChip } from 'apps/web/src/components/Ecosystem/TagChip';
import { SearchBar } from 'apps/web/src/components/Ecosystem/SearchBar';
import { Suspense } from 'react';
export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | About`,
  openGraph: {
    title: `Base | About`,
    url: `/about`,
  },
};

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

async function EcosystemHero() {
  return (
    <div className="mt-[-96px] flex w-full flex-col items-center bg-black pb-[96px]">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-8 py-8 pt-28 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <h1 className="font-display text-3xl text-white md:text-5xl lg:text-6xl">
            Base ecosystem
          </h1>
          <h2 className="font-display text-xl text-white md:text-2xl lg:text-3xl">
            An overview of apps and integrations in the Base ecosystem.
          </h2>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScKCOjB4wFmb7u-1VpgMZOGLYq4GUBGt3AwQKqUAlTgjnucGQ/viewform"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button variant={ButtonVariants.Primary} fullWidth className="md:w-64">
              Apply
            </Button>
          </a>
        </div>
        <div className="flex w-full md:w-1/2 md:justify-end">
          <Image className="-mr-16" src={EcosystemHeroLogos} alt="ecosystem dapp logos" />
        </div>
      </div>
    </div>
  );
}

type EcosystemProps = {
  searchParams: { tag?: string; search?: string; showCount: number };
};

export default async function Ecosystem(page: EcosystemProps) {
  const selectedTag = page.searchParams.tag ?? tags[0];
  const search = page.searchParams.search ?? '';
  const showCount = page.searchParams.showCount ? Number(page.searchParams.showCount) : 16;

  const filteredEcosystemApps = decoratedEcosystemApps.filter((app) => {
    const isTagged = selectedTag === 'all' || app.tags.includes(selectedTag);
    const isSearched = search === '' || app.name.toLowerCase().match(search.toLocaleLowerCase());
    return isTagged && isSearched;
  });

  return (
    <main className="flex w-full flex-col items-center bg-black">
      <EcosystemHero />
      <Divider />
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
    </main>
  );
}
