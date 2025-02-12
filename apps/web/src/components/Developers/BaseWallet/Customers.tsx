import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import cattown from 'apps/web/src/components/Developers/BaseWallet/svg/cattown.svg';
import aerodrome from 'apps/web/src/components/Developers/BaseWallet/svg/aerodrome.svg';
import cooprecrods from 'apps/web/src/components/Developers/BaseWallet/svg/cooprecrods.svg';
import frenpet from 'apps/web/src/components/Developers/BaseWallet/svg/frenpet.svg';
import guild from 'apps/web/src/components/Developers/BaseWallet/svg/guild.svg';
import heyelsa from 'apps/web/src/components/Developers/BaseWallet/svg/heyelsa.svg';
import kyberswap from 'apps/web/src/components/Developers/BaseWallet/svg/kyberswap.svg';
import layer3 from 'apps/web/src/components/Developers/BaseWallet/svg/layer3.svg';
import mochicam from 'apps/web/src/components/Developers/BaseWallet/svg/mochicam.svg';
import moonwell from 'apps/web/src/components/Developers/BaseWallet/svg/moonwell.svg';
import opensea from 'apps/web/src/components/Developers/BaseWallet/svg/opensea.svg';
import Image, { StaticImageData } from 'next/image';

export function Customers() {
  return (
    <div className="flex w-full flex-col gap-2 tracking-tight">
      <Title level={TitleLevel.Title1} className="max-sm:hidden">
        Powering the best onchain experiences.
      </Title>
      <Title level={TitleLevel.Title3} className="sm:hidden">
        Powering the best onchain experiences.
      </Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          <div className="p-4">
            <Image src={cattown as StaticImageData} alt="cattown" className="h-10 w-10" />
          </div>
          <div className="p-4">
            <Image src={aerodrome as StaticImageData} alt="aerodrome" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={cooprecrods as StaticImageData} alt="cooprecrods" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={frenpet as StaticImageData} alt="frenpet" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={guild as StaticImageData} alt="guild" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={heyelsa as StaticImageData} alt="heyelsa" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={kyberswap as StaticImageData} alt="kyberswap" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={layer3 as StaticImageData} alt="layer3" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={mochicam as StaticImageData} alt="mochicam" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={moonwell as StaticImageData} alt="moonwell" className="h-10 w-auto" />
          </div>
          <div className="p-4">
            <Image src={opensea as StaticImageData} alt="opensea" className="h-10 w-auto" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
