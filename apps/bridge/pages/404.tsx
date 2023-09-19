import { memo } from 'react';
import { Logo } from 'apps/bridge/src/components/Logo/Logo';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default memo(function ErrorPage() {
  return (
    <>
      <Head>
        <title>Base</title>
      </Head>
      <div className="flex h-screen w-full flex-col">
        <div className="grow pt-6">
          <Link href="/">
            <Logo color="white" />
          </Link>
        </div>
        <div className="h-screen grow">
          <div className="mt-2 mb-2 flex h-full min-h-[440px] w-full flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <Image src="/icons/empty-transaction.png" width="240" height="240" alt="" />
              <h3 className="pt-16 font-display text-2xl text-white">Page not found</h3>
              <span className="max-w-[420px] pt-2 text-base text-[#8A919E]">
                Sorry we couldn’t find what you were looking for.
              </span>
              <Link
                href="/"
                className="mt-6 inline-block max-w-[200px] rounded bg-white px-5 py-3.5 text-center font-sans font-bold text-[#000000] decoration-[#000000]"
              >
                BACK TO BASE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
