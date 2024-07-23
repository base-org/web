import { discoverAccountRegion } from './aws/utils';
import Client from './client';
import { ConfigClientOptions } from './types';
export * from './types';
export * from './client';

export async function initClient(options?: Partial<ConfigClientOptions>): Promise<Client> {
  const { account, region } = await discoverAccountRegion();
  const client = new Client({ accountId: account, region, ...options });
  console.log('Intialized config client');
  console.log('config client account id ' + client.accountId);
  console.log('config client region ' + client.region);

  return client;
}
