import { Button } from 'apps/web/src/components/Button/Button';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();

function ReadTheDocsButton() {
  return (
    <div className="w-[200px]">
      <Link href={publicRuntimeConfig.docsUrl} target="_blank" rel="noreferrer noopener">
        <Button variant="primary">Read the docs</Button>
      </Link>
    </div>
  );
}

export function StartBuildingOnBase() {
  return (
    <section className="flex w-full max-w-[1440px] flex-row flex-wrap items-start justify-between bg-black px-8 py-8">
      <div className="pb-16 font-display text-3xl text-white md:text-5xl lg:text-6xl">
        <p className="mb-[12px]">Start building on Base</p>
        <ReadTheDocsButton />
      </div>
      <div className="relative h-[460px] w-full max-w-[678px]">
        <Image
          src="/images/start-building-on-base.png"
          className="object-contain"
          alt="Start building on base"
          fill
          quality={100}
        />
      </div>
    </section>
  );
}
