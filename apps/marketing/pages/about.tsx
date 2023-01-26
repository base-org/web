import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Base</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-full z-0 bg-black"></div>
    </div>
  );
}
