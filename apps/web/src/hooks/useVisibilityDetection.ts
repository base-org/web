import { useEffect, useMemo, useRef } from 'react';

type OnVisibilityChangeFunction = (visible: boolean) => void;

type UnregisterVisibilityChangeFunction = () => void;

type VisibilityDetector = {
  register: (fn: OnVisibilityChangeFunction) => UnregisterVisibilityChangeFunction;
};

export type VisibilityDetectionHook = () => VisibilityDetector;

export function useVisibilityDetection(): VisibilityDetector {
  const listenersRef = useRef<OnVisibilityChangeFunction[]>([]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const handleVisibilityChange = (): void => {
        const isVisible = !document.hidden;

        listenersRef.current.forEach((fn) => {
          fn(isVisible);
        });
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  return useMemo(
    () => ({
      register(fn: OnVisibilityChangeFunction): UnregisterVisibilityChangeFunction {
        listenersRef.current.push(fn);

        return () => {
          listenersRef.current = listenersRef.current.filter((listener) => listener !== fn);
        };
      },
    }),
    [],
  );
}
