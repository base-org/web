// white css circle
function Circle({ color }: { color: string }) {
  return <div className="mx-4 h-4 w-4 rounded-full" style={{ background: color }} />;
}

import { motion } from 'framer-motion';

const textVariants = {
  animate: {
    x: [0, -1440], // animate from 0 to negative window width
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 12,
        ease: 'linear',
      },
    },
  },
};

function ScrollingText({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="inline-block flex flex-row items-center whitespace-nowrap"
      variants={textVariants}
      animate="animate"
    >
      {children}
    </motion.div>
  );
}

function ContentA() {
  return (
    <>
      <Circle color="#FEE002" />
      onchain summer is back
    </>
  );
}

function ContentB() {
  return (
    <>
      <Circle color="#FF8DCF" />
      it&apos;s time to build
    </>
  );
}

export default function ScrollBanner() {
  return (
    <div className="my-8 flex w-full overflow-hidden whitespace-nowrap text-2xl uppercase text-white">
      <ScrollingText>
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
        <ContentA />
        <ContentB />
      </ScrollingText>
    </div>
  );
}
