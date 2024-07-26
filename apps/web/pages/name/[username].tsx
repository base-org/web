import { BaseName } from '@coinbase/onchainkit/identity';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';
import UsernameProfileProvider from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Layout, NavigationType } from 'apps/web/src/components/Layout/Layout';
import {
  openGraphImageHeight,
  openGraphImageType,
  openGraphImageWidth,
} from 'apps/web/src/utils/opengraphs';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { ReactElement } from 'react';

// Do not change this unless you know what you're doing (it'll break analytics)
const usernameProfileAnalyticContext = 'username_profile';

export function Username() {
  const params = useParams<{ username: BaseName }>();
  const profileUsername = params?.username;

  const ogData = {
    title: `Basenames | ${profileUsername}`,
    description: `${profileUsername}, a Basename`,
    image: `https://base.org/api/basenames/${profileUsername}/assets/coverImage.png`,
    url: `https://base.org/name/${profileUsername}`,
  };

  return (
    <>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />
        <meta key="og:image" property="og:image" content={ogData.image} />
        <meta key="og:image:secure_url" property="og:image:secure_url" content={ogData.image} />
        <meta key="og:image:type" property="og:image:type" content={openGraphImageType} />
        <meta
          key="og:image:width"
          property="og:image:width"
          content={openGraphImageWidth.toString()}
        />
        <meta
          key="og:image:height"
          property="og:image:height"
          content={openGraphImageHeight.toString()}
        />
        <meta key="og:image:alt" property="og:image:alt" content={ogData.description} />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>

      <AnalyticsProvider context={usernameProfileAnalyticContext}>
        <UsernameProfileProvider>
          <UsernameProfile />
        </UsernameProfileProvider>
      </AnalyticsProvider>
    </>
  );
}

Username.getLayout = function getLayout(page: ReactElement) {
  return <Layout navigationType={NavigationType.Username}>{page}</Layout>;
};

export default Username;
