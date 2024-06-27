import Fieldset from 'apps/web/src/components/Fieldset';
import Hint from 'apps/web/src/components/Hint';
import Label from 'apps/web/src/components/Label';
import TextArea, { TextAreaProps } from 'apps/web/src/components/TextArea';
import { USERNAME_BIO_MAX_LENGTH } from 'apps/web/src/utils/usernames';
import { ChangeEvent, ReactNode, useCallback, useId, useState } from 'react';

export type UsernameBioFieldProps = {
  currentBio?: string;
  labelChildren?: ReactNode;
} & TextAreaProps;

export default function UsernameBioField({
  currentBio = '',
  labelChildren,
}: UsernameBioFieldProps) {
  const [bioLength, setBioLength] = useState<number>(currentBio.length);

  const onChangeBio = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length > USERNAME_BIO_MAX_LENGTH) {
      event.preventDefault();
    } else {
      setBioLength(value.length);
    }
  }, []);

  const usernameBioFieldId = useId();

  const bioCharactersRemaining = USERNAME_BIO_MAX_LENGTH - bioLength;

  return (
    <Fieldset>
      {labelChildren && <Label htmlFor={usernameBioFieldId}>{labelChildren}</Label>}
      <TextArea
        id={usernameBioFieldId}
        placeholder="Tell us about yourself"
        maxLength={USERNAME_BIO_MAX_LENGTH}
        onChange={onChangeBio}
      />
      <Hint>
        {String(bioCharactersRemaining)} {bioCharactersRemaining === 1 ? 'character' : 'characters'}{' '}
        remaining
      </Hint>
    </Fieldset>
  );
}
