import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function EmpoweredByCoinbase() {
  return (
    <div
      id="empoweredByCoinbase"
      className="flex flex-col gap-8 bg-black px-12 pb-6 pt-6 sm:grid sm:grid-cols-[1fr_1fr] sm:gap-16 sm:px-16 sm:pb-8 sm:pt-8 lg:px-24 lg:pb-10 lg:pt-10"
    >
      <div className="flex w-full flex-col justify-center gap-8 lg:gap-16 xl:max-w-[550px]">
        <h2 className="flex flex-row font-display text-3xl sm:text-4xl lg:text-5xl">
          <span>5.</span>
          <span className="ml-4">Empowered by Coinbase</span>
        </h2>
        <div className="h-[235px] w-[300px] self-center bg-[url('../public/images/why-base-empowered-by-cb.png')] bg-contain bg-center bg-no-repeat sm:hidden" />
        <div>
          <span className="text-base sm:text-lg">
            {`Base is incubated within Coinbase and plans to progressively decentralize in the years
            ahead. Leverage Coinbase's developer tools to make building easy and to reach Coinbase
            users.`}
          </span>
          <div>
            <ButtonWithLinkAndEventLogging
              href="/about"
              eventName="empowered_coinbase_learn_more"
              eventContext="why_base"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames="mt-4 uppercase w-full sm:w-auto"
            >
              Learn More
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="hidden h-auto w-full bg-[url('../public/images/why-base-empowered-by-cb.png')] bg-contain bg-center bg-no-repeat sm:block" />
    </div>
  );
}
