export async function discoverAccountRegion(): Promise<{ account: string; region: string }> {
  let account = process.env.CONFIG_SERVICE_ACCOUNT ?? '';
  let region = process.env.CONFIG_SERVICE_REGION ?? 'us-east-1';

  return { account, region };
}
