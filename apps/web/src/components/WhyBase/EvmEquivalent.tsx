import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function EvmEquivalent() {
  return (
    <div
      id="evmCompatibility"
      className="flex flex-col sm:flex-row gap-8 sm:gap-16 xl:gap-32 bg-black px-12 sm:px-16 lg:px-24 pb-6 sm:pb-8 lg:pb-10 pt-6 sm:pt-8 lg:pt-10"
    >
      <div className="w-full sm:w-1/3 lg:w-1/2 xl:w-[550px] aspect-[550/520] sm:aspect-auto h-[260px] sm:h-[200px] md:h-[260px] lg:h-[520px]">
        <div className="w-full h-full bg-[url('../public/images/EVM-compatibility-chains.png')] bg-contain bg-no-repeat bg-center" />
      </div>
      {/* <div className="aspect-[550/520] h-full w-full bg-[url('../public/images/EVM-compatibility-chains.png')] bg-contain bg-no-repeat" /> */}
      <div className="flex w-full flex-col justify-center gap-8 lg:w-1/2 lg:gap-16 xl:max-w-[550px]">
        <h2 className="flex flex-col font-display text-3xl sm:flex-row sm:text-4xl lg:text-5xl">
          <span>3.</span>
          <span className="mt-2 sm:ml-4 sm:mt-0">EVM Compatible for effortless migration</span>
        </h2>
        <div>
          <span className="text-base sm:text-lg">
            Move your project to Base in minutes from any other EVM-compatible chain and unlock the
            full potential of the Superchain and OP stack
          </span>
          <div>
            <ButtonWithLinkAndEventLogging
              href="https://docs.base.org/docs"
              eventName="evm_compatible_start_migrating"
              eventContext="why_base"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames="mt-4 uppercase w-full sm:w-auto"
            >
              Start Migrating
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
    </div>
  );
}
