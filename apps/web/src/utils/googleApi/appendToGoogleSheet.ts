import { type GrantApplicationData } from 'apps/web/app/(base-org)/grants/page';
import { getAccessToken } from 'apps/web/src/utils/googleApi/googleApiOAuth2';

type AppendCellsResponseData = {
  spreadsheetId: string;
  replies: unknown[];
};

export async function appendGrantApplicationToGoogleSheet(
  app: GrantApplicationData,
  reqUrl: string,
  sheetId: string,
) {
  const reqBody = {
    requests: [
      {
        appendCells: {
          sheetId: sheetId,
          rows: [
            {
              values: [
                { userEnteredValue: { stringValue: app.builderName } },
                {
                  userEnteredValue: {
                    stringValue: app.builderEmail,
                  },
                },
                { userEnteredValue: { stringValue: app.builderTwitter } },
                {
                  userEnteredValue: {
                    stringValue: app.builderFarcaster,
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.projectName,
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.projectUrl,
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.projectTwitter,
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.projectFarcaster,
                  },
                },
                { userEnteredValue: { boolValue: app.liveOnBase } },
                {
                  userEnteredValue: {
                    stringValue: app.reasoning,
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.projectDemoLink,
                  },
                },
              ],
            },
          ],
          fields: '*',
        },
      },
    ],
  };

  const accessToken = await getAccessToken();
  const config = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(reqUrl, config);
    if (!res.ok) {
      throw new Error(`HTTP error. Status: ${res.status}`);
    }
    const data: AppendCellsResponseData = await res.json();
    return {
      spreadsheetId: data.spreadsheetId,
      success: true,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
    };
  }
}
