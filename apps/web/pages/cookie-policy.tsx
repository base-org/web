import { useState, useCallback } from 'react';
import { CookiePreferencesModal } from '@coinbase/cookie-banner';
import Head from 'next/head';
import Link from 'next/link';

export default function CookiePolicy() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsOpen(true), []);

  const handleCloseModal = useCallback(() => setIsOpen(false), []);

  const ogData = {
    title: 'Base | Cookie Policy',
    description: 'This Cookie Policy explains how Base uses cookies and similar technologies',
    url: 'https://base.org/cookie-policy',
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
          <h1 className="text-4xl font-bold">Base Cookie Policy</h1>
          <p className="mb-10">
            <strong>Last updated:</strong> 26 February 2024
          </p>
          <p>
            This Cookie Policy explains how Base (referred to here as{' '}
            <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong> and{' '}
            <strong>&quot;our&quot;</strong>) uses cookies and similar technologies when you visit{' '}
            <a href="https://base.org/" className="text-blue-500">
              base.org
            </a>{' '}
            (the <strong>&quot;Site&quot;</strong>) and/or when you explore and use Base through the
            Base protocol or any other applications, tools, and features we operate (collectively
            referred to as the <strong>&quot;Services&quot;</strong>). It explains what these
            technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          <p>
            In some cases, we may use cookies and similar technologies to collect personal
            information, or information that becomes personal information if we combine it with
            other information. In such cases, the{' '}
            <a href="https://docs.base.org/privacy-policy/" className="text-blue-500">
              Base Privacy Policy
            </a>{' '}
            will apply in addition to this Cookie Policy.
          </p>
          <h2 className="mt-8 text-2xl font-medium">1. What Are Cookies?</h2>
          <p>
            Browser cookies are text files with small pieces of data downloaded onto your computer
            or mobile device. Browser cookies and other similar technologies enable websites and
            apps to store information or facilitate access to information stored on your device to
            enable certain features and distinguish you from other visitors. These technologies are
            used by most website and app providers to let users navigate between pages efficiently,
            ensure security of the webpage or application, understand how their websites are used,
            remember user preferences and generally improve the user experience. More information on
            cookies and their use can be found at{' '}
            <a href="https://www.aboutcookies.org" className="text-blue-500">
              aboutcookies.org
            </a>{' '}
            or{' '}
            <a href="https://www.allaboutcookies.org" className="text-blue-500">
              allaboutcookies.org
            </a>
            .
          </p>
          <p>
            Cookies set by the website operator are called{' '}
            <strong>&quot;first party cookies&quot;</strong> and Cookies set by parties other than
            the website operator are called <strong>&quot;third party cookies&quot;</strong>. You
            should check the{' '}
            <Link href="/third-party-cookies" className="text-blue-500">
              third-party&apos;s website
            </Link>{' '}
            for more information on how they use cookies.
          </p>
          <h2 className="mt-8 text-2xl font-medium">2. What Do We Use Cookies For?</h2>
          <p>
            When you access our Site and Services, we, or companies we work with, may place cookies
            (collectively called <strong>&quot;cookies&quot;</strong> in this Cookie Policy) and
            similar technologies (such as web beacons, software development kits (
            <strong>&quot;SDKs&quot;</strong>), APIs, tags and local storage) on your computer or
            other device for the following purposes:
          </p>
          <h3 className="mt-4 text-lg font-medium">Strictly Necessary purposes</h3>
          <p>
            Strictly Necessary cookies are essential for our Services to function and therefore
            cannot be switched off. They are usually only set in response to actions made by you
            which amount to a request for services, such as setting your privacy preferences,
            logging in, or filling in forms. These also include cookies we may rely on for security
            purposes, such as to prevent unauthorised access attempts. You can set your browser to
            block or alert you about these cookies at any time, but some features of our Services
            may not work.
          </p>
          <h3 className="mt-4 text-lg font-medium">Performance purposes</h3>
          <p>
            We use these cookies to count visits and traffic sources so we can measure and improve
            the performance of our Services. These cookies help us to know which pages are the most
            and least popular and see how visitors move around the Site, and to resolve any errors
            that occur on the Services quickly to provide you with a better experience. For example,
            our first party base_device_id cookie is used to provide analytics on how our Site and
            Services perform. This cookie lasts for 3 months.
          </p>
          <h2 className="mt-8 text-2xl font-medium">
            3. How to Manage Cookies, Similar Technologies and Targeted Online Mobile Advertising
          </h2>
          <p>
            You have the right to decide whether to accept or reject cookies (except strictly
            necessary cookies). You can enable or disable categories of cookies by visiting our{' '}
            <button
              type="button"
              className="appearance-none text-blue-500"
              onClick={handleOpenModal}
            >
              Cookie Preference Manager
            </button>
            . This includes both first party and third party cookies. You can use the browser with
            which you are viewing this website to enable, disable or delete cookies. To do this,
            follow the instructions provided by your browser (usually located within the
            &quot;Help&quot;, &quot;Tools&quot; or &quot;Edit&quot; settings). However, please note,
            if you set your browser to disable cookies, you may not be able to access secure areas
            of our Services. Also, if you disable cookies, other parts of our Services may not
            function properly.
          </p>
          <p>
            There are also additional tools available to manage third party cookies. You can visit
            the DAA&apos;s opt-out portal available at{' '}
            <a href="http://optout.aboutads.info/" className="text-blue-500">
              optout.aboutads.info
            </a>
            , the DAA of Canada&apos;s opt-out portal available at{' '}
            <a href="https://youradchoices.ca/en/tools" className="text-blue-500">
              youradchoices.ca/en/tools
            </a>
            , or visit the NAI&apos;s opt-out portal available at{' '}
            <a href="http://optout.networkadvertising.org/?c=1" className="text-blue-500">
              optout.networkadvertising.org/?c=1
            </a>
            . Residents of the European Union may opt-out of online behavioural advertising served
            by the European Interactive Digital Advertising Alliance&apos;s participating member
            organizations by visiting{' '}
            <a href="https://www.youronlinechoices.eu/" className="text-blue-500">
              youronlinechoices.eu
            </a>{' '}
            or through your mobile device settings, where available and the DAA&apos;s AppChoices
            mobile application opt-out offering here:{' '}
            <a href="https://youradchoices.com/appchoices" className="text-blue-500">
              youradchoices.com/appchoices
            </a>
            .
          </p>
          <p>
            If you have any questions about our use of cookies or other technologies, please submit
            your request to privacy@base.org.
          </p>
          <h2 className="mt-8 text-2xl font-medium">4. Will This Cookie Policy Be Updated?</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect, for example, changes to
            the cookies we use or for other operational, legal or regulatory reasons. You can also
            revisit this page if you wish to keep yourself informed.
          </p>
        </section>
      </main>
      {isOpen && <CookiePreferencesModal isOpen={isOpen} onClose={handleCloseModal} />}
    </>
  );
}
