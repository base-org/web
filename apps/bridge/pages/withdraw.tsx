import { memo } from 'react';
import Head from 'next/head';
import { DeprecationContent } from 'apps/bridge/src/components/DeprecationContent/DeprecationContent';

export default memo(function WithdrawPage() {
  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <DeprecationContent />
    </>
  );
});
