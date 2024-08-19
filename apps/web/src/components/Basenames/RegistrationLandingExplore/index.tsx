import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';

const divAnimation = {
  scale: [0.95, 0.98, 1, 1, 0.98, 0.95],
};

const animate = {
  opacity: [0, 0.1, 1, 1, 0, 0],
  y: ['-75%', '-50%', '-5%', '5%', '100%', '100%'],
};

const transition = {
  duration: 2,
  delay: 0.5,
  repeat: Infinity,
  repeatType: 'loop',
  ease: 'linear',
  times: [0, 0.1, 0.3, 0.7, 0.9, 1],
};

export default function RegistrationLandingExplore({}) {
  const { searchInputFocused } = useRegistration();

  return (
    <div className="absolute left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 justify-center">
      <span
        className={classNames('fontSize: md justify-center pr-2', {
          'text-[#454545]': !searchInputFocused,
          'text-white': searchInputFocused,
        })}
      >
        {' '}
        Scroll to explore
      </span>
      <motion.div animate={divAnimation} transition={transition}>
        <div className="h-[25px] w-[25px] rounded-lg bg-[#e7e6e2] py-1.5 pl-[6px]">
          <motion.div animate={animate} transition={transition}>
            <Icon name="caret" color="black" width="12" height="12" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
