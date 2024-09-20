import { QuestionAccordion } from 'apps/bridge/src/components/Faq/QuestionAccordion';

export function FaqSidebar() {
  return (
    <div className="flex w-full flex-col p-4 pl-6 font-sans lg:w-[420px] lg:border-l lg:border-sidebar-border">
      <span className="mb-8 mt-6 font-mono text-base font-medium uppercase text-stone-400">
        Frequently asked questions
      </span>
      <QuestionAccordion
        question="Can I still use the bridge on bridge.base.org?"
        answer="No, the bridge on bridge.base.org has been deprecated."
      />
      <QuestionAccordion
        question="I used bridge.base.org in the past, how do I find my deposit or withdrawal?"
        answer="Navigate to one of the Superchain Bridges to look up your transaction."
      />
      <QuestionAccordion
        question="Why has Base deprecated the bridge on bridge.base.org?"
        answer="Base is committed to decentralization and the Superchain vision. Leveraging the community to bootstrap the Superchain bridges is a step in that direction; increasing censorship resistance and decentralization."
      />
      <QuestionAccordion
        question="Who operates Superchain Bridges like Superbridge.com and Brid.gg?"
        answer='Superchain Bridges are operated by third parties, not by Coinbase Technologies, Inc. ("Coinbase"). Coinbase does not control, operate, or assume any responsibility for the performance of these external platforms. Before using any Superchain Bridge, you may be required to agree to their terms and conditions. We strongly recommend you review these terms carefully, as well as any privacy policies, to understand your rights and obligations. The integration or inclusion of the Superchain Bridges does not imply an endorsement or recommendation of any bridge by Coinbase.'
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
            You can create a support ticket in the #general-support channel.
          </>
        }
      />
    </div>
  );
}
