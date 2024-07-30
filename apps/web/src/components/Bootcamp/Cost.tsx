export async function Cost() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-20 bg-black px-8 pt-12">
      <div className="grid grid-cols-2">
        <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl">
          <p>Cost</p>
        </div>

        <div className="text-md font-sans text-white">
          <p>
            Base Bootcamp is <span className="font-bold">free</span>. However, we require you to{' '}
            <span className="font-bold">deposit 1 ETH</span>, which we will return to you upon your
            successful, on-time graduation. We’re doing this so that you have skin in the game. The
            program is going to be difficult and we need you to have as many reasons as necessary to
            push through.
          </p>
        </div>
      </div>
    </div>
  );
}
