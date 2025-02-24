import { lazy, Suspense } from 'react';

const CookieBannerWrapper = lazy(async () => import('@/components/CookieBannerWrapper'));

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <CookieBannerWrapper />
      </Suspense>
    </>
  );
}
