import Link from 'next/link';

import { Icon } from '../Icon/Icon';

export function GetConnected() {
  return (
    <div className="flex min-h-[300px] w-full max-w-[1440px] flex-row flex-wrap items-start justify-between bg-black px-8">
      <div className=" pb-16 font-display text-2xl uppercase text-white lg:text-3xl">
        <p className="mb-[12px]">Get Connected</p>
      </div>

      <div className="flex flex-row gap-4 lg:h-full lg:items-center lg:gap-8">
        <div className="rounded-full border border-white p-5">
          <Link href="/discord" title="Join us on Discord">
            <Icon name="discord" width="48" height="48" />
          </Link>
        </div>
        <div className="rounded-full border border-white p-5">
          <a href="https://github.com/base-org" title="Join us on Github">
            <Icon name="github" width="48" height="48" />
          </a>
        </div>
        <div className="rounded-full border border-white p-5">
          <a href="https://twitter.com/buildonbase" title="Join us on Twitter">
            <Icon name="twitter" width="48" height="48" />
          </a>
        </div>
      </div>
    </div>
  );
}
