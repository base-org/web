'use client';

import Link from 'apps/web/src/components/Link';
import { Icon } from 'libs/base-ui';
import { useCallback, useState } from 'react';

export default function GrantsFaq() {
  return (
    <div>
      <h2 className="mb-4 mt-12 text-2xl">Application FAQ</h2>
      <FaqItem
        question="What is a Base Builder Grant?"
        answer={
          <ul className="mt-4 flex list-inside list-disc flex-col items-start">
            <li className="mb-2">
              Base Builder Grants are small 1-5 ETH grants for projects built on Base
            </li>
            <li className="mb-2">
              Read more{' '}
              <Link
                className="underline hover:text-gray-30 hover:no-underline"
                href="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
              >
                here
              </Link>
            </li>
          </ul>
        }
      />
      <FaqItem
        question="What are the application requirements?"
        answer={
          <ul className="mt-4 flex list-inside list-disc flex-col items-start">
            <li className="mb-2">You must log in with your Basename to submit an application</li>
            <li className="mb-2">The project must be live on Base Mainnet</li>
          </ul>
        }
      />
      <FaqItem
        question="How can I set myself up for success?"
        answer={
          <ul className="mt-4 flex list-inside list-disc flex-col items-start">
            <li className="mb-2">
              Apply for a project that&apos;s unique, fun, and/or making an impact
            </li>
            <li className="mb-2">Build something that brings more users onchain</li>
          </ul>
        }
      />
      <FaqItem
        question="Can I apply for a grant on behalf of other builders?"
        answer={
          <ul className="mt-4 flex list-inside list-disc flex-col items-start">
            <li className="mb-2">
              Yes, you can nominate others by submitting an application on their behalf
            </li>
            <li className="mb-2">
              The nominee must have a Basename and meet the other eligibility requirements
            </li>
          </ul>
        }
      />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: JSX.Element | string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="mb-8">
      <button className="flex w-full flex-row justify-between" onClick={toggleOpen} type="button">
        <span className="text-xl">{question}</span>
        <Icon name="caret" width="24" height="24" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div>{answer}</div>
      </div>
    </div>
  );
}
