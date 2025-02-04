'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

type Tab = 'build' | 'scale' | 'monetize';

type Quote = {
  text: string;
  author: string;
  role: string;
  tab: Tab;
};

const quotes: Quote[] = [
  {
    text: "Base's developer platform helped us launch our NFT marketplace in days instead of months.",
    author: 'Sarah Chen',
    role: 'CTO at ArtBlock',
    tab: 'build',
  },
  {
    text: 'We scaled from 100 to 100k daily active users without changing our infrastructure.',
    author: 'Michael Rodriguez',
    role: 'Founder at GameFi',
    tab: 'scale',
  },
  {
    text: 'Implementing Base Pay increased our revenue by 300% in the first month.',
    author: 'David Kim',
    role: 'CEO at DeFiPro',
    tab: 'monetize',
  },
];

export function Quotes() {
  const [activeTab, setActiveTab] = useState<Tab>('build');

  const quoteAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    }),
    [],
  );

  return (
    <section className="mt-16 h-full w-full">
      <div className="border-neutral-800 rounded-xl border px-8 pb-8 pt-6">
        <div className="mb-8 flex space-x-6">
          {(['build', 'scale', 'monetize'] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                'rounded px-2 py-0.5 transition-colors',
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-30 hover:bg-dark-gray-10 hover:text-white',
              )}
            >
              <Title level={TitleLevel.Title3}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Title>
            </button>
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {quotes
              .filter((quote) => quote.tab === activeTab)
              .map((quote) => (
                <motion.div
                  key={quote.tab}
                  initial={quoteAnimation.initial}
                  animate={quoteAnimation.animate}
                  exit={quoteAnimation.exit}
                  transition={quoteAnimation.transition}
                  className="space-y-8"
                >
                  <blockquote className="space-y-4">
                    <Title level={TitleLevel.Display3}>&ldquo;{quote.text}&rdquo;</Title>
                    <div className="text-gray-30">
                      <Title level={TitleLevel.Title4}>{quote.author}</Title>
                      <Title level={TitleLevel.Title4}>{quote.role}</Title>
                    </div>
                  </blockquote>
                  <ButtonWithLinkAndEventLogging
                    variant={ButtonVariants.SecondaryOutline}
                    iconName="arrowRight"
                    iconSize="24"
                    linkClassNames="px-4 py-2 text-base font-bold text-white"
                    buttonClassNames="flex w-40 items-center justify-between px-4 py-3"
                    href="/stories"
                    target="_blank"
                    eventName="developers_quotes"
                  >
                    More stories
                  </ButtonWithLinkAndEventLogging>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
