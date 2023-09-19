import { memo } from 'react';
import { DepositContainer } from 'apps/bridge/src/components/DepositContainer/DepositContainer';
import { DepositWithdrawContainer } from 'apps/bridge/src/components/DepositWithdrawContainer/DepositWithdrawContainer';
import Head from 'next/head';

export default memo(function DepositPage() {
  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <DepositWithdrawContainer>
        <DepositContainer />
      </DepositWithdrawContainer>
    </>
  );
});
