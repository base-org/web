'use client';

import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { StaticImageData } from 'next/image';

import b3 from 'apps/web/src/components/Builders/Shared/assets/appchains/b3.svg';
import blocklords from 'apps/web/src/components/Builders/Shared/assets/appchains/blocklords.svg';
import illuvium from 'apps/web/src/components/Builders/Shared/assets/appchains/illuvium.svg';
import metacade from 'apps/web/src/components/Builders/Shared/assets/appchains/metacade.png';
import proofworks from 'apps/web/src/components/Builders/Shared/assets/appchains/proofworks.svg';
import superchamps from 'apps/web/src/components/Builders/Shared/assets/appchains/superchamps.svg';
import aerodrome from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/aerodrome.svg';
import cattown from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/cattown.svg';
import cooprecords from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/cooprecords.svg';
import frenpet from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/frenpet.svg';
import guild from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/guild.svg';
import heyelsa from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/heyelsa.svg';
import kyberswap from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/kyberswap.svg';
import layer3 from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/layer3.svg';
import magiceden from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/magiceden.svg';
import moshicam from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/moshicam.svg';
import moonwell from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/moonwell.svg';
import opensea from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/opensea.svg';
import pancakeswap from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/pancakeswap.svg';
import seamless from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/seamless.svg';
import tokeimon from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/tokeimon.svg';
import uniswap from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/uniswap.svg';
import virtual from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/virtual.svg';
import zora from 'apps/web/src/components/Builders/Shared/assets/smart-wallet/zora.svg';
import Link from 'apps/web/src/components/Link';

import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';

type Customer = {
  href: string;
  logo: StaticImageData;
};

const customers: Customer[] = [
  {
    href: 'https://www.b3.fun/',
    logo: b3 as StaticImageData,
  },
  {
    href: 'https://blocklords.com/',
    logo: blocklords as StaticImageData,
  },
  {
    href: 'https://illuvium.io/',
    logo: illuvium as StaticImageData,
  },
  {
    href: 'https://tournaments.metacade.co/',
    logo: metacade,
  },
  {
    href: 'https://proof-8.com/news/introducing-proof-8-new-name-same-spirit', // TO CONFIRM
    logo: proofworks as StaticImageData,
  },
  {
    href: 'https://www.superchamps.com/',
    logo: superchamps as StaticImageData,
  },
  {
    href: 'https://aerodrome.finance/',
    logo: aerodrome as StaticImageData,
  },
  {
    href: 'https://cat.town/',
    logo: cattown as StaticImageData,
  },
  {
    href: 'https://www.cooprecords.xyz/',
    logo: cooprecords as StaticImageData,
  },
  {
    href: '', // TO CONFIRM
    logo: frenpet as StaticImageData,
  },
  {
    href: 'https://guild.xyz/',
    logo: guild as StaticImageData,
  },
  {
    href: 'https://www.heyelsa.ai/',
    logo: heyelsa as StaticImageData,
  },
  {
    href: 'https://kyberswap.com/swap/base',
    logo: kyberswap as StaticImageData,
  },
  {
    href: 'https://app.layer3.xyz/quests',
    logo: layer3 as StaticImageData,
  },
  {
    href: 'https://magiceden.us',
    logo: magiceden as StaticImageData,
  },
  {
    href: 'https://moshi.cam/',
    logo: moshicam as StaticImageData,
  },
  {
    href: 'https://moonwell.fi/',
    logo: moonwell as StaticImageData,
  },
  {
    href: 'https://opensea.io/',
    logo: opensea as StaticImageData,
  },
  {
    href: 'https://pancakeswap.finance/',
    logo: pancakeswap as StaticImageData,
  },
  {
    href: 'https://www.seamlessprotocol.com/',
    logo: seamless as StaticImageData,
  },
  {
    href: 'https://app.tokiemon.io/mint',
    logo: tokeimon as StaticImageData,
  },
  {
    href: 'https://uniswap.org/',
    logo: uniswap as StaticImageData,
  },
  {
    href: 'https://virtuals.io/',
    logo: virtual as StaticImageData,
  },
  {
    href: 'https://zora.co/',
    logo: zora as StaticImageData,
  },
];
const LOGO_WIDTH = 200; // pixels

const logoStyle = {
  width: 'auto',
  height: 'auto',
  minWidth: '64px',
  maxWidth: '100%',
  maxHeight: '64px',
};

export function Apps() {
  return (
    <section className="h-full w-full pt-32">
      <Title level={TitleLevel.Title1} as="h2" className="mb-16 hidden md:block">
        Powering the most consumer-friendly applications onchain.
      </Title>
      <Title level={TitleLevel.Title3} className="mb-8 font-medium md:hidden">
        Powering the most consumer-friendly applications onchain.
      </Title>
      <Marquee className="[--duration:60s]" childrenClassName="!gap-[96px]">
        {customers.map((customer) => (
          <div
            className={`max-w-[${LOGO_WIDTH}px] flex items-center`}
            key={`first-${customer.href}`}
          >
            <Link href={customer.href} target="_blank">
              <Image
                src={customer.logo}
                alt={String(customer.logo.src)}
                style={logoStyle}
                className="flex-none object-contain opacity-50 transition-opacity hover:opacity-100"
              />
            </Link>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
