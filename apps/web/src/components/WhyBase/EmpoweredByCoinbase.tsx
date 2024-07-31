import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

export default async function EmpoweredByCoinbase() {
  return (
    <div id="empoweredByCoinbase" className="flex flex-row gap-32 bg-black px-20 pb-10 pt-10">
      <div className="flex max-w-[550px] flex-col justify-center gap-16">
        <h2 className="flex font-display text-5xl">
          <span>5.</span>
          <span className="ml-4">Empowered by Coinbase</span>
        </h2>
        <div>
          <span>
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
              buttonClassNames="mt-4 uppercase"
            >
              Learn More
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="h-[265px] w-[520px] bg-[url('../public/images/why-base-empowered-by-cb.png')] bg-no-repeat" />
    </div>
  );
}
