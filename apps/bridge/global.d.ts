declare module 'next/config' {
  type ConfigTypes = {
    publicRuntimeConfig: {
      chains: string;
      assets: string;
      l1ChainID: string;
      l1ExplorerURL: string;
      l1ExplorerApiUrl: string;
      l2ChainID: string;
      l2ExplorerURL: string;
      l2ExplorerApiURL: string;
      l1BridgeProxyAddress: `0x${string}`;
      l1OptimismPortalProxyAddress: `0x${string}`;
      l2L1MessagePasserAddress: `0x${string}`;
      L2StandardBridge: `0x${string}`;
      l2OutputOracleProxyAddress: `0x${string}`;
      marketingURL: string;
      docsURL: string;
      blogURL: string;
      twitterURL: string;
      githubURL: string;
      mainnetLaunchBlogPostURL: string;
      mainnetLaunchFlag: string;
      tosVersion: `0x${string}`;
      goerliBridgeURL: string;
      mainnetBridgeURL: string;
      mainnetGALaunchFlag: string;
      walletConnectProjectId: string;
      buildId: string;
      bugsnagApiKey: string;
      bugsnagNotifyUrl: string;
      bugsnagSessionsUrl: string;
      appStage: string;
      complianceApiURL: string;
    };
  };

  declare function getConfig(): ConfigTypes;

  export default getConfig;
}
