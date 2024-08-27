import { useEffect, useState } from 'react';

type SprigEnvironmentId = string | undefined;
const isDevelopment = process.env.NODE_ENV === 'development';

export default function useSprig(environmentId: SprigEnvironmentId) {
  const [Sprig, setSprig] = useState<unknown>(undefined);

  useEffect(() => {
    // Disabled for development
    if (isDevelopment) return;

    if (!environmentId) {
      console.warn('Sprig is not configured. Please provide a valid environmentId.');
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
        console.error('Failed to load the Sprig module:', error, 'Environment ID:', environmentId);
      }
    };

    void loadSprig();
  }, [environmentId]); // Добавлен environmentId в зависимости

  return Sprig;
}
