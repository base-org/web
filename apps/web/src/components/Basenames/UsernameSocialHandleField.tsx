import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import Fieldset from 'apps/web/src/components/Fieldset';
import Input, { InputProps } from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import { useBaseEnsName } from 'apps/web/src/utils/hooks/useBaseEnsName';
import {
  SocialPlatform,
  socialPlatformHandleFunction,
  socialPlatformsNameForDisplay,
} from 'apps/web/src/utils/socialPlatforms';
import { usernameTextRecordsKeys } from 'apps/web/src/utils/usernames';

import { ChangeEvent, useCallback, useEffect, useId, useState } from 'react';
import { baseSepolia } from 'viem/chains';
import { useEnsText } from 'wagmi';

export type UsernameSocialHandleFieldProps = { socialPlatform: SocialPlatform } & InputProps;

export default function UsernameSocialHandleField({
  socialPlatform,
}: UsernameSocialHandleFieldProps) {
  const usernameSocialHandleFieldId = useId();
  const handleFunction = socialPlatformHandleFunction[socialPlatform];
  const handle = handleFunction({ handle: 'username' });
  const [originalSocialHandle, setOriginalSocialHandle] = useState<string>('');
  const [socialHandle, setSocialHandle] = useState<string>(originalSocialHandle);

  // const { address } = useAccount();
  const address = '0x63e216601B3588a5B54d9f961cFFc4af916a63c7';

  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address: address,
    chainId: baseSepolia.id,
  });

  const hasEnsName = !baseEnsNameIsLoading && typeof baseEnsName === 'string';

  const { data: baseEnsSocialHandle, isLoading: baseEnsSocialHandleIsLoading } = useEnsText({
    name: baseEnsName as string | undefined,
    key: usernameTextRecordsKeys[socialPlatform],
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

  const onChangeSocialHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSocialHandle(value);
  }, []);

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
        onChange={onChangeSocialHandle}
      />
    </Fieldset>
  );
}
