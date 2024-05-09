import Search from 'apps/web/src/components/Usernames/Search';
import Head from 'next/head';

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Base | Usernames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <main className="flex h-[800px] w-full flex-col items-center bg-black">
        <header className="mt-[-96px] h-[140px] w-full bg-black 2xl:grid 2xl:grid-cols-[1fr_1536px_1fr]"></header>
        <Search />
      </main>
    </div>
  );
}
