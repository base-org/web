'use client';

import { useEffect, useState } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import type { CryptoProvidersProps } from './CryptoProviders';

export function DynamicCryptoProviders({
  children,
  mode = 'light',
  theme = 'default',
}: CryptoProvidersProps) {
  const [CryptoProvidersDynamic, setCryptoProvidersDynamic] =
    useState<React.ComponentType<CryptoProvidersProps>>();
  const { logError } = useErrors();

  console.log('getting error logger', {logError})

  console.log('loading CryptoProvidersDynamic');

  useEffect(() => {
    console.log('loading CryptoProviders');
    import('apps/web/app/CryptoProviders')
      .then((mod) => {
        console.log('were here')
        setCryptoProvidersDynamic(() => mod.default);
      })
      .catch((error) => {
        console.error('Failed to load CryptoProviders', error);
        logError(error, 'Failed to load CryptoProviders')
      });
  }, [logError]);

  console.log({ CryptoProvidersDynamic });

  if (!CryptoProvidersDynamic) return null;

  return (
    <CryptoProvidersDynamic mode={mode} theme={theme}>
      {children}
    </CryptoProvidersDynamic>
  );
}
