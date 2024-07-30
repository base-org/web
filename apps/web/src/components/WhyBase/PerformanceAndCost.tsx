import React from 'react';

export default function PerformanceAndCost() {
  return (
    <div className="flex flex-col bg-black px-20 pb-10 pt-20">
      <div className="flex flex-row">
        <h2 className="font-display text-5xl">
          <ol start={2}>
            <li className="list-decimal">Best-in-class performance & cost efficiency</li>
          </ol>
        </h2>
        <div>
          <span>
            Base leads the way with the lowest transaction costs, highest throughput, and top TPS
            among Layer 2 solutions.
          </span>
          <button type="button">See Stats</button>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-16">
        <div className="h-[200px] w-[300px] bg-ocsyellow">Placeholder</div>
        <div className="h-[200px] w-[300px] bg-ocsyellow">Placeholder</div>
        <div className="h-[200px] w-[300px] bg-ocsyellow">Placeholder</div>
      </div>
    </div>
  );
}
