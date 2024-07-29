'use client';

import { CookieBanner } from '@coinbase/cookie-banner';
import { Footer } from 'apps/web/src/components/Layout/Footer/Footer';
import { cookieBannerTheme } from 'apps/web/src/components/Layout/Layout';
import UsernameNav from 'apps/web/src/components/Layout/UsernameNav';

export default function BasenameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen flex min-h-screen flex-col">
      <UsernameNav />
      {children}
      <Footer />
      <CookieBanner companyName="Base" link="/cookie-policy" theme={cookieBannerTheme} />
    </div>
  );
}
