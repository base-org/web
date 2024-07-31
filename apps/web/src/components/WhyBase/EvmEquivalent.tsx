import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function EvmEquivalent() {
  return (
    <div id="evmCompatibility" className="flex flex-row gap-32 bg-black px-20 pb-10 pt-10">
      <div className="h-[520px] w-[550px] bg-[url('../public/images/EVM-compatibility-chains.png')] bg-no-repeat" />
      <div className="flex max-w-[550px] flex-col justify-center gap-16">
        <h2 className="flex font-display text-5xl">
          <span>3.</span>
          <span className="ml-4">EVM Compatible for effortless migration</span>
        </h2>
        <div>
          <span>
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
              buttonClassNames="mt-4 uppercase"
            >
              Start Migrating
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
    </div>
  );
}
