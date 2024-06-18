import { cdpGet } from 'apps/web/src/cdp/utils';
import { ethers } from 'ethers';

export type LinkedAddresses = {
  idemKey: string;
  linkedAddresses: string[];
};
type ErrorResponse = {
  code: number;
  data: LinkedAddresses;
};

export async function getLinkedAddresses(address: string): Promise<LinkedAddresses> {
  if (ethers.utils.isAddress(address)) {
    throw new Error('valid address is required');
  }
  try {
    const response = await cdpGet(`verifications/v1/recipients/${address}/linked-addresses`, true);

    if (!response.ok) {
      if (response.status === 500) {
        const res = (await response.json()) as ErrorResponse;
        if (res.code === 13) {
          throw new Error('no user found');
        }
      }
      throw new Error(`Error: ${response.status}`);
    }
    return (await response.json()) as LinkedAddresses;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
