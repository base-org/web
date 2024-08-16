import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';

import {
  UsernameTextRecordKeys,
  textRecordsKeysForDisplay,
  textRecordsKeysPlaceholderForDisplay,
} from 'apps/web/src/utils/usernames';
import { ChangeEvent, ReactNode, useCallback, useEffect, useId, useState } from 'react';

export type UsernameCastsFieldProps = {
  labelChildren?: ReactNode;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameCastsField({
  labelChildren = textRecordsKeysForDisplay[UsernameTextRecordKeys.Casts],
  onChange,
  value,
  disabled = false,
}: UsernameCastsFieldProps) {
  const [casts, setCastsUrls] = useState<string[]>(value.split(',').filter((keyword) => !!keyword));

  useEffect(() => {
    onChange(UsernameTextRecordKeys.Casts, casts.join(','));
  }, [casts, onChange]);

  useEffect(() => {
    setCastsUrls(value.split(',').filter((keyword) => !!keyword));
  }, [value]);

  const UsernameCastsFieldId = useId();

  const onChangeCast = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCastsUrls([event.target.value]);
  }, []);

  return (
    <Fieldset className="w-full">
      {labelChildren && <Label htmlFor={UsernameCastsFieldId}>{labelChildren}</Label>}
      {Array.from(Array(4).keys()).map((_value, index) => (
        <Input
          key={`cast_frame_${_value}`}
          id={UsernameCastsFieldId}
          placeholder={textRecordsKeysPlaceholderForDisplay[UsernameTextRecordKeys.Casts]}
          onChange={onChangeCast}
          disabled={disabled}
          className="rounded-md border border-gray-40/20 p-2 text-black"
          value={casts[index]}
        />
      ))}
    </Fieldset>
  );
}
