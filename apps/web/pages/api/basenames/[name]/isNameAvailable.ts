import { NextApiRequest, NextApiResponse } from 'apps/web/node_modules/next/dist/shared/lib/utils';
import { getBasenameAvailable } from 'apps/web/src/utils/usernames';
import { CHAIN } from 'apps/web/pages/api/basenames/frame/constants';

export type IsNameAvailableResponse = {
  nameIsAvailable: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;
  try {
    const isNameAvailableResponse = await getBasenameAvailable(String(name), CHAIN);
    const responseData: IsNameAvailableResponse = {
      nameIsAvailable: isNameAvailableResponse,
    };
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Could not read name availability:', error);
    return res.status(500).json({ error: 'Could not determine name availability' });
  }
}
