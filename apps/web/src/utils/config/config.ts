import { initClient } from '@cbhq/config-service-node';

export async function getSecret(configParam: string): Promise<string> {
  const client = await initClient({
    accountId: process.env.AWS_CONFIG_ACCOUNT_ID,
  });
  return client.secretText(process.env.CONFIG_PROJECT as string, configParam);
}
