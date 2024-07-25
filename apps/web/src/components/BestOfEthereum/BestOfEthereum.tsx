export function BestOfEthereum() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col flex-wrap items-start justify-between bg-black px-8 py-12 lg:flex-row">
      <div className="flex flex-col gap-6  pb-16 md:pr-20 lg:basis-1/2">
        <div className="font-display text-3xl  text-white md:text-5xl lg:text-6xl">
          <h2>
            The best of
            <br />
            Ethereum but
            <br />
            10x cheaper
          </h2>
        </div>
        <p className="font-display text-sm text-white lg:text-lg">
          No code changes needed. Base is EVM equivalent, so all of your code, tools, and
          infrastructure work out of the box. Base’s rollup architecture reduces costs by 10x for
          users.
        </p>
      </div>
      <div className="flex w-full max-w-[534px] flex-col space-y-2 lg:basis-1/2">
        <div className="flex h-[460px] w-full max-w-[534px] flex-col justify-between bg-gray-90 p-8">
          <h3 className="font-display text-8xl text-white lg:text-9xl">10x</h3>
          <div className="flex flex-col font-sans text-4xl uppercase text-white lg:text-5xl">
            <h3>
              Cheaper
              <br />
              Than
              <br />
              Ethereum
            </h3>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="h-[23px] w-full bg-gradient-to-r from-blue-600 to-white" />
            <div className="flex h-[23px] w-full flex-row">
              <div className="h-full w-[52px] bg-blue-400" />
              <div className="h-full w-full bg-black" />
            </div>
          </div>
        </div>
        <span className="pt-5 font-sans text-xs text-white">Based on 90-day average</span>
      </div>
    </div>
  );
}
