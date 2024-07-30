import React from 'react';

import styles from './hero.module.css';

export default function Hero() {
  const headerReasons = [
    'An Active Ecosystem of Builders',
    'Cheaper and Faster Transactions',
    'Coinbase Developer Platform is Based',
    'Resources to Help You Build',
    'Resources to Help You Grow',
  ];

  return (
    <div className="mt-[-96px] h-[600px] bg-blue-60">
      <div className="mx-16 mt-[96px] flex h-[504px] max-w-[1440px] flex-col justify-start">
        <div className="my-20 flex flex-row justify-start gap-24">
          <div className="max-w-[500px]">
            <h1 className="font-display text-6xl leading-none mb-10">Build Better with Base</h1>
            <span className="text-2xl">Five ways Base will supercharge your next project</span>
          </div>
          <div>
            <ol className="p-o list-none space-y-4">
              {headerReasons.map((item, index) => (
                <li key={item} className="flex items-center">
                  <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-20 font-bold">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
