import { type GrantApplicationData } from 'apps/web/src/components/Grants/grantApplicationTypes';
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
                {
                  userEnteredValue: {
                    stringValue: new Date().toISOString(),
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.nomineeName,
                  },
                },
                {
                  userEnteredValue: {
                    stringValue: app.nomineeEmail,
                  },
                },
                { userEnteredValue: { stringValue: app.nomineeTwitter } },
                {
                  userEnteredValue: {
                    stringValue: app.nomineeFarcaster,
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
                { userEnteredValue: { boolValue: app.liveOnBase } },
                { userEnteredValue: { boolValue: app.acceptedLegalDisclaimer } },
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
    const data = (await res.json()) as AppendCellsResponseData;
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
