import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import Button from 'apps/web/src/components/base-org/Button';
import appendGrantApplicationToGoogleSheet from 'apps/web/src/utils/googleApi/appendToGoogleSheet';
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

type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

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
  const isFormValid = useMemo(() => validateGrantApplication(grantApp), [grantApp]);

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
        [target.name]:
          target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value,
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

  return (
    <div>
      <div className="my-6">
        <FormField
          fieldPrompt="Nominee Basename"
          fieldName="nomineeName"
          fieldPlaceholder="basedbuilder.base.eth"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="Nominee Twitter"
          fieldName="nomineeTwitter"
          fieldPlaceholder="@based_builder_twitter"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="Nominee Farcaster"
          fieldName="nomineeFarcaster"
          fieldPlaceholder="@based_builder_farcaster"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="Nominee Email"
          fieldName="nomineeEmail"
          fieldPlaceholder="based.builder@basedproject.xyz"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="Project Name"
          fieldName="projectName"
          fieldPlaceholder="Based Project"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="Project URL"
          fieldName="projectUrl"
          fieldPlaceholder="basedproject.xyz"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="Please link a 1 minute demo of the project:"
          fieldName="projectDemoLink"
          fieldPlaceholder="basedproject.xyz/demo"
          application={grantApp}
          changeHandler={handleChange}
        />
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
        <FormField
          fieldPrompt="By clicking this box, you confirm that this project is currently live on Base."
          fieldName="liveOnBase"
          fieldType="checkbox"
          application={grantApp}
          changeHandler={handleChange}
        />
        <FormField
          fieldPrompt="By clicking this box, you hereby authorize and license to Coinbase on a non-exclusive,
            worldwide, irrevocable, sublicensable, and royalty free basis during to reproduce,
            distribute, transmit, make available, perform, display, or otherwise use the submitted
            Multimedia Assets for any purpose, including any marketing or promotional activities
            related to Base or Coinbase. Any goodwill associated with use of trademarks submitted in
            your Multimedia Assets will inure to your benefit. You further acknowledge and represent
            that you have all IP rights in the Multimedia Assets, that the Multimedia Assets do not
            infringe the rights of any third party, and that you have the right to grant this
            license to Coinbase."
          fieldName="acceptedLegalDisclaimer"
          fieldType="checkbox"
          application={grantApp}
          changeHandler={handleChange}
        />
      </div>
      <Button onClick={handleClick} className="mt-12" disabled={!isFormValid}>
        Submit
      </Button>
    </div>
  );
}

function FormField({
  fieldType = 'text',
  fieldPrompt,
  fieldName,
  fieldPlaceholder,
  application,
  changeHandler,
}: {
  fieldType?: 'text' | 'checkbox';
  fieldPrompt: string;
  fieldName: keyof GrantApplicationData;
  fieldPlaceholder?: string;
  application: GrantApplicationData;
  changeHandler: InputChangeHandler;
}) {
  const [error, setError] = useState(false);

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const isValid = validateFormField(e.target.name, application);
      if (!isValid) {
        setError(true);
      } else {
        setError(false);
      }
    },
    [application],
  );

  if (fieldType === 'text') {
    return (
      <div className="my-4">
        <div>
          <span className="pr-6">{fieldPrompt}:</span>
          <span className={classNames('text-red-50', { hidden: !error })}>
            * This field is required.
          </span>
        </div>
        <input
          type={fieldType}
          name={fieldName}
          value={application[fieldName] as string}
          placeholder={fieldPlaceholder}
          onChange={changeHandler}
          onBlur={handleBlur}
          className={classNames('w-full p-2 text-black', {
            'border-2 border-red-60': error,
          })}
        />
      </div>
    );
  }

  return (
    <div className="my-4 flex flex-col justify-start gap-2">
      <span className="pr-6">{fieldPrompt}</span>
      <div className="flex flex-row">
        <span className="pr-6">I confirm</span>
        <input
          type={fieldType}
          name={fieldName}
          checked={application[fieldName] as boolean}
          onChange={changeHandler}
          onBlur={handleBlur}
          className="w-6 text-black"
        />
        <span className={classNames('text-red-50', { hidden: !error })}>
          * This field is required.
        </span>
      </div>
    </div>
  );
}

function validateGrantApplication(grantApp: GrantApplicationData) {
  for (const key in grantApp) {
    const isValid = validateFormField(key, grantApp);
    if (!isValid) {
      return false;
    }
  }

  return true;
}

function validateFormField(key: string, grantApp: GrantApplicationData) {
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
  return true;
}

function isValidGrantApplicationKey(key: string): key is keyof GrantApplicationData {
  return key in blankGrantApplication;
}
