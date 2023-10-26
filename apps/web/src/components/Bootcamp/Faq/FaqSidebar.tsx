import { QuestionAccordion } from './QuestionAccordion';

export function FaqSidebar() {
  return (
    <div className="flex w-full max-w-[1440px] flex-col space-y-20 bg-black px-8 pt-12">
      <div className="lg:border-sidebar-border grid grid-cols-1 font-sans lg:border-l">
        <div className="flex w-full flex-col pb-10 font-display text-3xl text-white md:text-5xl lg:text-6xl">
          <p className="font-mono text-3xl uppercase">Frequently Asked Questions</p>
        </div>

        <div className="h-[1px] w-full bg-muted opacity-40" />

        <QuestionAccordion
          question="When will I hear back about my application?"
          answer="You will hear from us within 5-7 business days if you’re accepted into the program. Please note that we’re not able to respond to every individual submission given the volume."
        />

        <QuestionAccordion
          question="What is your selection criteria?"
          answer="Students will be selected based on coding skills, “crypto-proficiency” (experience using crypto), and experience level. We’re looking for mid to senior level Software Engineering individual contributors."
        />

        <QuestionAccordion
          question="What resources will I get if I am accepted into the program?"
          answer="Your onboarding package will include the student handbook, mentor-pairing info, invite to the private Base Bootcamp Discord channel, and a launch day kickoff meeting with your cohort. You’ll also get to work through the Base Camp content with supplemental resources and graded projects reviewed by Coinbase engineers."
        />

        <QuestionAccordion
          question="Who is my mentor?"
          answer="An experienced Smart Contract Developer, either from Coinbase or part of the larger Base community."
        />

        <QuestionAccordion
          question="Can I fail the program?"
          answer="Yes - in order to graduate, you must complete the program on time. However, we will do everything we can to make sure you have all that you need to be successful."
        />

        <QuestionAccordion
          question="Does it cost anything?"
          answer=" We ask that you deposit 1 ETH with us, which you will receive back upon successfully completing the program. If you quit early, you will not receive your deposit back."
        />

        <QuestionAccordion
          question="What is the time commitment?"
          answer={
            <div className="flex flex-col space-y-4">
              <p>Base Bootcamp will require ~15 hours/week for ~8 weeks.</p>
              <p>
                Apart from a few live meetings, the majority of the time will be allocated to
                completing our self-paced Smart Contract development curriculum and building various
                projects.
              </p>
            </div>
          }
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
          answer="You will learn to deploy smart contracts – the foundation of building any onchain app."
        />
        <div className="mb-40 h-[1px] w-full bg-muted opacity-40" />
      </div>
    </div>
  );
}
