import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import icebreaker from 'apps/web/src/components/Developers/Verifications/icebreaker.svg';
import deform from 'apps/web/src/components/Developers/Verifications/deform.svg';
import gitcoin from 'apps/web/src/components/Developers/Verifications/gitcoin.svg';
import Image, { StaticImageData } from 'next/image';

export function Customers() {
  return (
    <div className="flex w-full flex-col gap-2 tracking-tight">
      <Title level={TitleLevel.Title1}>
        Powering the most consumer-friendly applications onchain.
      </Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          <div className="p-4">
            <Image src={icebreaker as StaticImageData} alt="icebreaker" className="h-10 w-auto" />
          </div>

          <div className="p-4">
            <Image src={deform as StaticImageData} alt="deform" className="h-10" />
          </div>
          <div className="p-4">
            <Image src={gitcoin as StaticImageData} alt="gitcoin" className="h-10" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
