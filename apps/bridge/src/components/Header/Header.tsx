/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popover } from '@headlessui/react';
import { RainbowConnectButton } from 'apps/bridge/src/components/RainbowConnectButton/RainbowConnectButton';
import { sidebarLinks } from 'apps/bridge/src/components/Sidebar/Sidebar';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function Header() {
  const { pathname } = useRouter();

  return (
    <Popover className="relative">
      <header className="py-5 px-8">
        <nav className="flex flex-row items-center sm:justify-between">
          <Popover.Button className="block sm:hidden">
            <Image src="/icons/hamburger.svg" width="24" height="24" alt="Menu" />
          </Popover.Button>
          <h2 className="grow	text-center font-mono text-2xl uppercase text-white sm:grow-0">
            {pathname === '/transactions' ? 'Transactions' : 'Bridge'}
          </h2>
          <div className="hidden sm:block">
            <RainbowConnectButton />
          </div>
        </nav>
      </header>
      <Popover.Panel
        focus
        className="fixed left-0 top-0 right-0 bottom-0 z-50 flex min-h-screen transform flex-col justify-between overscroll-auto bg-[#0A0B0D] transition md:hidden	"
      >
        <div>
          <header className="py-5 px-8">
            <nav className="flex flex-row items-center justify-between">
              <Popover.Button>
                <Image
                  src="/icons/hamburger.svg"
                  width="24"
                  height="24"
                  alt="Menu"
                  className="block h-8 text-white sm:hidden"
                />
              </Popover.Button>
              <Popover.Button>
                <Image src="/icons/close.svg" width="16" height="16" alt="Close" />
              </Popover.Button>
            </nav>
          </header>
          <div className="p-8">
            <div className="font-lg flex flex-col font-mono">
              {sidebarLinks.map(({ text, links }) => (
                <a
                  href={links[0]}
                  key={`sidebar-link-${text}`}
                  className={`text-lg text-${
                    links.some((link) => link === pathname) ? 'cds-primary' : 'white'
                  } pb-8`}
                >
                  {text}
                </a>
              ))}
            </div>
            <div className="flex-grow border-t border-[#8A919EA8]" />
          </div>
          <div className="pl-8">
            <RainbowConnectButton />
          </div>
          <div className="p-8">
            <div className="flex-grow border-t border-[#8A919EA8]" />
          </div>
        </div>
        <div className="flex flex-row p-8 pt-0">
          <a href="#" title="discord" className="mr-5">
            <Image src="/icons/discord.svg" alt="Discord" width={24} height={24} />
          </a>
          <a href="#" title="twitter" className="mr-5">
            <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={19} />
          </a>
          <a href="#" title="github">
            <Image src="/icons/github.svg" alt="Github" width={24} height={19} />
          </a>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
