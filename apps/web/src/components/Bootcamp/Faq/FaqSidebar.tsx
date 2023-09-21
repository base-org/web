import { QuestionAccordion } from './QuestionAccordion';

export function FaqSidebar() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-20 bg-black px-8 pt-12">
      <div className="grid grid-cols-1 font-sans lg:border-l lg:border-sidebar-border">
        <div className="flex w-full flex-col font-display text-3xl text-white md:text-5xl lg:text-6xl pb-10">
          <p className="font-mono text-3xl uppercase">Frequently Asked Questions</p>
        </div>

        <div className="h-[1px] w-full bg-muted opacity-40" />

        <QuestionAccordion
          question="Does it cost anything?"
          answer=" We ask that you deposit 1 ETH with us, which you will receive back upon successfully completing the program. If you quit early, you will not receive your deposit back."
        />
        
        <QuestionAccordion
          question="What is the time commitment?"
          answer={(
            <div className="flex flex-col space-y-4">
              <p>Base Bootcamp will require ~15 hours/week for ~8 weeks.
              </p>
              <p>
                Apart from a few live meetings, the majority of the time will be allocated to completing our self-paced Smart Contract development curriculum and building various projects.
              </p>
            </div>
          )}
        />
        
        <QuestionAccordion
          question="Are there live classes?"
          answer="There are no live classes per-se, but you will meet live with your mentor each week (scheduled around your availability) and are welcome to attend live weekly office hours."
        />

        <QuestionAccordion
          question="Can I quit if it’s too much for me?"
          answer="Ideally, no! Before committing, do the work you need to do to make sure you can stick it out for the whole program. With only a handfull participants, the success of our program depends on having committed participants."
        />

        <QuestionAccordion
          question="Will I be offered a job upon graduation?"
          answer="No. There is no distinct relationship between Base Bootcamp and further employment opportunities."
        />

        <QuestionAccordion
          question="What will I be able to do upon graduation?"
          answer="Deploy smart contracts!"
        />

        <QuestionAccordion
          question="By what criteria are you using to accept applicants?"
          answer="We are looking for committed candidates that are “crypto-proficient”, passionate about Blockchain technology and experienced as Software Engineers. Base Bootcamp is not an intro course and will assume you have several years of professional programming experience."
        />

        <div className="h-[1px] w-full bg-muted opacity-40 mb-40" />
      </div>
    </div>

  );
}
