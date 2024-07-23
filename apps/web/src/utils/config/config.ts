/*let initClient: unknown;

const loadInitClient = async () => {
  try {
    const configService = require('@cbhq/config-service-node');
    initClient = configService.initClient;
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      // Handle module not found error
      console.warn('Module not found');
      initClient = null; // Ensure initClient is set to null
    } else {
      throw err;
    }
  }
};
*/
import { initClient } from './config-service-node';

export async function getSecret(configParam: string): Promise<string> {
  const client = await initClient({
    accountId: process.env.AWS_CONFIG_ACCOUNT_ID,
  });

  if (!client || typeof client.secretText !== 'function') {
    // Handle the case where the client is null or secretText is not a function
    throw new Error('SecretText method is not available on the client');
  }

  return client.secretText(process.env.CONFIG_PROJECT as string, configParam);
}
