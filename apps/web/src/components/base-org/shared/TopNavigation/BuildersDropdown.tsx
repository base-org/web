import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import agentKit from 'apps/web/src/components/Builders/Shared/assets/Tools/agentKit.svg';
import miniKit from 'apps/web/src/components/Builders/Shared/assets/Tools/miniKit.svg';
import baseWallet from 'apps/web/src/components/Builders/Shared/assets/Tools/smartWallet.svg';
import onchainKit from 'apps/web/src/components/Builders/Shared/assets/Tools/onchainKit.svg';
import Image, { StaticImageData } from 'next/image';
import options from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/options.svg';
import bug from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/bug.svg';
import blockchain from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/blockchain.svg';
import gitHubLogo from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/gitHubLogo.svg';
import blog from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/blog.svg';
import bridging from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/bridging.svg';
import Link from 'apps/web/src/components/Link';

type BuildersDropdownProps = {
  onLinkClick: () => void;
};

type ToolMiniCardProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  href: string;
  onLinkClick: () => void;
};

type FooterCardProps = {
  label: string;
  icon: StaticImageData;
  href: string;
  onLinkClick: () => void;
};

export function BuildersDropdown({ onLinkClick }: BuildersDropdownProps) {
  return (
    <AnalyticsProvider context="developers">
      <div className="relative m-0 w-full rounded-xl bg-white/20 p-[1px]">
        <div className="flex flex-col gap-2.5 rounded-xl bg-dark-palette-backgroundAlternate p-2">
          <Link
            href="/builders"
            onClick={onLinkClick}
            className="flex items-center justify-between rounded-lg bg-dark-palette-secondary px-4 py-3 hover:bg-white/10"
          >
            <div>
              <Title level={TitleLevel.Headline} className="text-sm leading-none">
                Builders
              </Title>
              <span className="text-sm text-dark-palette-foregroundMuted ">
                Start building with Base tools
              </span>
            </div>
            <Icon name="arrowRight" height={16} width={16} />
          </Link>
          <Link
            href="https://docs.base.org"
            onClick={onLinkClick}
            className="flex items-center justify-between rounded-lg bg-dark-palette-secondary px-4 py-3 hover:bg-white/10"
          >
            <div>
              <Title level={TitleLevel.Headline} className="text-sm leading-none">
                Documentation
              </Title>
              <span className="text-sm text-dark-palette-foregroundMuted ">
                Dive into the developer docs
              </span>
            </div>
            <Icon name="arrowRight" height={16} width={16} />
          </Link>
          <div className="flex items-center justify-between rounded-lg">
            <div className="grid w-full grid-cols-2 gap-1">
              <ToolMiniCard
                title="OnchainKit"
                description="All-in-one onchain toolkit"
                icon={onchainKit as StaticImageData}
                href="https://onchainkit.xyz/"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="AgentKit"
                description="Launch your AI Agent"
                icon={agentKit as StaticImageData}
                href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="MiniKit"
                description="Build once. Deploy anywhere"
                icon={miniKit as StaticImageData}
                href="/coming-soon"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="Smart Wallet"
                description="Seamless self-custody"
                icon={baseWallet as StaticImageData}
                href="https://www.smartwallet.dev/why"
                onLinkClick={onLinkClick}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-dark-palette-secondary py-3">
            <div className="grid w-full grid-cols-2 gap-x-1 gap-y-2.5">
              <FooterCard
                label="Status"
                icon={options as StaticImageData}
                href="https://status.base.org/"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Bug Bounty"
                icon={bug as StaticImageData}
                href="https://hackerone.com/base"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Block Explorer"
                icon={blockchain as StaticImageData}
                href="https://basescan.org/"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="GitHub"
                icon={gitHubLogo as StaticImageData}
                href="https://github.com/base-org"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Blog"
                icon={blog as StaticImageData}
                href="https://blog.base.org/"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Builder Stories"
                icon={bridging as StaticImageData}
                href="/stories"
                onLinkClick={onLinkClick}
              />
            </div>
          </div>
        </div>
      </div>
    </AnalyticsProvider>
  );
}

function ToolMiniCard({ title, description, icon, href, onLinkClick }: ToolMiniCardProps) {
  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className="flex cursor-pointer flex-col gap-4 rounded-xl px-4 py-2 transition-all duration-200 hover:bg-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg">
          <Image src={icon} alt={title} width={24} height={24} className="h-8 w-8" />
        </div>
        <div className="flex flex-col gap-1">
          <Title level={TitleLevel.Headline} className="text-sm font-bold leading-none text-white">
            {title}
          </Title>
          <Title
            level={TitleLevel.Headline}
            as="p"
            className="text-sm font-normal leading-none text-dark-palette-foregroundMuted"
          >
            {description}
          </Title>
        </div>
      </div>
    </Link>
  );
}

function FooterCard({ label, icon, href, onLinkClick }: FooterCardProps) {
  return (
    <Link href={href} onClick={onLinkClick} className="flex items-center gap-2 px-4">
      <Image src={icon} alt={label} width={16} height={16} />
      <Title level={TitleLevel.Headline} className="text-sm font-normal leading-none">
        {label}
      </Title>
    </Link>
  );
}
