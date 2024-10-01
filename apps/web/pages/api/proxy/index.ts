import type { NextApiRequest, NextApiResponse } from 'next';
import { isAddress } from 'viem';

// Make sure the environment variables are properly set
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const address = query.address as string;
  const apiType = query.apiType as string;
  const body = req.body as Record<string, unknown>; // Explicitly type the body

  if (!address || !isAddress(address)) {
    return res.status(400).json({ error: 'Missing or invalid address parameter' });
  }

  let apiUrl: string;

  try {
    switch (apiType) {
      case 'etherscan':
        apiUrl = `https://api.etherscan.io/api?address=${address}&apikey=${ETHERSCAN_API_KEY}&module=account&action=txlist`;
        break;
      case 'base-sepolia':
        apiUrl = `https://api-sepolia.basescan.org/api?address=${address}&apikey=${BASESCAN_API_KEY}&module=account&action=txlistinternal`;
        break;
      case 'basescan':
        apiUrl = `https://api.basescan.org/api?address=${address}&apikey=${BASESCAN_API_KEY}&module=account&action=txlist`;
        break;
      case 'basescan-internal':
        apiUrl = `https://api.basescan.org/api?address=${address}&apikey=${BASESCAN_API_KEY}&module=account&action=txlistinternal`;
        break;
      case 'talent':
        apiUrl = `https://api.talentprotocol.com/api/v2/passports/${address}`;
        break;
      default:
        return res.status(400).json({ error: 'Invalid apiType parameter' });
    }

    // Fetch from the external API using the constructed URL
    const externalResponse = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': TALENT_PROTOCOL_API_KEY ?? '',
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    // Handle the content type of the response
    const contentType = externalResponse.headers.get('content-type');
    let responseData;
    if (contentType?.includes('application/json')) {
      responseData = await externalResponse.json();
    } else {
      responseData = await externalResponse.text();
    }

    if (externalResponse.ok) {
      return res.status(200).json({ data: responseData });
    } else {
      return res.status(externalResponse.status).json({ error: responseData });
    }
  } catch (error) {
    console.error('Error in API proxy:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
