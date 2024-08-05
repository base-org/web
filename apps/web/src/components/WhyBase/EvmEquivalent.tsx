import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

import evmCompatibleChains from './EVM-compatibility-chains.png';

const imageBackgroundStyles = {
  backgroundImage: `url('${evmCompatibleChains.src}')`,
};

export default async function EvmEquivalent() {
  return (
    <div
      id="evmCompatibility"
      className="mb-6 mt-10 flex w-full max-w-[1440px] flex-col gap-8 px-12 sm:mb-8 sm:mt-8 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-16 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div
        className="hidden h-auto w-full bg-contain bg-center bg-no-repeat sm:block"
        style={imageBackgroundStyles}
      />
      <div className="flex w-full flex-col justify-center gap-8 lg:gap-16 xl:max-w-[550px]">
        <h2 className="flex flex-row font-display text-3xl sm:text-4xl lg:text-5xl">
          <span>3.</span>
          <span className="ml-4">EVM Compatible for effortless migration</span>
        </h2>
        <div
          className="h-[235px] w-[250px] self-center bg-contain bg-center bg-no-repeat sm:hidden"
          style={imageBackgroundStyles}
        />
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
