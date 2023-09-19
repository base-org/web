import { QuestionAccordion } from 'apps/bridge/src/components/Faq/QuestionAccordion';

export function FaqSidebar() {
  return (
    <div className="flex h-full w-full flex-col p-4 font-sans lg:w-[420px] lg:border-l lg:border-sidebar-border">
      <span className="mb-8 text-base font-medium text-stone-500">Frequently asked questions</span>

      <QuestionAccordion
        question="What is Base Bridge?"
        answer="Base Bridge enables the transfer of certain digital assets and other data back and forth between Ethereum and Base."
      />
      <QuestionAccordion
        question="What wallet can I use?"
        answer="You can use popular Ethereum wallets like Coinbase Wallet, MetaMask, and Rainbow Wallet to name a few."
      />
      <QuestionAccordion
        question="What if I have a question, issue or problem?"
        answer={
          <>
            The{' '}
            <a href="https://base.org/discord" className="underline">
              Base Discord
            </a>{' '}
            community is available around the clock for general questions, assistance and support!
          </>
        }
      />
      <QuestionAccordion
        question="How do you withdraw from Base?"
        answer={
          <div className="flex flex-col space-y-4">
            <p>
              Connect your wallet and confirm that it is set to Base network. Choose the digital
              asset you wish to bridge back to Ethereum mainnet and confirm you want to withdraw.{' '}
            </p>
            <p>
              After your withdrawal request is proposed onchain (within an hour) you must verify and
              complete the transaction in order to access your funds. You can track your progress
              under the transaction tab.
            </p>
            <p>
              Transferring from Base to Ethereum takes approximately 7 days. This is a security
              feature designed to help secure Base. If you prefer not to wait, you can alternatively
              use{' '}
              <a href="https://coinbase.com/" className="underline">
                Coinbase
              </a>{' '}
              with any assets that they support Base network deposits from, or a third-party bridge
              which allows you to transfer assets much faster. You can find more information about
              the Base Bridge{' '}
              <a href="https://docs.base.org/tools/bridge-faq" className="underline">
                {' '}
                here
              </a>
              .
            </p>
          </div>
        }
      />
    </div>
  );
}
