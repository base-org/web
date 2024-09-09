'use client';
import ErrorImg from 'apps/web/public/images/error.png';
import { Button } from '../Button/Button';
import { Card } from './Card';
import { EcosystemApp } from 'apps/web/src/components/Ecosystem/Content';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { Dispatch, SetStateAction, useCallback } from 'react';

export function List({
  selectedTag,
  searchText,
  apps,
  showCount,
  setShowCount,
}: {
  selectedTag: string;
  searchText: string;
  apps: EcosystemApp[];
  showCount: number;
  setShowCount: Dispatch<SetStateAction<number>>;
}) {
  const canShowMore = showCount < apps.length;
  const showEmptyState = apps.length === 0;
  const truncatedApps = apps.slice(0, showCount);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShowCount(showCount + 16);
    },
    [setShowCount, showCount],
  );

  return (
    <>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-4">
        {truncatedApps.map((app) => (
          <Card {...app} key={app.url} />
        ))}
      </div>
      {showEmptyState && (
        <div className="flex flex-col items-center gap-12">
          <ImageAdaptive src={ErrorImg} alt="No search results" />
          <span className="font-mono text-4xl text-white">
            NO RESULTS FOR &ldquo;{searchText === '' ? selectedTag : searchText}
            &rdquo;
          </span>
          <span className="font-sans text-gray-muted">Try searching for another term</span>
        </div>
      )}
      {canShowMore && (
        <div className="mt-12 flex justify-center">
          <Button onClick={onClick}>VIEW MORE</Button>
        </div>
      )}
    </>
  );
}
