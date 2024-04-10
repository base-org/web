import { useEffect, useState } from 'react';

export function useSprig() {
  const [Sprig, setSprig] = useState<unknown>(null);

  useEffect(() => {
    const loadSprig = async () => {
      try {
        const { sprig } = await import('@sprig-technologies/sprig-browser');
        const sprigInit = sprig.configure({
          environmentId: process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID,
        });
        setSprig(sprigInit);
      } catch (error) {
        console.error('Failed to load the Sprig module:', error);
      }
    };

    void loadSprig();
  }, []);

  return Sprig;
}
