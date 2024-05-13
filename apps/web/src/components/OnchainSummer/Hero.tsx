import Image from 'next/image';
import ocs_banner from 'apps/web/public/images/ocs/ocs_banner.svg';
import ScrollBanner from 'apps/web/src/components/OnchainSummer/ScrollBanner';
import { OCSButton } from 'apps/web/src/components/OnchainSummer/OCSButton';

export default function Hero() {
  return (
    <div className="mb-[1px] flex w-full flex-col items-center justify-center rounded-t-[6px] bg-ocsblue">
      <ScrollBanner />
      <div className="flex max-w-[1200px] flex-col">
        <Image src={ocs_banner} alt="Onchain Summer Banner" />
        <div className="mb-12 mt-12 flex w-full flex-row items-center justify-between">
          <div className="text-4xl text-white">June → August</div>
          <div className="flex flex-row gap-4">
            <OCSButton>Join the hackathon</OCSButton>
            <OCSButton variant="secondary">share your ideas</OCSButton>
          </div>
        </div>
      </div>
    </div>
  );
}
