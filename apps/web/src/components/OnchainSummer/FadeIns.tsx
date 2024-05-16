import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
