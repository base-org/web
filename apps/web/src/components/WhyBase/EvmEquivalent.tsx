import Image from 'apps/web/node_modules/next/image';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import evmCompatibleChains from './images/EVM-compatibility-chains.png';

export const EVM_COMPATIBILITY_SECTION_ID = 'evmCompatibility';

export default async function EvmEquivalent() {
  return (
    <div
      id={EVM_COMPATIBILITY_SECTION_ID}
      className="mb-6 mt-10 flex w-full max-w-[1440px] flex-col gap-8 px-12 sm:mb-8 sm:mt-8 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-16 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div className="hidden h-auto w-full bg-contain bg-center bg-no-repeat sm:my-[-25px] sm:block lg:my-[-40px]">
        <Image src={evmCompatibleChains} alt="EVM compatible chains" />
      </div>
      <div className="flex w-full flex-row">
        <div className="flex flex-row">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-black sm:h-7 sm:w-7 sm:text-xl lg:mr-4 lg:mt-2 lg:h-8 lg:w-8 lg:text-2xl">
            3
          </span>
          <div className="ml-4">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl">
              EVM Compatible for effortless migration
            </h2>
            <div className="mb-8 mt-4 h-[235px] w-[250px] self-center bg-contain bg-center bg-no-repeat sm:hidden">
              <Image src={evmCompatibleChains} alt="EVM compatible chains" />
            </div>
            <p className="my-2 text-base sm:text-lg lg:my-4 xl:my-6">
              Move your project to Base in minutes from any other EVM-compatible chain and unlock
              the full potential of the Superchain and OP stack
            </p>
            <ButtonWithLinkAndEventLogging
              href="https://docs.base.org/docs"
              eventName="evm_compatible_start_migrating"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames="mt-4 uppercase font-mono font-medium w-full sm:w-auto"
            >
              Start Migrating
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
    </div>
  );
}
