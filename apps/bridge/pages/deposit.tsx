import { memo } from 'react';
import { DepositContainer } from 'apps/bridge/src/components/DepositContainer/DepositContainer';
import { DepositWithdrawContainer } from 'apps/bridge/src/components/DepositWithdrawContainer/DepositWithdrawContainer';
import Head from 'next/head';
import getConfig from 'next/config';
import { FaqSidebar } from 'apps/bridge/src/components/Faq/FaqSidebar';

const { publicRuntimeConfig } = getConfig();

export default memo(function DepositPage() {
  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <DepositWithdrawContainer>
        {publicRuntimeConfig.l1ChainID === '5' ? (
          <div className="flex-col lg:flex lg:h-full lg:flex-row">
            <div className="grow">
              <div className="bg-[#330004] p-4 text-sm text-white">
                Deposits to Base Goerli are now disabled, as we continue the Base Testnet migration
                from Goerli to Sepolia. For more information, please read our{' '}
                <a
                  className="text-cds-primary"
                  href="https://base.mirror.xyz/-1DzslYOS7HRrbOrHdcz5sZmfIF_tpxJ-NRvcMmZ75c"
                >
                  post
                </a>
                .
              </div>
            </div>
            <FaqSidebar />
          </div>
        ) : (
          <DepositContainer />
        )}
      </DepositWithdrawContainer>
    </>
  );
});
