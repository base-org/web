import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Button from 'apps/web/src/components/base-org/Button';
import { appendGrantApplicationToGoogleSheet } from 'apps/web/src/utils/googleApi/appendToGoogleSheet';
import {
  FormStates,
  type GrantApplicationData,
} from 'apps/web/src/components/Grants/grantApplicationTypes';

type GrantApplictionFormProps = {
  basename: string;
  basenameRecords: {
    twitter?: string;
    farcaster?: string;
  };
  formSetter: Dispatch<SetStateAction<FormStates>>;
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

export default function GrantApplicationForm({
  basename,
  basenameRecords,
  formSetter,
}: GrantApplictionFormProps) {
  const [grantApp, setGrantApp] = useState(blankGrantApplication);

  useEffect(() => {
    setGrantApp((prevGrantApp) => ({
      ...prevGrantApp,
      builderName: basename ?? '',
      builderTwitter: basenameRecords.twitter ?? '',
      builderFarcaster: basenameRecords.farcaster ?? '',
    }));
  }, [basename, basenameRecords]);

  const handleClick = useCallback(() => {
    appendGrantApplicationToGoogleSheet(grantApp, reqUrl, sheetId)
      .then((res) => {
        if (res.success) {
          formSetter(FormStates.Submitted);
        }
      })
      .catch((err) => console.log(err));
  }, [grantApp, formSetter]);

  return (
    <div>
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
    </div>
  );
}
