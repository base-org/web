import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import mainnetFee from './assets/mainnet-transactions-fees-dots.svg';
import baseFee from './assets/base-transations-fees-dots.svg';
import Image, { StaticImageData } from 'next/image';
import Text from 'apps/web/src/components/base-org/typography/Text';
export default async function TransactionsFeesSection() {
  return (
    <section>
      <div className="mb-12 mt-8 flex w-full flex-col items-center gap-4 md:flex-row">
        <div className="w-full ">
          <Title level={TitleLevel.Display2} className="text-[#E3E7E9]">
            Transactions
            <br /> below <span className="text-blue">one cent</span>
          </Title>
        </div>

        <div className="flex w-full flex-row gap-4">
          <Image
            src={mainnetFee as StaticImageData}
            className="pointer-events-none select-none"
            alt="Ethereum Mainnet Transactions fees are high"
          />
          <div className="self-end">
            <Text className="mb-6 text-[#E3E7E9]">
              Base is the best of Ethereum but 10-100x cheaper. To make onchain accessible for
              everyone, we&apos;re working to keep fees consistently below 1 cent.
            </Text>
            <Text className="mb-6 text-[#E3E7E9]">Based on 90-day average</Text>
            <Image
              src={baseFee as StaticImageData}
              alt="Base Mainnet Transactions fees are low"
              className="pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
