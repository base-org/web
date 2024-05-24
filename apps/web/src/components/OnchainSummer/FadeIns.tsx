import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

const initial = { opacity: 0 };

export function FadeInSection({
  children,
  duration = 0.4,
  delay = 0.0,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });
  const transition = useMemo(() => ({ duration, delay }), [duration, delay]);
  const animate = useMemo(() => ({ opacity: inView ? 1 : 0 }), [inView]);

  return (
    <motion.div ref={ref} initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
}
