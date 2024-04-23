import { Logo } from 'apps/bridge/src/components/Logo/Logo';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();

type SidebarProps = {
  children?: React.ReactElement;
};
export const sidebarLinks = [
  {
    text: 'Bridge',
    links: ['/deposit', '/withdraw'],
  },
  {
    text: 'Transactions',
    links: ['/transactions'],
  },
  {
    text: 'Docs',
    links: ['https://docs.base.org'],
  },
];
export function Sidebar({ children }: SidebarProps) {
  const { pathname } = useRouter();
  return (
    <div className="flex w-[100vw] flex-row">
      <div className="flex h-screen w-60 flex-col border-r border-sidebar-border pl-6 pt-6 max-[700px]:hidden">
        <div className="grow">
          <div className="flex pb-14">
            <Link href="/" aria-label="Base Bridge">
              <Logo color="white" />
            </Link>
          </div>
          <div className="font-sm flex flex-col font-mono">
            {sidebarLinks.map(({ text, links }) => (
              <a
                href={links[0]}
                key={`sidebar-link-${text}`}
                className={`${
                  links.some((link) => link === pathname) ? 'text-cds-primary' : 'text-white'
                } pb-8`}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-row pb-6">
          <a href={`${publicRuntimeConfig.marketingURL}/discord`} title="discord" className="mr-3">
            <Image src="/icons/discord.svg" alt="Discord" width={24} height={24} />
          </a>
          <a href={`${publicRuntimeConfig.twitterURL}`} title="twitter" className="mr-3">
            <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={19} />
          </a>
          <a href={`${publicRuntimeConfig.githubURL}`} title="github">
            <Image src="/icons/github.svg" alt="Github" width={24} height={19} />
          </a>
        </div>
      </div>
      <div className="h-screen max-w-[100vw] grow">{children}</div>
    </div>
  );
}
