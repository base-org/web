'use client';

import { useEffect, useState } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';

// RigidBody cannot be imported using dynamic() due to some import issues
export function DynamicCryptoProviders({ children }: { children: React.ReactNode }) {
  const [CryptoProvidersDynamic, setCryptoProvidersDynamic] = useState<React.ComponentType<{ children: React.ReactNode }>>();
  const { logError } = useErrors();

  // Import needs to happens on render
  useEffect(() => {
    import('apps/web/app/CryptoProviders')
      .then((mod) => {
        setCryptoProvidersDynamic(() => mod.default);
      })
      .catch((error) => logError(error, 'Failed to load CryptoProviders'));
  }, [logError]);

  if (!CryptoProvidersDynamic) return null;

  return <CryptoProvidersDynamic>{children}</CryptoProvidersDynamic>;
}
