import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { WhiteCircle } from 'apps/web/src/components/OnchainSummer/Circles';

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
      className="flex min-w-[200px] flex-col justify-between gap-2 rounded-[5px] border-[1.5px] border-solid border-blue-600 p-4 hover:bg-white hover:text-black"
    >
      <div className="flex flex-col">
        <span className="mb-8 text-2xl font-light md:text-4xl">{title}</span>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">{description}</div>
        <div className="text my-4 uppercase">[→] {linkText}</div>
      </div>
    </a>
  );
}

export default function ToolsBlock() {
  return (
    <div className="mt-4 flex w-full flex-col items-center rounded-[6px] bg-black">
      <div className="my-12 flex w-full max-w-[1200px] flex-col rounded-[6px] px-8 pt-8 text-white">
        <div className="flex flex-col">
          <div className="text-l flex flex-row items-center gap-2 font-mono uppercase">
            <WhiteCircle /> Tools
          </div>
          <div className="my-6 flex flex-col justify-between gap-16 md:flex-row md:items-end">
            <span className="text-5xl font-extrabold leading-9 md:w-1/3 md:text-7xl">
              <Brit axis={139}>w</Brit>ANNA ST<Brit>a</Brit>RT BUIL<Brit axis={133}>d</Brit>ING?
            </span>
            <p className="text-2xl font-light md:text-3xl">
              Make it easier than ever to get onchain. Get more users and unlock rewards.
            </p>
          </div>
        </div>
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
            link="https://www.coinbase.com/developer-platform/solutions/account-abstraction-kit?utm_source=base&utm_medium=web&utm_campaign=onchainsummer"
          />
        </section>
      </div>
    </div>
  );
}
