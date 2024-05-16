import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { WhiteCircle } from 'apps/web/src/components/OnchainSummer/Circles';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';

function ToolCard({
  title,
  description,
  link,
  linkText,
}: {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="flex min-h-[280px] flex-col justify-between gap-2 rounded-[5px] border-[1.5px] border-solid border-blue-600 p-4 hover:bg-white hover:text-black md:w-[400px] lg:min-w-[200px]"
    >
      <div className="flex flex-col">
        <span className="mb-8 font-display text-2xl font-light uppercase md:text-4xl">{title}</span>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">{description}</div>
        <div className="text my-4 font-mono uppercase">[→] {linkText}</div>
      </div>
    </a>
  );
}

export default function ToolsBlock() {
  return (
    <div className="mb-8 mt-4 flex w-full flex-col items-center rounded-[6px] bg-black pb-8">
      <div className="my-12 flex w-full max-w-[1200px] flex-col rounded-[6px] px-8 pt-8 text-white">
        <div className="flex flex-col">
          <div className="text-l flex flex-row items-center gap-2 font-mono uppercase">
            <WhiteCircle /> Build Next-Gen Products
          </div>
          <FadeInSection>
            <div className="my-6 flex flex-col justify-between gap-16 lg:flex-row lg:items-end">
              <span className="text-5xl font-extrabold leading-9 md:w-1/3 md:text-7xl">
                <Brit axis={139}>w</Brit>ANNA ST<Brit>a</Brit>RT BUIL<Brit axis={133}>d</Brit>ING?
              </span>
              <p className="text-2xl font-light md:text-3xl">
                Make getting onchain easier than ever for your users.
              </p>
            </div>
          </FadeInSection>
        </div>
        <FadeInSection delay={0.5}>
          <section className="mt-6 flex flex-col gap-4 md:flex-row">
            <ToolCard
              title="Smart Wallet"
              description="Eliminate seed phrases. Allow instant wallet creation with a passkey."
              linkText="Learn more"
              link="https://www.coinbase.com/wallet/smart-wallet?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
            />
            <ToolCard
              title="CB Verifications"
              description="Unlock onchain experiences and rewards for users."
              linkText="Learn more"
              link="https://github.com/coinbase/verifications"
            />
            <ToolCard
              title="Paymaster"
              description="Simplify your user journey by sponsoring gas."
              linkText="Learn more"
              link="https://docs.cloud.coinbase.com/base-node/docs/paymaster-bundler-qs "
            />
          </section>
        </FadeInSection>
      </div>
    </div>
  );
}
