'use client';

import dynamic from 'next/dynamic';

const FarcasterFrameDynamic = dynamic(
  async () => import('apps/web/src/components/FarcasterFrame'),
  { ssr: false },
);

export default FarcasterFrameDynamic;
