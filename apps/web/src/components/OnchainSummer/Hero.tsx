'use client';

import { StaticImageData } from 'next/image';
import ocs_banner from 'apps/web/public/images/ocs/ocs_banner.svg';
import ocs_banner_mobile from 'apps/web/public/images/ocs/ocs_banner_mobile.svg';
import ScrollBanner from 'apps/web/src/components/OnchainSummer/ScrollBanner';
import { OCSButton } from 'apps/web/src/components/OnchainSummer/OCSButton';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';

export default function Hero() {
  return (
    <div className="mb-[1px] flex w-full flex-col items-center justify-center rounded-t-[6px] bg-ocsblue">
      <ScrollBanner />
      <div className="mt-6 flex w-full max-w-[1200px] flex-col px-8">
        <FadeInSection>
          <ImageAdaptive
            src={ocs_banner as StaticImageData}
            alt="Onchain Summer Banner"
            className="hidden md:block"
          />
          <ImageAdaptive
            src={ocs_banner_mobile as StaticImageData}
            alt="Onchain Summer Banner"
            className="md:hidden"
          />
        </FadeInSection>
        <FadeInSection delay={0.5}>
          <div className="mb-12 mt-12 flex w-full flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="text-4xl text-white">
              June <span className="text-ocsyellow">→</span> August
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <a
                href="https://onchain-summer.devfolio.co/?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
                target="_blank"
                rel="noreferrer noopener"
              >
                <OCSButton>Join the Buildathon</OCSButton>
              </a>
              <a
                href="https://buildonbase.deform.cc/registry/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <OCSButton variant="secondary">share your ideas</OCSButton>
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
