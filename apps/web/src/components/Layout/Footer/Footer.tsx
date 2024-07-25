import { useState, useCallback } from 'react';
import Link from 'next/link';
import { CookiePreferencesModal } from '@coinbase/cookie-banner';

import { Icon } from '../../Icon/Icon';
import { Logo } from '../../Logo/Logo';
import { bridgeUrl, docsUrl } from 'apps/web/src/constants';

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsOpen(true), []);

  const handleCloseModal = useCallback(() => setIsOpen(false), []);

  return (
    <footer className="z-10 mt-auto flex w-full justify-center bg-gray-90 lg:pb-64">
      <div className="flex w-full max-w-[1440px] flex-col justify-between p-8 lg:flex-row">
        <div className="flex flex-col font-display text-sm text-white">
          <div className="bg-blue-300 flex w-32 flex-row items-start justify-start">
            <Logo color="white" />
          </div>
          <div className="flex flex-col space-y-4 pt-20">
            <p className="font-mono text-xl uppercase text-white">
              Keep up with the latest from Base
            </p>
            <div className="flex flex-col">
              <p className="text-white">
                <a href="https://base.mirror.xyz/subscribe" className="underline">
                  Subscribe to our Mirror blog
                </a>
                : Mint the posts as unique NFTs
              </p>
              <p className="text-white">commemorating the evolution of Base.</p>
            </div>
            <div className="flex flex-col">
              <p className="text-white">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdvX-a6LqOIR7Uk5cDPGUjUkpSCetvTor25M1JmW9eqgubS5Q/viewform?usp=sf_link"
                  className="underline"
                >
                  Build on Base
                </a>
                : Get in touch with our teams about your project.
              </p>
            </div>
          </div>
          <p className="pt-20 underline">
            <a href="https://docs.base.org/terms-of-service">Terms of Service</a>
            <br />
            <a href="https://docs.base.org/privacy-policy">Privacy Policy</a>
            <br />
            <Link href="/cookie-policy">Cookie Policy</Link>
            <br />
            <button type="button" className="appearance-none underline" onClick={handleOpenModal}>
              Cookie Manager
            </button>
          </p>
        </div>
        <div className="flex h-full flex-col gap-5 pt-24 lg:flex-row lg:gap-10 lg:pt-0">
          <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-10">
            <Link href="/about">
              <span className="font-mono text-xl text-white">About</span>
            </Link>
            <a
              href={docsUrl}
              className="font-mono text-xl text-white"
              target="_blank"
              rel="noreferrer noopener"
            >
              Docs
            </a>
            <a
              href={bridgeUrl}
              className="font-mono text-xl text-white"
              target="_blank"
              rel="noreferrer noopener"
            >
              Bridge
            </a>
            <a href="https://base.mirror.xyz" className="font-mono text-xl text-white">
              Blog
            </a>
            <Link href="/jobs">
              <span className="font-mono text-xl text-white">Jobs</span>
            </Link>
          </div>
          <div className="flex flex-row gap-4 pt-1 lg:h-full lg:gap-8">
            <a
              href="https://discord.com/invite/buildonbase"
              target="_blank"
              rel="noreferrer noopener"
              title="Join us on Discord"
              aria-label="Join us on Discord"
            >
              <Icon name="discord" width="24" height="20" />
            </a>
            <a
              href="https://twitter.com/base"
              target="_blank"
              rel="noreferrer noopener"
              title="Join us on Twitter"
              aria-label="Join us on Twitter"
            >
              <Icon name="twitter" width="24" height="20" />
            </a>
            <a
              href="https://github.com/base-org"
              target="_blank"
              rel="noreferrer noopener"
              title="Join us on Github"
              aria-label="Join us on Github"
            >
              <Icon name="github" width="24" height="24" />
            </a>
          </div>
        </div>
      </div>
      {isOpen && <CookiePreferencesModal isOpen={isOpen} onClose={handleCloseModal} />}
    </footer>
  );
}
