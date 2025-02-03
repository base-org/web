'use client';

import logo from 'apps/web/src/components/base-org/shared/TopNavigation/assets/logo.svg';
import Image, { type StaticImageData } from 'next/image';

const LOGO_WIDTH = 200; // width of each logo in pixels
const LOGO_GAP = 40; // gap between logos in pixels
const TOTAL_LOGOS = 10; // reduced number of logos per group for better performance

export function Customers() {
  const logos = Array(TOTAL_LOGOS).fill(null);

  return (
    <div className="h-full w-full pt-32">
      <h2 className="mb-16 max-w-6xl text-3xl font-bold tracking-tight text-white">
        Powering the most consumer-friendly applications onchain.
      </h2>

      {/* Auto-scrolling Logos */}
      <figure
        className="relative flex h-28 items-center overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className="animate-scroll absolute left-0 flex"
          style={{
            gap: `${LOGO_GAP}px`,
            width: `calc((${LOGO_WIDTH}px + ${LOGO_GAP}px) * ${TOTAL_LOGOS})`,
          }}
        >
          {/* First set of logos */}
          {logos.map((_, index) => (
            <Image
              key={`first-${index}`}
              src={logo as StaticImageData}
              alt="Base"
              width={LOGO_WIDTH}
              height={LOGO_WIDTH}
              className="flex-none opacity-50 transition-opacity hover:opacity-100"
            />
          ))}
          {/* Duplicate set of logos for seamless loop */}
          {logos.map((_, index) => (
            <Image
              key={`second-${index}`}
              src={logo as StaticImageData}
              alt="Base"
              width={LOGO_WIDTH}
              height={LOGO_WIDTH}
              className="flex-none opacity-50 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </figure>
    </div>
  );
}
