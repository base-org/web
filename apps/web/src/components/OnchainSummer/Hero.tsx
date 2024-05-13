import Image from 'next/image';
import ocs_banner from 'apps/web/public/images/ocs/ocs_banner.svg';
import ScrollBanner from 'apps/web/src/components/OnchainSummer/ScrollBanner';

export default function Hero() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[6px] bg-ocsblue">
      <ScrollBanner />
      <div className="flex flex-col">
        <Image src={ocs_banner} alt="Onchain Summer Banner" />
        <div className="mt-12 flex w-full flex-row justify-between">
          <div className="text-4xl text-white">June → August</div>
          <div className="flex flex-row">
            <button>Join the hackathon</button>
            <button>share your ideas</button>
          </div>
        </div>
      </div>
    </div>
  );
}
