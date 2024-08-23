import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import logEvent, {
  ActionType,
  ComponentType,
  AnalyticsEventImportance,
} from 'libs/base-ui/utils/logEvent';
import { formatDefaultUsername, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import type { IsNameAvailableResponse } from 'apps/web/pages/api/basenames/[name]/isNameAvailable';
import {
  retryInputSearchValueFrame,
  setYearsFrame,
} from 'apps/web/pages/api/basenames/frame/frameResponses';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Set Years Screen — Method (${req.method}) Not Allowed` });
  }
  logEvent(
    'claim_frame_name_search_start',
    {
      action: ActionType.search,
      componentType: ComponentType.text_input,
      context: 'frame',
    },
    AnalyticsEventImportance.high,
  );

  try {
    const body = req.body as FrameRequest;
    const { untrustedData } = body;
    const targetName: string = encodeURIComponent(untrustedData.inputText);

    const { valid, message } = validateEnsDomainName(targetName);
    if (!valid) {
      logEvent(
        'claim_frame_name_search_invalid',
        {
          action: ActionType.process,
          context: 'frame',
        },
        AnalyticsEventImportance.high,
      );
      return res
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .send(retryInputSearchValueFrame(message));
    }

    const isNameAvailableResponse = await fetch(
      `${DOMAIN}/api/basenames/${targetName}/isNameAvailable`,
    );
    const isNameAvailableResponseData = await isNameAvailableResponse.json();
    const { nameIsAvailable } = isNameAvailableResponseData as IsNameAvailableResponse;
    if (!nameIsAvailable) {
      logEvent(
        'claim_frame_name_search_unavailable',
        {
          action: ActionType.process,
          context: 'frame',
        },
        AnalyticsEventImportance.high,
      );
      return res
        .status(200)
        .setHeader('Content-Type', 'text/html')
        .send(retryInputSearchValueFrame('Name unavailable'));
    }

    const formattedTargetName = await formatDefaultUsername(targetName);
    logEvent(
      'claim_frame_name_search_success',
      {
        action: ActionType.process,
        context: 'frame',
      },
      AnalyticsEventImportance.high,
    );
    return res
      .status(200)
      .setHeader('Content-Type', 'text/html')
      .send(setYearsFrame(targetName, formattedTargetName));
  } catch (error) {
    logEvent(
      'claim_frame_error_validate_search_set_years',
      {
        action: ActionType.process,
        context: 'frame',
      },
      AnalyticsEventImportance.high,
    );
    return res.status(500).json({ error }); // TODO: figure out error state for the frame BAPP-452
  }
}
