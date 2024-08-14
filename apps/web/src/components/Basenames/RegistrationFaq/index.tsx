"use client"
import { useState, useCallback } from 'react';
import { Icon } from 'base-ui';


type FAQItemProps = {
  question: string;
  answer: string;
};

const faqItems = [
  {
    question: "What are Basenames?",
    answer: "Usernames are unique identifiers that represent your identity on the platform."
  },
  {
    question: "What else can I do with this name?",
    answer: "You can use your username to interact with other users, participate in discussions, and access personalized features."
  },
  {
    question: "Can I use it on other onchain apps?",
    answer: "Yes, your username can be used across various onchain applications that support the username system."
  },
  {
    question: "Where can I go to learn more?",
    answer: "You can visit our documentation website or join our community forums to learn more about usernames and their functionalities."
  },
  {
    question: "What happens when my name expires?",
    answer: "When your username expires, you will need to renew it to continue using it. Renewal instructions will be provided before the expiration date."
  },
  {
    question: "Will benefits be only specific to Base?",
    answer: "While some benefits may be specific to the Base platform, we aim to provide integrations and partnerships with other platforms to extend the benefits of your username."
  }
]


function FAQItem({ question, answer }: FAQItemProps){
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <div className="border-b border-[#5B616E]/20">
      <button
        className="flex justify-between items-center w-full py-4 text-left text-gray-800 font-medium focus:outline-none"
        onClick={toggleOpen}
        type='button'
      >
        <span>{question}</span>
        <Icon name="caret" width="24" height="24" color="black" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="pb-4 text-gray-600">{answer}</div>
      </div>
    </div>
  );
};

export default function RegistrationFAQ() { 
  return (
      <section className="max-w-6xl mx-auto md:py-20 px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-left mb-8 lg:mb-0">
            <h2 className="text-5xl md:text-6xl font-normal mb-8">
              Questions? <br /> See our FAQ
            </h2>
            <p className="text-xl max-w-md">
              Get more answers in our FAQ, and view our developer docs to see how you can build with usernames.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            {faqItems.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>
  );
};
