import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import Head from 'next/head';
import { useRouter } from 'next/router';
export default function Username() {
  const router = useRouter();
  const username = router.query.username || 'yourname';

  return (
    <>
      <Head>
        <title>Base | Usernames | {formatBaseEthDomain(username)}</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <p>{formatBaseEthDomain(username)}</p>
    </>
  );
}
