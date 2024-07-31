import Link from 'apps/web/node_modules/next/link';

const headerReasons: Section[] = [
  {
    title: 'Community of Builders',
    id: 'communityOfBuilders',
  },
  {
    title: 'Performance & cost efficiency',
    id: 'performanceAndCost',
  },
  {
    title: 'EVM compatibility',
    id: 'evmCompatibility',
  },
  {
    title: 'World class tools',
    id: 'worldClassTools',
  },
  {
    title: 'Empowered by Coinbase',
    id: 'empoweredByCoinbase',
  },
];

export default async function Hero() {
  return (
    <div className="mx-4 sm:mx-8 lg:mx-16 mt-12 sm:mt-16 lg:mt-[96px] flex flex-col justify-start min-h-[504px]">
      <div className="my-8 sm:my-12 lg:my-20 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-0">
        <div className="max-w-full lg:max-w-[500px]">
          <h1 className="mb-6 lg:mb-10 font-display text-4xl sm:text-5xl lg:text-6xl leading-tight lg:leading-none">5 reasons to choose Base</h1>
          <span className="text-lg sm:text-xl lg:text-2xl">
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
    <div className="flex flex-col justify-center gap-2">
      <ol className="list-none p-0">
        {sections.map((section, index) => (
          <div key={section.id} className="flex flex-col justify-end">
            <li className="flex items-center text-lg sm:text-xl lg:text-2xl">
              <span className="mr-3 lg:mr-4 flex h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                {index + 1}
              </span>
              <Link href={`#${section.id}`}>{section.title}</Link>
            </li>
            {index < sections.length - 1 && <hr className="my-3 lg:my-4 max-w-full lg:max-w-[450px]" />}
          </div>
        ))}
      </ol>
    </div>
  );
}

type TableOfContentsProps = {
  sections: Section[];
};

type Section = {
  title: string;
  id: string;
};
