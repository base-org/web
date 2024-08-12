import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Nav from 'apps/web/src/components/Layout/Nav/Nav';

const HomepageModalDynamic = dynamic(
  async () => import('apps/web/src/components/Basenames/HomepageModal'),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base`,
  description:
    'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.',
  openGraph: {
    type: 'website',
    title: `Base`,
    description:
      'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.',
    url: `/`,
    images: ['https://base.org/images/base-open-graph.png'],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

export default async function BaseOrgLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen flex min-h-screen flex-col">
      <Nav />
      <HomepageModalDynamic />
      {children}
    </div>
  );
}
