import Head from 'next/head';

export default function ThirdPartyCookies() {
  const ogData = {
    title: 'Base | Third Party Cookies',
    description: 'This page lists the companies that use cookies and other technologies.',
    url: 'https://base.org/third-party-cookies',
  };
  return (
    <>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>
      <main className="flex w-full flex-col items-center bg-white">
        <section className="flex w-full max-w-[1440px] flex-col gap-4 px-8 pb-10 pt-10 lg:pb-28 lg:pt-20">
          <h1 className="text-4xl font-bold">Third-Party Cookies</h1>
          <p className="mb-10">
            <strong>Last updated:</strong> 26 February 2024
          </p>
          <p className="text w-full lg:w-2/3">
            This page lists the companies that use cookies and other technologies. From time to
            time, we may change the companies we work with and will update this list.
          </p>
          <table className="w-full lg:w-2/3">
            <tr className="border-b-[1px] border-black bg-[#EFF0F3]">
              <td className="w-1/4 p-4 font-medium">Name</td>
              <td className="w-2/4 p-4 font-medium">Purpose</td>
              <td className="w-1/4 p-4 font-medium">Domain</td>
            </tr>
            <tr>
              <td className="w-1/4 p-4">__cf_bm</td>
              <td className="w-2/4 p-4">Used to prevent bot traffic</td>
              <td className="w-1/4 p-4">
                <a href="https://www.cloudflare.com/cookie-policy/" className="text-blue-500">
                  Cloudflare Cookie Policy
                </a>
              </td>
            </tr>
          </table>
        </section>
      </main>
    </>
  );
}
