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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGrantApp((prevGrantApp) => ({
      ...prevGrantApp,
      [e.target.name]: e.target.value,
    }))
  }, [])

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
      <div className='my-6'>
        <div className='my-4'>
          <span className='pr-6'>Builder Name:</span>
          <input
            type="text"
            name="builderName"
            value={grantApp.builderName}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Builder Twitter:</span>
          <input
            type="text"
            name="builderTwitter"
            value={grantApp.builderTwitter}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Builder Farcaster:</span>
          <input
            type="text"
            name="builderFarcaster"
            value={grantApp.builderFarcaster}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Builder Email:</span>
          <input
            type="text"
            name="builderEmail"
            value={grantApp.builderEmail}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Project Name:</span>
          <input
            type="text"
            name="projectName"
            value={grantApp.projectName}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Project URL:</span>
          <input
            type="text"
            name="projectUrl"
            value={grantApp.projectUrl}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Project Twitter:</span>
          <input
            type="text"
            name="projectTwitter"
            value={grantApp.projectTwitter}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Project Farcaster:</span>
          <input
            type="text"
            name="projectFarcaster"
            value={grantApp.projectFarcaster}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Project Demo Link:</span>
          <input
            type="text"
            name="projectDemoLink"
            value={grantApp.projectDemoLink}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
        <div className='my-4'>
          <span className='pr-6'>Why does this project deserve a base Grant?</span>
          <input
            type="text"
            name="reasoning"
            value={grantApp.reasoning}
            onChange={handleChange}
            className='text-black w-full p-2'
          />
        </div>
      </div>
      <Button onClick={handleClick} className="mt-12">
        Submit
      </Button>
    </div>
  );
}
