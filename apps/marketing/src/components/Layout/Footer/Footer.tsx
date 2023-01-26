import Link from 'next/link';
import Image from 'next/image';
import { BaseWordmark } from '../../BaseWordmark/BaseWordmark';
import { Icon } from '../../Icon/Icon';

export function Footer() {
  return (
    <div className="w-full flex flex-row justify-between bg-gray p-8 pb-64 z-10">
      <BaseWordmark color="white" />
      <div className="flex flex-row space-x-16 h-full items-center">
        <div className="flex flex-row h-full items-center space-x-16">
          <Link href="/about">
            <span className="font-mono text-xl text-white">About</span>
          </Link>
          <a href="https://docs.base.org" className="font-mono text-xl text-white">
            Docs
          </a>
          <a href="https://bridge.base.org" className="font-mono text-xl text-white">
            Bridge
          </a>
          <a href="https://coinbase.com/blog" className="font-mono text-xl text-white">
            Blog
          </a>
        </div>
        <div className="flex flex-row h-full items-center space-x-8">
          <a href="https://discord.com">
            <Icon name="github" width="24" height="20" />
          </a>
          <a href="https://twitter.com/coinbase">
            <Icon name="twitter" width="24" height="20" />
          </a>
          <a href="https://github.com/base-org">
            <Icon name="github" width="24" height="24" />
          </a>
        </div>
      </div>
    </div>
  );
}
