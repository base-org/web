'use client';

import NameDisplay from './NameDisplay';
import { useNameList } from 'apps/web/src/components/Basenames/ManageNames/hooks';
import Link from 'apps/web/src/components/Link';
import { Icon } from 'apps/web/src/components/Icon/Icon';

function NamesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Basenames</h1>
        <Link
          className="rounded-lg bg-palette-backgroundAlternate p-2 text-sm text-palette-foreground"
          href="/names/"
        >
          <Icon name="plus" color="currentColor" width="12px" height="12px" />
        </Link>
      </div>
      {children}
    </div>
  );
}

export default function NamesList() {
  const { namesData, isLoading } = useNameList();

  if (isLoading) {
    return (
      <NamesLayout>
        <div>Loading names...</div>
      </NamesLayout>
    );
  }

  if (!namesData?.data?.length) {
    return (
      <NamesLayout>
        <div>
          No names found.
          <Link href="/names/">Get a Basename!</Link>
        </div>
      </NamesLayout>
    );
  }

  return (
    <NamesLayout>
      <ul className="mx-auto flex max-w-2xl flex-col gap-4">
        {namesData.data.map((name) => (
          <NameDisplay
            key={name.token_id}
            domain={name.domain}
            isPrimary={name.is_primary}
            tokenId={name.token_id}
            expiresAt={name.expires_at}
          />
        ))}
      </ul>
    </NamesLayout>
  );
}
