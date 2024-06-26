import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { docsUrl } from 'apps/web/src/constants';
import Image from 'next/image';
import Link from 'next/link';

function ReadTheDocsButton() {
  return (
    <div className="w-[200px]">
      <Link href={docsUrl} target="_blank" rel="noreferrer noopener">
        <Button variant={ButtonVariants.Primary}>Read the docs</Button>
      </Link>
    </div>
  );
}

export function StartBuildingOnBase() {
  return (
    <section className="flex w-full max-w-[1440px] flex-row flex-wrap items-start justify-between bg-black px-8 py-8">
      <div className="pb-16 font-display text-3xl text-white md:text-5xl lg:text-6xl">
        <h2 className="mb-[12px]">Start building on Base</h2>
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
