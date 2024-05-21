import Head from 'next/head';
import DeprecationContent from 'apps/bridge/src/components/DeprecationContent/DeprecationContent';

export default function Transactions() {
  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <DeprecationContent />
    </>
  );
}
