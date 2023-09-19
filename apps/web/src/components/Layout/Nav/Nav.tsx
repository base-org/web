import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import getConfig from 'next/config';
import Link from 'next/link';

import { Icon } from '../../Icon/Icon';
import { Logo } from '../../Logo/Logo';

const { publicRuntimeConfig } = getConfig();
const showEcosystemPage = publicRuntimeConfig.ecosystemLaunchFlag === 'true';

type NavProps = {
  color: 'white' | 'black';
};

const mobileMenuInitial = { opacity: 0 };
const mobileMenuAnimation = { opacity: 1 };

type MobileMenuProps = {
  toggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileMenu({ toggleMobileMenu }: MobileMenuProps) {
  const handleClose = useCallback(() => {
    toggleMobileMenu(false);
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('no-scroll');
  }, [toggleMobileMenu]);

  return (
    <motion.nav
      className="fixed top-0 left-0 z-30 m-0 h-screen w-screen bg-gray p-8"
      initial={mobileMenuInitial}
      animate={mobileMenuAnimation}
      exit={mobileMenuInitial}
    >
      <div className="flex justify-between">
        <Link href="/" onClick={handleClose}>
          <Logo color="white" />
        </Link>
        <button
          className="appearance-none"
          type="button"
          onClick={handleClose}
          aria-label="Close BASE mobile navigation"
        >
          <Icon color="white" name="close" />
        </button>
      </div>
      <div className="flex h-full flex-col gap-5 pt-20">
        <div className="flex h-full flex-col gap-4">
          <Link href="/about" onClick={handleClose}>
            <span className="font-mono text-3xl text-white">About</span>
          </Link>
          <a
            href={publicRuntimeConfig.docsUrl}
            onClick={handleClose}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-3xl text-white"
          >
            Docs
          </a>
          {showEcosystemPage && (
            <Link href="/ecosystem" onClick={handleClose}>
              <span className="font-mono text-3xl text-white">Ecosystem</span>
            </Link>
          )}
          <a
            href={publicRuntimeConfig.bridgeUrl}
            onClick={handleClose}
            rel="noreferrer noopener"
            className="font-mono text-3xl text-white"
          >
            Bridge
          </a>
          <a
            href="https://base.mirror.xyz"
            onClick={handleClose}
            className="font-mono text-3xl text-white"
          >
            Blog
          </a>
          <Link href="/jobs" onClick={handleClose}>
            <span className="font-mono text-3xl text-white">Jobs</span>
          </Link>
        </div>
        <div className="flex flex-row gap-4 pb-8">
          <Link href="/discord" title="Join us on Discord">
            <Icon name="discord" width="48" />
          </Link>
          <a href="https://twitter.com/buildonbase" title="Join us on Twitter">
            <Icon name="twitter" width="48" />
          </a>
          <a
            href="https://github.com/base-org"
            target="_blank"
            rel="noreferrer noopener"
            title="Join us on Github"
          >
            <Icon name="github" width="48" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

const mainnetBanner = (
  <span className="text-center font-sans text-white">
    Base mainnet is open. Come join us for{' '}
    <a
      href="https://onchainsummer.xyz"
      className="underline"
      target="_blank"
      rel="noreferrer noopener"
    >
      Onchain Summer
    </a>
    .
  </span>
);

export function Nav({ color }: NavProps) {
  const [showMobileMenu, toggleMobileMenu] = useState<boolean>(false);

  const handleMenuButtonClick = useCallback(() => {
    toggleMobileMenu(true);
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('no-scroll');
  }, []);

  return (
    <>
      <div
        className={`w-full ${
          color === 'white' ? 'bg-blue-600' : 'bg-black'
        } flex h-16 items-center justify-center px-4`}
      >
        {mainnetBanner}
      </div>
      <nav className="bg-transparent z-10 flex h-24 w-full max-w-[1440px] flex-row justify-between self-center p-8">
        <Link href="/">
          <Logo color={color} />
        </Link>
        {/* Desktop */}
        <div className="hidden h-full flex-row items-center space-x-16 lg:flex">
          <div className="h-full flex-row items-center space-x-16">
            <Link href="/about">
              <span
                className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
              >
                About
              </span>
            </Link>
            <a
              href={publicRuntimeConfig.docsUrl}
              className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Docs
            </a>
            {showEcosystemPage && (
              <Link href="/ecosystem">
                <span
                  className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
                >
                  Ecosystem
                </span>
              </Link>
            )}
            <a
              href={publicRuntimeConfig.bridgeUrl}
              className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
              rel="noreferrer noopener"
            >
              Bridge
            </a>
            <a
              href="https://base.mirror.xyz"
              className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
            >
              Blog
            </a>
            <Link href="/jobs">
              <span
                className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
              >
                Jobs
              </span>
            </Link>
          </div>
          <div className="flex h-full flex-row items-center space-x-8">
            <Link href="/discord" title="Join us on Discord">
              <Icon name="discord" width="24" height="20" color={color} />
            </Link>
            <a href="https://twitter.com/buildonbase" title="Join us on Twitter">
              <Icon name="twitter" width="24" height="20" color={color} />
            </a>
            <a href="https://github.com/base-org" title="Join us on Github">
              <Icon name="github" width="24" height="24" color={color} />
            </a>
          </div>
        </div>
        {/* Mobile */}
        <div className="flex lg:hidden">
          <button
            className="appearance-none"
            type="button"
            onClick={handleMenuButtonClick}
            aria-label="BASE mobile navigation"
          >
            <Icon name="more-menu" color={color} />
          </button>
        </div>
        <AnimatePresence>
          {showMobileMenu ? <MobileMenu toggleMobileMenu={toggleMobileMenu} /> : null}
        </AnimatePresence>
      </nav>
    </>
  );
}
