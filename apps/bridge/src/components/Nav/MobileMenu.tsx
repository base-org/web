import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';

import { Icon } from 'base-ui';
import { Logo } from '../Logo/Logo';
import { usePathname } from 'next/navigation';

// Dropdown Link
type DropdownLinkProps = {
  href: string;
  label: string;
  externalLink?: boolean;
};

function DropdownLink({ href, label, externalLink }: DropdownLinkProps) {
  return externalLink ? (
    <a
      href={href}
      className="flex w-full items-center whitespace-pre-line pt-4 font-mono text-3xl text-white hover:underline"
      target="_blank"
      rel="noreferrer noopener"
    >
      {label}
    </a>
  ) : (
    <Link href={href} className="w-full pt-4 font-mono text-3xl text-white hover:underline">
      {label}
    </Link>
  );
}

// Dropdown
type DropdownProps = {
  dropdownKey: string;
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
  toggleMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  children: React.ReactElement[];
};

const dropdownInitial = { opacity: 0, height: 0 };
const dropdownAnimation = { opacity: 1, height: 'auto' };
const dropdownTransition = { ease: cubicBezier(0.6, 0.0, 1.0, 1.0), duration: 0.2 };

function Dropdown({
  dropdownKey,
  activeKey,
  setActiveKey,
  toggleMobileMenu,
  label,
  children,
}: DropdownProps) {
  const handleDropdownToggle = useCallback(() => {
    if (dropdownKey === activeKey) {
      setActiveKey(null);
    } else {
      setActiveKey(dropdownKey);
    }
  }, [dropdownKey, activeKey, setActiveKey]);

  const handleDropdownClose = useCallback(() => {
    setActiveKey(null);
    toggleMobileMenu(false);
  }, [setActiveKey, toggleMobileMenu]);

  return (
    <div>
      <button
        type="button"
        className="flex w-full appearance-none items-center"
        onClick={handleDropdownToggle}
      >
        <span className="mr-2 font-mono text-3xl text-white">{label}</span>
        <span
          className={`transition duration-200 ${dropdownKey === activeKey ? 'rotate-180' : ''}`}
        >
          <Icon name="caret" width="24" height="24" />
        </span>
      </button>
      <AnimatePresence>
        {dropdownKey === activeKey && (
          <motion.div
            className="flex w-full flex-col px-6"
            initial={dropdownInitial}
            animate={dropdownAnimation}
            exit={dropdownInitial}
            transition={dropdownTransition}
            onClick={handleDropdownClose}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile Menu
type MobileMenuProps = {
  color: 'white' | 'black';
};

const mobileMenuInitial = { opacity: 0 };
const mobileMenuAnimation = { opacity: 1 };

function MobileMenu({ color }: MobileMenuProps) {
  const [showMobileMenu, toggleMobileMenu] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const pathname = usePathname();

  const handleMenuOpen = useCallback(() => {
    toggleMobileMenu(true);
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('no-scroll');
  }, []);

  const handleMenuClose = useCallback(() => {
    toggleMobileMenu(false);
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('no-scroll');
  }, []);

  // make sure no-scroll gets removed when someone navigates away from the page
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('no-scroll');
  }, [pathname]);

  return (
    <>
      {/* Menu Button */}
      <div className="flex lg:hidden">
        <button
          className="appearance-none"
          type="button"
          onClick={handleMenuOpen}
          aria-label="BASE mobile navigation"
        >
          <Icon name="more-menu" color={color} />
        </button>
      </div>
      {/* Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.nav
            className="fixed left-0 top-0 z-30 m-0 h-screen w-screen bg-gray p-8"
            initial={mobileMenuInitial}
            animate={mobileMenuAnimation}
            exit={mobileMenuInitial}
          >
            <div className="flex justify-between">
              <Link href="/" onClick={handleMenuClose}>
                <Logo color="white" width="106px" />
              </Link>
              <button
                className="appearance-none"
                type="button"
                onClick={handleMenuClose}
                aria-label="Close BASE mobile navigation"
              >
                <Icon color="white" name="close" />
              </button>
            </div>
            <div className="flex h-full flex-col justify-between pt-20">
              <div className="flex h-full flex-col gap-4">
                <Dropdown
                  dropdownKey="ecosystem"
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                  toggleMobileMenu={toggleMobileMenu}
                  label="Ecosystem"
                >
                  <DropdownLink href="https://base.org/ecosystem" label="Apps" />
                  <DropdownLink
                    href="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
                    label="Grants"
                    externalLink
                  />
                </Dropdown>
                <Dropdown
                  dropdownKey="developers"
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                  toggleMobileMenu={toggleMobileMenu}
                  label="Developers"
                >
                  <DropdownLink href="https://docs.base.org" label="Docs" externalLink />
                  <DropdownLink
                    href="https://base.blockscout.com/"
                    label={`Block\nExplorer`}
                    externalLink
                  />
                  <DropdownLink href="https://status.base.org" label="Status" externalLink />
                  <DropdownLink
                    href="https://hackerone.com/coinbase"
                    label="Bug Bounty"
                    externalLink
                  />
                  <DropdownLink href="https://github.com/base-org" label="GitHub" externalLink />
                </Dropdown>
                <Dropdown
                  dropdownKey="about"
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                  toggleMobileMenu={toggleMobileMenu}
                  label="About"
                >
                  <DropdownLink href="https://base.org/about" label="Mission" />
                  <DropdownLink href="https://base.mirror.xyz" label="Blog" externalLink />
                  <DropdownLink href="https://base.org/jobs" label="Jobs" />
                </Dropdown>
              </div>

              <div className="flex flex-row justify-between gap-4 justify-self-end pb-8">
                <a
                  href="https://warpcast.com/base"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Join us on Farcaster"
                  aria-label="Join us on Farcaster"
                >
                  <Icon name="farcaster" />
                </a>
                <a
                  href="https://discord.com/invite/buildonbase"
                  title="Join us on Discord"
                  aria-label="Join us on Discord"
                >
                  <Icon name="discord" />
                </a>
                <a
                  href="https://twitter.com/base"
                  title="Join us on Twitter"
                  aria-label="Join us on Twitter"
                >
                  <Icon name="twitter" />
                </a>
                <a
                  href="https://github.com/base-org"
                  target="_blank"
                  rel="noreferrer noopener"
                  title="Join us on Github"
                  aria-label="Join us on Github"
                >
                  <Icon name="github" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileMenu;
