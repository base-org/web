import './global.css';

import { MotionConfig } from 'framer-motion';
import App, { AppContext, AppProps } from 'next/app';

import { Layout } from '../src/components/Layout/Layout';

/* Adding this to force NextJS to render the app on the server at runtime instead of statically
which allows us to use ENV vars in the way we expect (Codeflow does not insert ENV vars at Dockerfile build time, so statically rendered pages don't have access) */
export async function getInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);
  return appProps;
}

export default function StaticApp({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MotionConfig>
  );
}

StaticApp.getInitialProps = getInitialProps;
