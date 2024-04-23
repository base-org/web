import { QuestionAccordion } from 'apps/bridge/src/components/Faq/QuestionAccordion';

export function FaqSidebar() {
  return (
    <div className="flex h-full w-full flex-col p-4 font-sans lg:w-[420px] lg:border-l lg:border-sidebar-border">
      <span className="mb-8 text-base font-medium text-stone-400">Frequently asked questions</span>

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
            Depending on your issue, you can create a support ticket in the #general-support or
            #developer-support channels.
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
              <a href="https://docs.base.org/docs/tools/bridge-faq" className="underline">
                {' '}
                here
              </a>
              .
            </p>
          </div>
        }
      />
      <QuestionAccordion
        question="Are there any fees involved in using Base Bridge?"
        answer={
          <div className="flex flex-col space-y-4">
            <p>
              There are network fees involved which are used to pay for the gas costs on Ethereum
              and Base. There are no additional fees specifically for using Base Bridge.
            </p>
          </div>
        }
      />
      <QuestionAccordion
        question="Can I cancel a withdrawal?"
        answer={
          <div className="flex flex-col space-y-4">
            <p>
              No, if a withdrawal has already been initiated on the Withdraw page it is not possible
              to cancel it. Once withdrawn the process needs to be completed.
            </p>
          </div>
        }
      />
      <QuestionAccordion
        question="Why does it take seven days to withdraw?"
        answer={
          <div className="flex flex-col space-y-4">
            <p>
              This seven day bridge duration is in place as a{' '}
              <a
                href="https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions"
                className="underline"
              >
                challenge period
              </a>{' '}
              security measure built into the OP Stack.
            </p>
            <p>
              If you prefer not to wait, instead of making a withdrawal using Base Bridge, you also
              have the option to utilize a{' '}
              <a href="https://base.org/ecosystem?tag=bridge" className="underline">
                third-party bridge
              </a>{' '}
              for quicker withdrawals.
            </p>
          </div>
        }
      />
      <QuestionAccordion
        question="How do I verify my withdrawal transaction?"
        answer={
          <div className="flex flex-col space-y-4">
            <p>
              Navigate to the{' '}
              <a href="https://bridge.base.org/transactions" className="underline">
                Transactions
              </a>{' '}
              page. Next to your transaction, use the button to &quot;Switch to L1&quot;. This
              action will ask you to switch to the Ethereum Mainnet network, enabling you to proceed
              with the verification process.
            </p>
            <p>
              Proceed to then use the same button which will update to a new status enabling you to
              &quot;Verify&quot; your withdrawal. This action will prompt you to complete
              verification with your wallet by signing a transaction.
            </p>
            <p>
              Seven days after you have verified your withdrawal, you can complete your withdrawal
              by returning to the Transactions page. Use the &quot;Complete&quot; button which will
              appear next to your transaction.
            </p>
          </div>
        }
      />
    </div>
  );
}
