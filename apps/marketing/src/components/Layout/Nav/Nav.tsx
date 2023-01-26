import Link from 'next/link';
import { BaseWordmark } from '../../BaseWordmark/BaseWordmark';
import { Icon } from '../../Icon/Icon';

type NavProps = {
  color: 'white' | 'black';
};

export function Nav({ color }: NavProps) {
  return (
    <div className="w-full h-24 bg-transparent p-8 flex flex-row justify-between z-10 absolute">
      <BaseWordmark color={color} />
      <div className="flex flex-row space-x-16 h-full items-center">
        <div className="flex flex-row h-full items-center space-x-16">
          <Link href="/about">
            <span
              className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
            >
              About
            </span>
          </Link>
          <a
            href="https://docs.base.org"
            className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
          >
            Docs
          </a>
          <a
            href="https://bridge.base.org"
            className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
          >
            Bridge
          </a>
          <a
            href="https://coinbase.com/blog"
            className={`font-mono text-xl ${color === 'black' ? 'text-black' : 'text-white'}`}
          >
            Blog
          </a>
        </div>
        <div className="flex flex-row h-full items-center space-x-8">
          <a href="https://discord.com">
            <Icon name="discord" width="24" height="20" color={color} />
          </a>
          <a href="https://twitter.com/coinbase">
            <Icon name="twitter" width="24" height="20" color={color} />
          </a>
          <a href="https://github.com/base-org">
            <Icon name="github" width="24" height="24" color={color} />
          </a>
        </div>
      </div>
    </div>
  );
}
