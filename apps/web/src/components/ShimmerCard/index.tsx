'use client';

import React, { useEffect, useRef } from 'react';

type HoverShimmerProps = {
  children: React.ReactNode;
};

export default function ShimmerCard({ children }: HoverShimmerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const fakeBlobRef = useRef<HTMLDivElement>(null);

  // Note: This will add an event for every card on the page.
  //       If this leads to performance issue, consider a context / one event
  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      if (blobRef.current && fakeBlobRef.current) {
        const rec = fakeBlobRef.current.getBoundingClientRect();

        blobRef.current.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px,${
                ev.clientY - rec.top - rec.height / 2
              }px)`,
            },
          ],
          {
            duration: 300,
            fill: 'forwards',
          },
        );
        blobRef.current.classList.remove('opacity-0');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  /* 
    Shimmer / Tailwind integration notes:
    - Converted from https://codepen.io/yxshv/pen/JjaRZmb
    - The card "border" is controlled via the padding, p-[1px]
    - if you change the "border", you need to change the inner class radius accordingly
  */
  const cardClassName =
    'card overflow-hidden p-[1px] m-0 bg-white/20 rounded-[16px] relative  group';

  const blobClassName =
    'blob blur-[40px] z-10 absolute opacity-0 w-[30rem] h-[30rem] rounded-full bg-[rgb(255,255,255,0.2)]';

  const fakeBlobClassName = 'fake-blob absolute w-[30rem] h-[30rem] rounded-full opacity-0';

  const innerClassName = 'inner relative rounded-[15px] p-12 bg-black z-20 h-full';

  return (
    <div className={cardClassName} ref={cardRef}>
      <div className={innerClassName}>{children}</div>
      <div className={blobClassName} ref={blobRef} />
      <div className={fakeBlobClassName} ref={fakeBlobRef} />
    </div>
  );
}
