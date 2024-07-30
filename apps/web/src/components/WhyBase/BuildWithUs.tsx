import React from 'react';
import Link from 'apps/web/node_modules/next/link';

import { Button } from 'apps/web/src/components/Button/Button';

export default function BuildWithUs() {
  return (
    <div className="flex flex-row gap-32 bg-black px-20 pb-20 pt-10">
      <div className="flex h-[380px] w-[1250px] flex-col items-center justify-center bg-[url('../public/images/build-with-us.png')]">
        <h1 className="text-6xl">Start building with us</h1>
        <div className="mt-8 flex flex-row justify-center gap-8">
          <Link href="/" target="_blank" rel="noreferrer noopener">
            <Button className="uppercase">Get Started</Button>
          </Link>
          <Link href="https://docs.base.org/docs" target="_blank" rel="noreferrer noopener">
            <Button variant="secondary" className="uppercase">
              View Our Docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
