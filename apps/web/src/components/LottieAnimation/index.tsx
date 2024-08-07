'use client';

import { useEffect, useRef } from 'react';

// Airbnb lottie.
// Pros: Light, easy to use, doesn't require a WASM binary or CDN proxy
// Cons: Doesn't support custom .lottie files, only JSON
import lottie, { AnimationItem } from 'lottie-web';

export default function LottieAnimation({
  data,
  wrapperClassName,
}: {
  data: unknown;
  wrapperClassName: string;
}) {
  const animationContainer = useRef<HTMLDivElement>(null);
  const lotteAnimation = useRef<AnimationItem>();

  useEffect(() => {
    if (!animationContainer.current) return;
    if (lotteAnimation.current) return;
    lotteAnimation.current = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
      rendererSettings: {},
    });
  }, [data]);

  return <div ref={animationContainer} className={wrapperClassName} />;
}
