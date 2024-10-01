import type { NextApiRequest, NextApiResponse } from 'next';

// Make sure the environment variables are properly set
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY;
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

// Utility function to serialize query parameters
const buildQueryParams = (params: Record<string, string | string[] | undefined>): string => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((val) => queryParams.append(key, val));
      } else {
        queryParams.set(key, value);
      }
    }
  });
  return queryParams.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const address = query.address as string;
  const apiType = query.apiType as string;
  const body = req.body as Record<string, unknown>; // Explicitly type the body

  if (!address) {
    return res.status(400).json({ error: 'Missing or invalid address parameter' });
  }

  let apiUrl: string;

  try {
    // Build the base query string from the client request's query parameters
    const queryParams = buildQueryParams({ ...query, apikey: undefined }); // Exclude the API key from the query

    // Construct API URL based on `apiType`
    switch (apiType) {
      case 'etherscan':
        apiUrl = `https://api.etherscan.io/api?${queryParams}&apikey=${ETHERSCAN_API_KEY}`;
        break;
      case 'basescan':
        apiUrl = `https://api.basescan.org/api?${queryParams}&apikey=${BASESCAN_API_KEY}`;
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
