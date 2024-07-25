import { useEffect, useMemo, useState } from 'react';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { gradientBgMap, textGradientMap, Verb, verbs } from 'apps/web/src/styles/hero';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { bridgeUrl, docsUrl } from 'apps/web/src/constants';

const subtitleCopy =
  'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.';
const gradientText = 'text-[transparent] bg-clip-text';
const extendedGradientStyles = 'hidden 2xl:block bg-[length:1526px_841px]';
const initialTextStyles = {
  opacity: 0,
  transform: 'translateY(50px)',
};
const initialTextStylesReducedMotion = {
  opacity: 0,
  transform: 'translateY(0px)',
};
const textTransitionConfig = {
  duration: 0.3,
  type: 'tween',
  ease: 'easeOut',
};

export function Hero() {
  const [items, setItems] = useState<string[]>(verbs.slice());
  const currItem = useMemo(() => items[0], [items]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setTimeout(() => {
      const itemsCopy = items.slice();
      const firstItem = itemsCopy.shift();
      itemsCopy.push(firstItem ?? '');
      setItems(itemsCopy);
    }, 2500);
  }, [items]);

  const animatedTextStyles = useMemo(
    () => ({
      opacity: 1,
      transform: 'translateY(0px)',
      backgroundImage: textGradientMap[currItem as Verb[number]],
    }),
    [currItem],
  );
  const animatedTextStylesReducedMotion = useMemo(
    () => ({
      opacity: 1,
      backgroundImage: textGradientMap[currItem as Verb[number]],
    }),
    [currItem],
  );

  const animatedCenterGradientStyles = useMemo(
    () => ({
      backgroundImage: gradientBgMap[currItem as Verb[number]].center,
    }),
    [currItem],
  );
  const animatedLeftGradientStyles = useMemo(
    () => ({
      backgroundImage: gradientBgMap[currItem as Verb[number]].left,
    }),
    [currItem],
  );
  const animatedRightGradientStyles = useMemo(
    () => ({
      backgroundImage: gradientBgMap[currItem as Verb[number]].right,
    }),
    [currItem],
  );

  // negative margin is used to get the hero behind the transparent Nav header
  return (
    <header className="mt-[-96px] h-[841px] 2xl:grid 2xl:grid-cols-[1fr_1536px_1fr]">
      <motion.div
        className={`${extendedGradientStyles} bg-right`}
        initial={animatedLeftGradientStyles}
        animate={animatedLeftGradientStyles}
      />
      <motion.div
        className="ml-[-1px] h-full scale-x-[-1]"
        initial={animatedCenterGradientStyles}
        animate={animatedCenterGradientStyles}
      >
        <div className="h-full scale-x-[-1] px-12">
          <h1 className="flex h-full flex-col font-mono text-4xl uppercase md:text-5xl lg:text-7xl xl:text-8xl">
            <span className="flex basis-1/2 flex-col justify-end pb-3">
              <span className="text-[#373737]">Build</span>
              <motion.span
                className={gradientText}
                initial={shouldReduceMotion ? initialTextStylesReducedMotion : initialTextStyles}
                animate={shouldReduceMotion ? animatedTextStylesReducedMotion : animatedTextStyles}
                key={currItem}
                transition={textTransitionConfig}
              >
                {items[0]}
              </motion.span>
            </span>
            <span
              className={`${gradientText} bg-gradient-to-b from-blue-600 via-white to-white pt-3`}
            >
              on Base
            </span>
          </h1>
          <div className="absolute bottom-12 pr-12">
            <p className="max-w-sm pt-6 text-center font-display text-sm text-white md:max-w-md md:text-lg lg:text-left">
              {subtitleCopy}
            </p>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col items-center gap-2 pt-7 md:flex-row">
                <Link className="w-full" href={docsUrl} target="_blank" rel="noreferrer noopener">
                  <Button fullWidth>Read the docs</Button>
                </Link>
                <Link className="w-full" href={bridgeUrl} rel="noreferrer noopener">
                  <Button fullWidth variant={ButtonVariants.Secondary}>
                    Bridge assets
                  </Button>
                </Link>
              </div>
              <p className=" block w-full font-mono uppercase text-white lg:hidden">
                Powered by Op Stack
              </p>
            </div>
          </div>
          <p className="absolute bottom-12 right-12 hidden font-mono uppercase text-white lg:block">
            Powered by Op Stack
          </p>
        </div>
      </motion.div>
      <motion.div
        className={extendedGradientStyles}
        initial={animatedRightGradientStyles}
        animate={animatedRightGradientStyles}
      />
    </header>
  );
}
