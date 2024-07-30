import React from 'react';

export default async function Hero() {
  const headerReasons = [
    'Community of Builders',
    'Performance & cost efficiency',
    'EVM compatibility',
    'World class tools',
    'Empowered by Coinbase',
  ];

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
        <div>
          <ol className="list-none space-y-4 p-0">
            {headerReasons.map((item, index) => (
              <div key={item} className="flex flex-col justify-end gap-2">
                <li className="flex items-center text-2xl">
                  <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-black">
                    {index + 1}
                  </span>
                  {item}
                </li>
                {index < headerReasons.length - 1 && <hr className="max-w-[450px]" />}
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
