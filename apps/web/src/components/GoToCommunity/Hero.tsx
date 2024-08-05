// import TableOfContents, { Section } from 'apps/web/src/components/TableOfContents/TableOfContents';

// const headerReasons: Section[] = [
//   {
//     title: 'Community of Builders',
//     id: 'communityOfBuilders',
//   },
//   {
//     title: 'Performance & cost efficiency',
//     id: 'performanceAndCost',
//   },
//   {
//     title: 'EVM compatibility',
//     id: 'evmCompatibility',
//   },
//   {
//     title: 'World class tools',
//     id: 'worldClassTools',
//   },
//   {
//     title: 'Empowered by Coinbase',
//     id: 'empoweredByCoinbase',
//   },
// ];

export default async function Hero() {
  return (
    <div className="mx-12 mb-8 mt-12 flex flex-col justify-start sm:mx-16 sm:mb-12 sm:mt-16 lg:mx-24 lg:mt-[96px]">
      <div className="my-8 grid grid-cols-1 gap-8 sm:my-12 lg:my-20 lg:grid-cols-[1fr_1fr] lg:gap-0">
        <div className="max-w-full lg:max-w-[500px]">
          <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl lg:mb-10 lg:text-6xl lg:leading-none">
            Go-to-Community Kit for Base Builders
          </h1>
          <span className="text-lg sm:text-xl lg:text-2xl">
            Resources to help you build & grow your project on Base
          </span>
        </div>
        {/* <TableOfContents sections={headerReasons} /> */}
      </div>
    </div>
  );
}
