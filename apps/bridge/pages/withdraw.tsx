import { memo } from 'react';
import { DepositWithdrawContainer } from 'apps/bridge/src/components/DepositWithdrawContainer/DepositWithdrawContainer';
import { WithdrawContainer } from 'apps/bridge/src/components/WithdrawContainer/WithdrawContainer';
import Head from 'next/head';

export default memo(function WithdrawPage() {
  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <DepositWithdrawContainer>
        <WithdrawContainer />
      </DepositWithdrawContainer>
    </>
  );
});
