import { useCallback, useEffect, useMemo, useState } from 'react';
import ErrorImg from 'apps/web/public/images/error.png';
import data from 'apps/web/src/data/ecosystem.json';
import Image from 'next/image';

import { Button } from '../Button/Button';

import { Card } from './Card';
import { SearchBar } from './SearchBar';
import { TagChip } from './TagChip';
import { useRouter } from 'next/router';

const TagList = [
  'all',
  'bridge',
  'dao',
  'defi',
  'gaming',
  // note in partnerCsvToEcosystemJson.js we remap infrastructure -> infra so it'll fit in the chip
  'infra',
  'nft',
  'onramp',
  'security',
  'social',
  'wallet',
  'x-chain',
];

function orderedDataAsc() {
  return data.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1;
    }
    return 0;
  });
}

const decoratedData = orderedDataAsc().map((d) => ({
  ...d,
  searchName: d.name.toLowerCase(),
}));

export function List() {
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [showNum, setShowNum] = useState(16);

  // Read select tag query parameter from URL
  const router = useRouter();
  useEffect(() => {
    if (router.query.tag) {
      setSelectedTag(router.query.tag as string);
    }
  }, [router.query.tag]);

  const selectTag = useCallback(
    (tag: string) => {
      void router.push({ query: { tag } });
    },
    [router],
  );

  const filteredApps = useMemo(
    () =>
      decoratedData.filter((app) => {
        const isTagged = selectedTag === 'all' || app.tags.includes(selectedTag);

        const isSearched =
          searchText === '' || app.name.toLowerCase().match(searchText.toLocaleLowerCase());

        return isTagged && isSearched;
      }),
    [selectedTag, searchText],
  );
  const truncatedApps = useMemo(() => filteredApps.slice(0, showNum), [filteredApps, showNum]);
  const canShowMore = showNum < filteredApps.length;
  const showEmptyState = filteredApps.length === 0;

  const showMore = useCallback(() => setShowNum((num) => num + 16), [setShowNum]);

  return (
    <div className="min-h-32 flex w-full max-w-[1440px] flex-col gap-10 px-8 pb-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-row flex-wrap gap-3">
          {TagList.map((tag) => (
            <TagChip
              tag={tag}
              isSelected={selectedTag === tag}
              setSelectedTag={selectTag}
              key={tag}
            />
          ))}
        </div>
        <div className="order-first grow lg:order-last">
          <SearchBar setSearchText={setSearchText} />
        </div>
      </div>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-4">
        {truncatedApps.map((app) => (
          <Card {...app} key={app.url} />
        ))}
      </div>
      {showEmptyState && (
        <div className="flex flex-col items-center gap-12">
          <Image src={ErrorImg} alt="No search results" />
          <span className="font-mono text-4xl text-white">
            NO RESULTS FOR &ldquo;{searchText === '' ? selectedTag : searchText}
            &rdquo;
          </span>
          <span className="font-sans text-gray-muted">Try searching for another term</span>
        </div>
      )}

      {canShowMore && (
        <div className="mt-12 flex justify-center">
          <Button onClick={showMore}>VIEW MORE</Button>
        </div>
      )}
    </div>
  );
}
