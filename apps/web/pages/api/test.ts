import { getSecret } from 'apps/web/src/utils/config/config';
import { NextApiRequest, NextApiResponse } from 'next';

process.env.CONFIG_SERVICE_ACCOUNT = '420699761259'; // web3-shared-dev for demo purposes
process.env.CONFIG_SERVICE_REGION = 'us-east-1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sec = await getSecret('test_secret');
    console.log(sec);
    return res.status(200).json({ hello: sec });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
