import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import {
  textRecordsKeysForDisplay,
  textRecordsKeysPlaceholderForDisplay,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';

import { ChangeEvent, useCallback, useId } from 'react';

export type UsernameTextRecordInlineFieldProps = {
  textRecordKey: UsernameTextRecordKeys;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameTextRecordInlineField({
  textRecordKey,
  onChange,
  value,
  disabled = false,
}: UsernameTextRecordInlineFieldProps) {
  const usernameSocialHandleFieldId = useId();

  const onTextRecordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const textRecordValue = event.target.value;

      if (onChange) onChange(textRecordKey, textRecordValue);
    },
    [onChange, textRecordKey],
  );

  const inputType = textRecordKey === UsernameTextRecordKeys.Url ? 'url' : 'text';
  return (
    <Fieldset inline>
      <Label htmlFor={usernameSocialHandleFieldId} className="w-full max-w-[6rem] text-sm">
        {textRecordsKeysForDisplay[textRecordKey]}
      </Label>
      <Input
        id={usernameSocialHandleFieldId}
        placeholder={textRecordsKeysPlaceholderForDisplay[textRecordKey]}
        className="flex-1 rounded-md border border-gray-40/20 p-2 text-black"
        disabled={disabled}
        value={value}
        autoComplete="off"
        type={inputType}
        pattern="https?://.*"
        onChange={onTextRecordChange}
        data-1p-ignore
      />
    </Fieldset>
  );
}
