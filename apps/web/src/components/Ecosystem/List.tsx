import ErrorImg from 'apps/web/public/images/error.png';
import { Button } from '../Button/Button';
import { Card } from './Card';
import { EcosystemApp } from 'apps/web/src/components/Ecosystem/Content';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';

export async function List({
  selectedTag,
  searchText,
  apps,
  showCount,
}: {
  selectedTag: string;
  searchText: string;
  apps: EcosystemApp[];
  showCount: number;
}) {
  const canShowMore = showCount < apps.length;
  const showEmptyState = apps.length === 0;
  const truncatedApps = apps.slice(0, showCount);
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const tagHref: Url = {
    pathname: '/ecosystem',
    query: { tag: selectedTag, search: searchText, showCount: showCount + 16 },
  };

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
          <Link href={tagHref} scroll={false}>
            <Button>VIEW MORE</Button>
          </Link>
        </div>
      )}
    </>
  );
}
