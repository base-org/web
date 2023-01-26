import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Base</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-full z-0">
        <Image src="/home-bg.png" alt="home" fill={true} />
      </div>
    </div>
  );
}
