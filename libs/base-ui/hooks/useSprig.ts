import { useEffect, useState } from 'react';

type SprigEnvironmentId = string | undefined;
const isDevelopment = process.env.NODE_ENV === 'development';
export default function useSprig(environmentId: SprigEnvironmentId) {
  const [Sprig, setSprig] = useState<unknown>(null);

  useEffect(() => {
    if (!environmentId) {
      if (isDevelopment) {
        console.info('Development: Sprig is not configured');
      } else {
        console.warn('Sprig is not configured');
      }
      return;
    }

    const loadSprig = async () => {
      try {
        const { sprig } = await import('@sprig-technologies/sprig-browser');
        const sprigInit = sprig.configure({
          environmentId: environmentId,
        });
        void sprigInit('track', 'pageload');
        setSprig(sprigInit);
      } catch (error) {
        console.error('Failed to load the Sprig module:', error);
      }
    };

    void loadSprig();
  }, []);

  return Sprig;
}
