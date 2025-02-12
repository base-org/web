import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import cattown from 'apps/web/src/components/Developers/BaseWallet/svg/cattown.svg';
// import guild from 'apps/web/src/components/Developers/BaseWallet/svg/guild.svg';
// import kleros from 'apps/web/src/components/Developers/BaseWallet/svg/kleros.svg';
// import uniswap from 'apps/web/src/components/Developers/BaseWallet/svg/uniswap.svg';
// import worldcoin from 'apps/web/src/components/Developers/BaseWallet/svg/worldcoin.svg';
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
            <Image src={cattown as StaticImageData} alt="header-image" className="h-10 w-10" />
          </div>
          <div className="p-4">GUILD</div>
          <div className="p-4">GUILD</div>
          <div className="p-4">GUILD</div>
          <div className="p-4">GUILD</div>
        </Marquee>
      </div>
    </div>
  );
}
