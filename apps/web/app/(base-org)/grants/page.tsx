'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { Button } from 'apps/web/src/components/Button/Button';

type GrantApplicationData = {
  builderName: string;
  builderTwitter: string;
  builderFarcaster: string;
  builderEmail: string;
  projectName: string;
  projectUrl: string;
  projectTwitter: string;
  projectFarcaster: string;
  projectDemoLink: string;
  liveOnBase: boolean;
  reasoning: string;
};

const blankGrantApplication: GrantApplicationData = {
  builderName: 'Default Name',
  builderTwitter: '@default',
  builderFarcaster: '@default_fc',
  builderEmail: 'default@email.com',
  projectName: 'Default Project',
  projectUrl: 'default_project.xyz',
  projectTwitter: '@default-project',
  projectFarcaster: '@default-project-fc',
  projectDemoLink: 'demo.default_project.xyz',
  liveOnBase: false,
  reasoning: 'i want a grant',
};

const spreadsheetId = '1iI0enA0PoynuptKUkqFBPDH5dN4fLEDJI2ss9FWiTZo';
const reqUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
const sheetId = '0';

export default function GrantApplication() {
  const [grantApp, setGrantApp] = useState(blankGrantApplication);
  const [textRecordsLoading, setTextRecordsLoading] = useState(true);

  const { address } = useAccount();
  const { data: username } = useBaseEnsName({ address });
  const textRecords = useReadBaseEnsTextRecords({ address, username });

  const memoizedTextRecords = useMemo(
    () => ({
      twitter: textRecords.existingTextRecords['com.twitter'],
      farcaster: textRecords.existingTextRecords['xyz.farcaster'],
    }),
    [textRecords.existingTextRecords],
  );

  useEffect(() => {
    setGrantApp({
      ...grantApp,
      builderName: username,
      builderTwitter: textRecords.existingTextRecords['com.twitter'],
      builderFarcaster: textRecords.existingTextRecords['xyz.farcaster'],
    });
  }, [username, memoizedTextRecords]);

  useEffect(() => {
    if (!textRecords.existingTextRecordsIsLoading) {
      setTextRecordsLoading(false);
    }
  }, [textRecords.existingTextRecordsIsLoading]);

  const handleClick = useCallback(() => {
    appendToGSheet(sheetId, grantApp)
  }, [sheetId, grantApp]);

  if (textRecordsLoading) {
    return;
  }

  return (
    <AnalyticsProvider context="grants">
      <div className="pb-16 pt-48">
        <Container>
          <h1 className="text-4xl">Apply for a Base Builder Grant</h1>
          <ul>
            <li>Builder Name: {grantApp.builderName}</li>
            <li>Builder Twitter: {grantApp.builderTwitter}</li>
            <li>Builder Farcaster: {grantApp.builderFarcaster}</li>
            <li>Builder Email: {grantApp.builderEmail}</li>
            <li>Project Name: {grantApp.projectName}</li>
            <li>Project URL: {grantApp.projectUrl}</li>
            <li>Project Twitter: {grantApp.projectTwitter}</li>
            <li>Project Farcaster: {grantApp.projectFarcaster}</li>
            <li>Project Demo Link: {grantApp.projectDemoLink}</li>
            <li>Project Live on Base: {grantApp.liveOnBase ? 'true' : 'false'}</li>
            <li>Reasoning: {grantApp.reasoning}</li>
          </ul>
          <Button onClick={handleClick} className="mt-12">
            Submit
          </Button>
        </Container>
      </div>
    </AnalyticsProvider>
  );
}

const appendToGSheet = async (sheetId: string, app: GrantApplicationData) => {
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

  const accessToken =
    'ya29.a0AcM612zZXHAgnrClyhkaHTsMhDJj0pq7lgDwwnN42Osl2sSS3lXKoeK1m5pkZuY7TzhFDNB6iO2Kg4yiL9Vy8C1jP58_YkU4Ss_AnCVSatp6aSmJWZ85tWfEE8XBg-BDObxVPoNbM1L7AiGx3HFILJScW44aAa2jrEl14Dd0aCgYKAQoSARASFQHGX2MiKfOIS1XtKmc-n9UCvqVuSw0175';
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
    const data = await res.json();
    console.log({data})
  } catch (error) {
    console.error('Error:', error);
  }
};
