import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import Fieldset from 'apps/web/src/components/Fieldset';
import Hint from 'apps/web/src/components/Hint';
import Label from 'apps/web/src/components/Label';
import TextArea from 'apps/web/src/components/TextArea';
import { useBaseEnsName } from 'apps/web/src/hooks/useBaseEnsName';
import {
  USERNAME_DESCRIPTION_MAX_LENGTH,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import { ChangeEvent, ReactNode, useCallback, useEffect, useId, useState } from 'react';
import { baseSepolia } from 'viem/chains';
import { useAccount, useEnsText } from 'wagmi';

export type UsernameDescriptionFieldProps = {
  labelChildren?: ReactNode;
  onChange?: (key: UsernameTextRecordKeys, value: string) => void;
};

export default function UsernameDescriptionField({
  labelChildren,
  onChange,
}: UsernameDescriptionFieldProps) {
  const [originalDescription, setOriginalDescription] = useState<string>('');
  const [description, setDescription] = useState<string>(originalDescription);
  const descriptionLength = description.length;

  const { address } = useAccount();
  const fakeAddress = address ?? '0x63e216601B3588a5B54d9f961cFFc4af916a63c7';

  // Get ENS name
  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address: fakeAddress,
    chainId: baseSepolia.id,
  });

  const hasEnsName = !baseEnsNameIsLoading && typeof baseEnsName === 'string';

  // GET description
  const { data: baseEnsDescription, isLoading: baseEnsDescriptionIsLoading } = useEnsText({
    name: baseEnsName as string | undefined,
    key: UsernameTextRecordKeys.Description,
    chainId: baseSepolia.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[baseSepolia.id],
    query: {
      enabled: hasEnsName,
    },
  });

  const onChangeDescription = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      if (value.length > USERNAME_DESCRIPTION_MAX_LENGTH) {
        event.preventDefault();
      } else {
        setDescription(value);
        if (onChange) onChange(UsernameTextRecordKeys.Description, value);
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (baseEnsDescription && baseEnsDescription.length > 0) {
      setOriginalDescription(baseEnsDescription);
    }
  }, [baseEnsDescription]);

  const usernameDescriptionFieldId = useId();
  const descriptionCharactersRemaining = USERNAME_DESCRIPTION_MAX_LENGTH - descriptionLength;
  const textAreaDisabled = baseEnsNameIsLoading || baseEnsDescriptionIsLoading;

  return (
    <Fieldset>
      {labelChildren && <Label htmlFor={usernameDescriptionFieldId}>{labelChildren}</Label>}
      <TextArea
        id={usernameDescriptionFieldId}
        placeholder="Tell us about yourself"
        maxLength={USERNAME_DESCRIPTION_MAX_LENGTH}
        onChange={onChangeDescription}
        disabled={textAreaDisabled}
        value={description}
      />
      <Hint>
        {String(descriptionCharactersRemaining)}{' '}
        {descriptionCharactersRemaining === 1 ? 'character' : 'characters'} remaining
      </Hint>
    </Fieldset>
  );
}
