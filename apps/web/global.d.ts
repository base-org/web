declare module 'next/config' {
  type ConfigTypes = {
    serverRuntimeConfig: {
      alchemyApiKey: string;
      alchemyApiUrl: string;
    };
    publicRuntimeConfig: {
      nodeEnv: string;
      docsUrl: string;
      bridgeUrl: string;
      greenhouseApiUrl: string;
      mainnetLaunchBlogPostURL: string;
      mainnetLaunchFlag: string;
      ecosystemLaunchFlag: string;
    };
    i18n: {
      locales: string[];
      defaultLocale: string;
    };
  };

  declare function getConfig(): ConfigTypes;

  export default getConfig;
}

declare module '*.webm' {
  const src: string;
  export default src;
}
