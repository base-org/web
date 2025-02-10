import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import proof from 'apps/web/src/components/Developers/Appchains/proof.png';
import superchamps from 'apps/web/src/components/Developers/Appchains/superchamps.png';
import blocklords from 'apps/web/src/components/Developers/Appchains/blocklords.png';
import Image, { StaticImageData } from 'next/image';

export function OnchainApps() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>
        Ideal for high-performance onchain apps, like games and AI applications.
      </Title>
      <div className="flex w-full gap-10">
        <Image src={proof as StaticImageData} alt="proof" />
        <Image src={superchamps as StaticImageData} alt="superchamps" />
        <Image src={blocklords as StaticImageData} alt="blocklords" />
      </div>
    </div>
  );
}
