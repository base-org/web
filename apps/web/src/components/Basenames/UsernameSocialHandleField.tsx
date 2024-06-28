import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import { useBaseEnsName } from 'apps/web/src/utils/hooks/useBaseEnsName';
import {
  SocialPlatform,
  socialPlatformHandleFunction,
  socialPlatformsNameForDisplay,
} from 'apps/web/src/utils/socialPlatforms';
import {
  UsernameTextRecordKeys,
  socialPlatformToTextRecordKeys,
} from 'apps/web/src/utils/usernames';

import { ChangeEvent, useCallback, useEffect, useId, useState } from 'react';
import { baseSepolia } from 'viem/chains';
import { useAccount, useEnsText } from 'wagmi';

export type UsernameSocialHandleFieldProps = {
  socialPlatform: SocialPlatform;
  onChange?: (key: UsernameTextRecordKeys, value: string) => void;
};

export default function UsernameSocialHandleField({
  socialPlatform,
  onChange,
}: UsernameSocialHandleFieldProps) {
  const usernameSocialHandleFieldId = useId();
  const handleFunction = socialPlatformHandleFunction[socialPlatform];
  const handle = handleFunction({ handle: 'username' });
  const [originalSocialHandle, setOriginalSocialHandle] = useState<string>('');
  const [socialHandle, setSocialHandle] = useState<string>(originalSocialHandle);
  const textRecordKey = socialPlatformToTextRecordKeys[socialPlatform];

  const { address } = useAccount();
  const fakeAddress = address ?? '0x63e216601B3588a5B54d9f961cFFc4af916a63c7';

  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address: fakeAddress,
    chainId: baseSepolia.id,
  });

  const hasEnsName = !baseEnsNameIsLoading && typeof baseEnsName === 'string';

  // GET social handle
  const { data: baseEnsSocialHandle, isLoading: baseEnsSocialHandleIsLoading } = useEnsText({
    name: baseEnsName as string | undefined,
    key: textRecordKey,
    chainId: baseSepolia.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[baseSepolia.id],
    query: {
      enabled: hasEnsName,
    },
  });

  useEffect(() => {
    if (baseEnsSocialHandle && baseEnsSocialHandle.length > 0) {
      setOriginalSocialHandle(baseEnsSocialHandle);
    }
  }, [baseEnsSocialHandle]);

  const onChangeSocialHandle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSocialHandle(value);
      if (onChange) onChange(textRecordKey, value);
    },
    [onChange, textRecordKey],
  );

  const inputDisabled = baseEnsNameIsLoading || baseEnsSocialHandleIsLoading;

  return (
    <Fieldset inline>
      <Label htmlFor={usernameSocialHandleFieldId} className="w-full max-w-[6rem]">
        {socialPlatformsNameForDisplay[socialPlatform]}
      </Label>
      <Input
        id={usernameSocialHandleFieldId}
        placeholder={handle}
        className="flex-1 rounded-md border border-line/20 p-2 text-black"
        disabled={inputDisabled}
        value={socialHandle}
        autoComplete="off"
        type="text"
        onChange={onChangeSocialHandle}
        data-1p-ignore
      />
    </Fieldset>
  );
}
