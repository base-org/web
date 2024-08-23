import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import logEvent, {
  ActionType,
  ComponentType,
  AnalyticsEventImportance,
} from 'libs/base-ui/utils/logEvent';
import { inputSearchValueFrame } from 'apps/web/pages/api/basenames/frame/frameResponses';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Search Screen — Method (${req.method}) Not Allowed` });
  }
  logEvent(
    'claim_frame_start',
    {
      action: ActionType.search,
      componentType: ComponentType.text_input,
      context: 'frame',
    },
    AnalyticsEventImportance.high,
  );

  try {
    return res.status(200).setHeader('Content-Type', 'text/html').send(inputSearchValueFrame);
  } catch (error) {
    console.error('Could not process request:', error);
    logEvent(
      'claim_frame_error_input_search',
      {
        action: ActionType.process,
        context: 'frame',
      },
      AnalyticsEventImportance.high,
    );
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
