'use client';
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import { ActionType, ComponentType } from 'libs/base-ui/utils/logEvent';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import useClickAway from '../../../hooks/useClickAway';

import { Icon } from '../../Icon/Icon';
import { bridgeUrl, docsUrl } from 'apps/web/src/constants';
import { ConnectWalletButton } from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import { REVERSE_COLOR, reverseTextColor } from 'apps/web/src/utils/colors';

// Dropdown Link
type DropdownLinkProps = {
  href: string;
  label: string;
  color: 'white' | 'black';
  externalLink?: boolean;
  eventName: string;
};

function DropdownLink({ href, label, color, externalLink, eventName }: DropdownLinkProps) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext(eventName, ActionType.click, {
      componentType: ComponentType.link,
    });
  }, [logEventWithContext, eventName]);

  return externalLink ? (
    <a
      href={href}
      className={`flex items-center whitespace-nowrap px-10 py-[1.25rem] font-mono text-xl hover:underline ${reverseTextColor(
        color,
      )}`}
      target="_blank"
      rel="noreferrer noopener"
      onClick={handleClick}
    >
      {label}
    </a>
  ) : (
    <Link
      href={href}
      className={`whitespace-nowrap px-10 py-[1.25rem] font-mono text-xl hover:underline ${reverseTextColor(
        color,
      )}`}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
}

// Dropdown
type DropdownProps = {
  label: JSX.Element | string;
  color: 'white' | 'black';
  children: React.ReactElement[];
  className?: string;
};

const dropdownInitial = { opacity: 0, y: 10 };
const dropdownAnimation = { opacity: 1, y: 20 };
const dropdownTransition = { ease: cubicBezier(0.6, 0.0, 1.0, 1.0), duration: 0.2 };

function Dropdown({ label, color, children, className }: DropdownProps) {
  const [showDropdown, toggleDropdown] = useState<boolean>(false);
  const handleHideDropdown = useCallback(() => toggleDropdown(false), []);
  const ref = useClickAway<HTMLDivElement>(handleHideDropdown);

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ''}`}>
      <button
        type="button"
        aria-label={typeof label === 'string' ? label : undefined}
        onClick={useCallback(() => toggleDropdown(!showDropdown), [showDropdown])}
        className={`flex appearance-none items-center font-mono text-xl ${
          showDropdown ? 'underline' : ''
        } ${color === 'black' ? 'text-black' : 'text-white'}`}
      >
        <span className="mr-2">{label}</span>
        <span className={`transition duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
          <Icon name="caret" width="16" height="16" color={color} />
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

function IconLink({
  href,
  icon,
  label,
  color,
  title,
  eventName,
}: {
  href: string;
  icon: string;
  label: string;
  color: 'white' | 'black';
  title: string;
  eventName: string;
}) {
  const { logEventWithContext } = useAnalytics();
  const handleClick = useCallback(() => {
    logEventWithContext(eventName, ActionType.click, { componentType: ComponentType.link });
  }, [logEventWithContext, eventName]);

  return (
    <a href={href} title={title} className="p-4" onClick={handleClick}>
      <div className="flex flex-row items-center gap-4">
        <Icon name={icon} width="24" height="24" color={REVERSE_COLOR[color]} />
        <span className={`${reverseTextColor(color)}`}>{label}</span>
      </div>
    </a>
  );
}

function DesktopNav({ color }: DesktopNavProps) {
  const { logEventWithContext } = useAnalytics();
  const handleBridgeClick = useCallback(() => {
    logEventWithContext('bridge', ActionType.click, { componentType: ComponentType.link });
  }, [logEventWithContext]);

  return (
    <div className="hidden h-full w-fit flex-grow flex-row items-center justify-between lg:flex">
      <Dropdown label="Ecosystem" color={color}>
        <DropdownLink href="/ecosystem" label="Apps" color={color} eventName="ecosystem" />
        <DropdownLink href="/names" label="Names" color={color} eventName="names" />
        <DropdownLink
          href="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
          label="Grants"
          color={color}
          externalLink
          eventName="grants"
        />
      </Dropdown>
      <a
        href={bridgeUrl}
        className={`inline-flex items-center font-mono text-xl ${
          color === 'black' ? 'text-black' : 'text-white'
        }`}
        onClick={handleBridgeClick}
      >
        Bridge
      </a>
      <Dropdown label="Developers" color={color}>
        <DropdownLink
          href="/getstarted/?utm_source=dotorg&utm_medium=nav"
          label="Get Started"
          color={color}
          eventName="getstarted"
        />
        <DropdownLink href={docsUrl} label="Docs" color={color} externalLink eventName="docs" />
        <DropdownLink
          href="https://base.org/learn"
          label="Learn"
          color={color}
          externalLink
          eventName="learn"
        />
        <DropdownLink
          href="https://base.blockscout.com/"
          label="Block Explorer"
          color={color}
          externalLink
          eventName="block_explorer"
        />
        <DropdownLink
          href="https://status.base.org"
          label="Status"
          color={color}
          externalLink
          eventName="status"
        />
        <DropdownLink
          href="https://hackerone.com/coinbase"
          label="Bug Bounty"
          color={color}
          externalLink
          eventName="bug_bounty"
        />
        <DropdownLink
          href="https://github.com/base-org"
          label="GitHub"
          color={color}
          externalLink
          eventName="github"
        />
      </Dropdown>
      <Dropdown label="About" color={color}>
        <DropdownLink href="/about" label="Mission" color={color} eventName="mission" />
        <DropdownLink
          href="https://base.mirror.xyz"
          label="Blog"
          color={color}
          externalLink
          eventName="blog"
        />
        <DropdownLink href="/jobs" label="Jobs" color={color} eventName="jobs" />
      </Dropdown>
      <Dropdown label="Socials" className="align-text-bottom" color={color}>
        <IconLink
          href="https://warpcast.com/~/channel/base"
          icon="farcaster"
          label="Farcaster"
          color={color}
          title="Join us on Warpcast"
          eventName="farcaster"
        />
        <IconLink
          href="https://discord.com/invite/buildonbase"
          icon="discord"
          label="Discord"
          color={color}
          title="Join us on Discord"
          eventName="discord"
        />
        <IconLink
          href="https://twitter.com/base"
          icon="twitter"
          label="Twitter"
          color={color}
          title="Join us on Twitter"
          eventName="twitter"
        />
        <IconLink
          href="https://github.com/base-org"
          icon="github"
          label="Github"
          color={color}
          title="Join us on Github"
          eventName="github"
        />
      </Dropdown>
      <ConnectWalletButton color={color} className="relative inline-block" />
    </div>
  );
}

export default DesktopNav;
