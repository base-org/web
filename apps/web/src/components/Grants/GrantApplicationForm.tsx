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
    nomineeTwitter?: string;
    nomineeFarcaster?: string;
  };
  formSetter: Dispatch<SetStateAction<FormStates>>;
};

const blankGrantApplication: GrantApplicationData = {
  nomineeName: '',
  nomineeTwitter: '',
  nomineeFarcaster: '',
  nomineeEmail: '',
  projectName: '',
  projectUrl: '',
  projectDemoLink: '',
  reasoning: '',
  liveOnBase: false,
  acceptedLegalDisclaimer: false,
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
      nomineeName: basename ?? '',
      nomineeTwitter: basenameRecords.nomineeTwitter ?? '',
      nomineeFarcaster: basenameRecords.nomineeFarcaster ?? '',
    }));
  }, [basename, basenameRecords]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      setGrantApp((prevGrantApp) => ({
        ...prevGrantApp,
        [target.name]: target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value,
      }));
    },
    [],
  );

  const handleClick = useCallback(() => {
    const isValid = validateGrantApplication(grantApp);
    if (!isValid) {
      console.error('invalid form');
      return;
    }
    appendGrantApplicationToGoogleSheet(grantApp, reqUrl, sheetId)
      .then((res) => {
        if (res.success) {
          formSetter(FormStates.Submitted);
        }
      })
      .catch((err) => console.error(err));
  }, [grantApp, formSetter]);

  console.log({ grantApp });

  return (
    <div>
      <div className="my-6">
        <div className="my-4">
          <span className="pr-6">Nominee Basename:</span>
          <input
            type="text"
            name="nomineeName"
            value={grantApp.nomineeName}
            onChange={handleChange}
            className="w-full p-2 text-black"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Nominee Twitter:</span>
          <input
            type="text"
            name="nomineeTwitter"
            value={grantApp.nomineeTwitter}
            onChange={handleChange}
            className="w-full p-2 text-black"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Nominee Farcaster:</span>
          <input
            type="text"
            name="nomineeFarcaster"
            value={grantApp.nomineeFarcaster}
            onChange={handleChange}
            className="w-full p-2 text-black"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Nominee Email:</span>
          <input
            type="text"
            name="nomineeEmail"
            value={grantApp.nomineeEmail}
            onChange={handleChange}
            className="w-full p-2 text-black"
            placeholder="based@builder.xyz"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Project Name:</span>
          <input
            type="text"
            name="projectName"
            value={grantApp.projectName}
            onChange={handleChange}
            className="w-full p-2 text-black"
            placeholder="Based Project"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Project URL:</span>
          <input
            type="text"
            name="projectUrl"
            value={grantApp.projectUrl}
            onChange={handleChange}
            className="w-full p-2 text-black"
            placeholder="basedproject.xyz"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Please link a 1 minute demo of the project:</span>
          <input
            type="text"
            name="projectDemoLink"
            value={grantApp.projectDemoLink}
            onChange={handleChange}
            className="w-full p-2 text-black"
            placeholder="demo.basedproject.xyz"
          />
        </div>
        <div className="my-4">
          <span className="pr-6">Why does this project deserve a base Grant?</span>
          <textarea
            name="reasoning"
            value={grantApp.reasoning}
            onChange={handleChange}
            className="h-24 w-full p-2 text-black"
            placeholder="Limit response to 150 words"
          />
        </div>
        <div className="my-4 flex flex-row justify-start">
          <span className="pr-6">Is this project live on Base?</span>
          <input
            type="checkbox"
            name="liveOnBase"
            checked={grantApp.liveOnBase}
            onChange={handleChange}
            className="w-6 text-black"
          />
        </div>
        <div className="my-4 flex flex-col justify-start gap-2">
          <span className="pr-6">
            By clicking this box, you hereby authorize and license to Coinbase on a non-exclusive,
            worldwide, irrevocable, sublicensable, and royalty free basis during to reproduce,
            distribute, transmit, make available, perform, display, or otherwise use the submitted
            Multimedia Assets for any purpose, including any marketing or promotional activities
            related to Base or Coinbase. Any goodwill associated with use of trademarks submitted in
            your Multimedia Assets will inure to your benefit. You further acknowledge and represent
            that you have all IP rights in the Multimedia Assets, that the Multimedia Assets do not
            infringe the rights of any third party, and that you have the right to grant this
            license to Coinbase.
          </span>
          <div className="flex flex-row">
            <span className="pr-6">I confirm</span>
            <input
              type="checkbox"
              name="acceptedLegalDisclaimer"
              checked={grantApp.acceptedLegalDisclaimer}
              onChange={handleChange}
              className="w-6 text-black"
            />
          </div>
        </div>
      </div>
      <Button onClick={handleClick} className="mt-12">
        Submit
      </Button>
    </div>
  );
}

function validateGrantApplication(grantApp: GrantApplicationData) {
  for (const key in grantApp) {
    if (!isValidGrantApplicationKey(key)) {
      return false;
    }
    if (key === 'nomineeEmail') {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(grantApp[key])) {
        return false;
      }
    }
    if (!grantApp[key]) {
      return false;
    }
  }

  return true;
}

function isValidGrantApplicationKey(key: string): key is keyof GrantApplicationData {
  return key in blankGrantApplication;
}
