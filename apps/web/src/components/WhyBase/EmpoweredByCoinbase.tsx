import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function EmpoweredByCoinbase() {
  return (
    <div id="empoweredByCoinbase" className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-32 bg-black px-12 sm:px-16 lg:px-24 pb-6 sm:pb-8 lg:pb-10 pt-6 sm:pt-8 lg:pt-10">
      <div className="flex w-full lg:w-1/2 xl:max-w-[550px] flex-col justify-center gap-8 lg:gap-16">
        <h2 className="flex flex-row font-display text-3xl sm:text-4xl lg:text-5xl">
          <span>5.</span>
          <span className="ml-4">Empowered by Coinbase</span>
        </h2>
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
      <div className="w-full lg:w-1/2 xl:w-[520px] aspect-[520/265] lg:aspect-auto lg:h-[265px]">
        <div className="w-full h-full bg-[url('../public/images/why-base-empowered-by-cb.png')] bg-contain bg-no-repeat bg-center" />
      </div>
    </div>
  );
}
