import {
  openGraphImageHeight,
  openGraphImageType,
  openGraphImageWidth,
} from 'apps/web/src/utils/opengraphs';
import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

export function Username({ domain }: { domain: string }) {
  const router = useRouter();
  const username = router.query.username || 'yourname';
  const formattedUsername = formatBaseEthDomain(username.toString());
  const ogImageUrl = `${domain}/api/og/names/${username}`;

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
      <p>{formattedUsername}</p>
    </>
  );
}

Username.getInitialProps = async ({ req }: NextPageContext) => {
  const domain = req?.headers.host || '';
  return { domain };
};

export default Username;
