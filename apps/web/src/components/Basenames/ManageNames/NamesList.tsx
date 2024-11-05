'use client';

import NameDisplay from './NameDisplay';
import { useNameList } from 'apps/web/src/components/Basenames/ManageNames/hooks';

export default function NamesList() {
  const { namesData, isLoading } = useNameList();

  if (isLoading) {
    return <div>Loading names...</div>;
  }

  if (!namesData?.data?.length) {
    return <div>No names found</div>;
  }

  return (
    <ul className="mx-auto max-w-2xl space-y-4 p-8">
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
  );
}
