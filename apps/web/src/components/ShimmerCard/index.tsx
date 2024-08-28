'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type HoverShimmerProps = {
  className?: string;
  active?: boolean;
  shrink?: boolean;
  children: React.ReactNode;
};

export default function ShimmerCard({
  className = '',
  active = false,
  shrink = false,
  children,
}: HoverShimmerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const glowRadius = 400;

  const x = useMotionValue(50);
  const y = useMotionValue(50);

  const springConfig = { stiffness: 180, damping: 74 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      if (outerRef.current) {
        const rect = outerRef.current.getBoundingClientRect();
        setTop(rect.top);
        setLeft(rect.left);
      }
    };

    const handleScroll = () => {
      if (outerRef.current) {
        const rect = outerRef.current.getBoundingClientRect();
        setTop(rect.top);
        setLeft(rect.left);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className={`bg-neutral-900 relative w-full overflow-hidden rounded-xl p-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        active ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      } ${shrink ? 'active:scale-98' : ''}`}
    >
      <div
        className={`relative z-30 h-full w-full overflow-hidden rounded-[11px] bg-[#0f0f0f] bg-opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#141414] ${className}`}
      >
        {children}
      </div>
      <motion.div
        className="glow bg-neutral-500 absolute z-10 rounded-full"
        style={{
          width: glowRadius,
          height: glowRadius,
          filter: `blur(${glowRadius / 4}px)`,
          x: springX,
          y: springY,
          top: -top - glowRadius / 2,
          left: -left - glowRadius / 2,
        }}
      />
    </div>
  );
}
