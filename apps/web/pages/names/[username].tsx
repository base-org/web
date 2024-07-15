import AnalyticsProvider from 'apps/web/contexts/Analytics';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';
import UsernameProfileProvider from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Layout, NavigationType } from 'apps/web/src/components/Layout/Layout';
import {
  openGraphImageHeight,
  openGraphImageType,
  openGraphImageWidth,
} from 'apps/web/src/utils/opengraphs';
import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { ReactElement } from 'react';

// Do not change this unless you know what you're doing (it'll break analytics)
const usernameProfileAnalyticContext = 'username_profile';

export function Username({ domain }: { domain: string }) {
  const { username: profileUsername } = useParams<{ username: string }>();
  const ogImageUrl = `${domain}/api/og/names/${profileUsername}`;
  const formattedUsername = formatBaseEthDomain(profileUsername.toString());
  return (
    <>
      <Head>
        <title>Base | Usernames | {formattedUsername}</title>
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content={openGraphImageType} />
        <meta property="og:image:width" content={openGraphImageWidth.toString()} />
        <meta property="og:image:height" content={openGraphImageHeight.toString()} />
        <meta property="og:image:alt" content={`Base profile `} />
      </Head>
      <AnalyticsProvider context={usernameProfileAnalyticContext}>
        <UsernameProfileProvider>
          <UsernameProfile />
        </UsernameProfileProvider>
      </AnalyticsProvider>
    </>
  );
}

Username.getInitialProps = async ({ req }: NextPageContext) => {
  const domain = req?.headers.host ?? '';
  return { domain };
};

Username.getLayout = function getLayout(page: ReactElement) {
  return <Layout navigationType={NavigationType.Username}>{page}</Layout>;
};

export default Username;
