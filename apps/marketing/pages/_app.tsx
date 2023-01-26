import './global.css';

import { AppProps } from 'next/app';
import { Layout } from '../src/components/Layout/Layout';

export default function StaticApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
