import React from 'react';
import Link from 'apps/web/node_modules/next/link';

const headerReasons: Section[] = [
  {
    title: 'Community of Builders',
    id: 'communityOfBuilders'
  },
  {
    title: 'Performance & cost efficiency',
    id: 'performanceAndCost'
  },
  {
    title: 'EVM compatibility',
    id: 'evmCompatibility'
  },
  {
    title: 'World class tools',
    id: 'worldClassTools'
  },
  {
    title: 'Empowered by Coinbase',
    id: 'empoweredByCoinbase'
  },
];

export default async function Hero() {
  return (
    <div className="mx-16 mt-[96px] flex h-[504px] max-w-[1440px] flex-col justify-start">
      <div className="my-20 grid grid-cols-[1fr_1fr]">
        <div className="max-w-[500px]">
          <h1 className="mb-10 font-display text-6xl leading-none">5 reasons to choose Base</h1>
          <span className="text-2xl">
            Five reasons why choosing Base will help you unleash onchain innovation and supercharge
            your project
          </span>
        </div>
        <TableOfContents sections={headerReasons} />
      </div>
    </div>
  );
}


async function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <div className='flex flex-col justify-center gap-2'>
          <ol className="list-none p-0">
            {sections.map((section, index) => (
              <div key={section.id} className="flex flex-col justify-end">
                <li className="flex items-center text-2xl">
                  <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                    {index + 1}
                  </span>
                  <Link href={`#${section.id}`}>
                    {section.title}
                  </Link>
                </li>
                {index < sections.length - 1 && <hr className="max-w-[450px] my-4" />}
              </div>
            ))}
          </ol>
        </div>
  )
}


type TableOfContentsProps = {
  sections: Section[]
}

type Section = {
  title: string;
  id: string;
}
