import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';

import useClickAway from '../../../utils/hooks/useClickAway';

import { Icon } from '../../Icon/Icon';
import { bridgeUrl, docsUrl } from 'apps/web/src/constants';

// Dropdown Link
type DropdownLinkProps = {
  href: string;
  label: string;
  color: 'white' | 'black';
  externalLink?: boolean;
};

function DropdownLink({ href, label, color, externalLink }: DropdownLinkProps) {
  return externalLink ? (
    <a
      href={href}
      className={`flex items-center whitespace-nowrap px-10 py-[1.25rem] font-mono text-xl hover:underline ${
        color === 'black' ? 'text-white' : 'text-black'
      }`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {label}
    </a>
  ) : (
    <Link
      href={href}
      className={`whitespace-nowrap px-10 py-[1.25rem] font-mono text-xl hover:underline ${
        color === 'black' ? 'text-white' : 'text-black'
      }`}
    >
      {label}
    </Link>
  );
}

// Dropdown
type DropdownProps = {
  label: string;
  color: 'white' | 'black';
  children: React.ReactElement[];
};

const dropdownInitial = { opacity: 0, y: 10 };
const dropdownAnimation = { opacity: 1, y: 20 };
const dropdownTransition = { ease: cubicBezier(0.6, 0.0, 1.0, 1.0), duration: 0.2 };

function Dropdown({ label, color, children }: DropdownProps) {
  const [showDropdown, toggleDropdown] = useState<boolean>(false);
  const handleHideDropdown = useCallback(() => toggleDropdown(false), []);
  const ref = useClickAway<HTMLDivElement>(handleHideDropdown);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        onClick={useCallback(() => toggleDropdown(!showDropdown), [showDropdown])}
        className={`flex appearance-none items-center font-mono text-xl ${
          showDropdown ? 'underline' : ''
        } ${color === 'black' ? 'text-black' : 'text-white'}`}
      >
        <span className="mr-2">{label}</span>
        <span className={`transition duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
          <Icon name="caret" width="16" height="16" color={color === 'black' ? 'black' : 'white'} />
        </span>
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className={`absolute left-0 top-5 flex flex-col bg-black py-[1.25rem] font-mono text-xl ${
              color === 'black' ? 'bg-[#141519]' : 'bg-white'
            }`}
            initial={dropdownInitial}
            animate={dropdownAnimation}
            exit={dropdownInitial}
            transition={dropdownTransition}
            onClick={handleHideDropdown}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Desktop Nav
type DesktopNavProps = {
  color: 'white' | 'black';
};

function DesktopNav({ color }: DesktopNavProps) {
  return (
    <div className="hidden h-full flex-row items-center space-x-16 lg:flex">
      <div className="h-full flex-row items-center space-x-16">
        <Dropdown label="Ecosystem" color={color}>
          <DropdownLink href="/ecosystem" label="Apps" color={color} />
          <DropdownLink
            href="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
            label="Grants"
            color={color}
            externalLink
          />
        </Dropdown>
        <a
          href={bridgeUrl}
          className={`inline-flex items-center font-mono text-xl ${
            color === 'black' ? 'text-black' : 'text-white'
          }`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Bridge
        </a>
        <Dropdown label="Developers" color={color}>
          <DropdownLink href={docsUrl} label="Docs" color={color} externalLink />
          <DropdownLink
            href="https://base.blockscout.com/"
            label="Block Explorer"
            color={color}
            externalLink
          />
          <DropdownLink href="https://status.base.org" label="Status" color={color} externalLink />
          <DropdownLink
            href="https://hackerone.com/coinbase"
            label="Bug Bounty"
            color={color}
            externalLink
          />
          <DropdownLink
            href="https://github.com/base-org"
            label="GitHub"
            color={color}
            externalLink
          />
        </Dropdown>
        <Dropdown label="About" color={color}>
          <DropdownLink href="/about" label="Mission" color={color} />
          <DropdownLink href="https://base.mirror.xyz" label="Blog" color={color} externalLink />
          <DropdownLink href="/jobs" label="Jobs" color={color} />
        </Dropdown>
      </div>
      <div className="flex h-full flex-row items-center space-x-8">
        <a href="https://discord.com/invite/buildonbase" title="Join us on Discord">
          <Icon name="discord" width="24" height="20" color={color} />
        </a>
        <a href="https://twitter.com/base" title="Join us on Twitter">
          <Icon name="twitter" width="24" height="20" color={color} />
        </a>
        <a href="https://github.com/base-org" title="Join us on Github">
          <Icon name="github" width="24" height="24" color={color} />
        </a>
      </div>
    </div>
  );
}

export default DesktopNav;
