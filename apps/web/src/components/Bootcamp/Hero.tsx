import { Button } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';

const subtitleCopy =
  'Base Bootcamp is an async, cohort-based training program designed to turn web developers into Smart Contract developers.';

export async function Hero() {
  return (
    <header className="mt-[-96px] flex h-[700px] w-full flex-col items-center bg-black bg-bootcamp_background_image bg-cover">
      <div className="mt-48 flex w-full max-w-[1440px] flex-col px-8 pt-12">
        <div className="flex w-full flex-col font-display text-4xl text-white md:text-6xl lg:text-7xl">
          <p>Learn to build onchain</p>
          <p className="max-w-sm pt-6 font-display text-sm text-white md:max-w-md md:text-lg lg:text-left">
            {subtitleCopy}
          </p>
        </div>
        <div className="mt-10 w-[200px]">
          <Link
            className="w-full"
            href="https://forms.gle/iqZqJ6WAqkWaouLn8"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button fullWidth>Apply now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
