import Fieldset from 'apps/web/src/components/Fieldset';
import Input, { InputProps } from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import {
  SocialPlatform,
  socialPlatformHandleFunction,
  socialPlatformsNameForDisplay,
} from 'apps/web/src/utils/socialPlatforms';

import { useId } from 'react';

export type UsernameSocialHandleFieldProps = { socialPlatform: SocialPlatform } & InputProps;

export default function UsernameSocialHandleField({
  socialPlatform,
}: UsernameSocialHandleFieldProps) {
  const usernameSocialHandleFieldId = useId();
  const handleFunction = socialPlatformHandleFunction[socialPlatform];
  const handle = handleFunction({ handle: 'username' });
  return (
    <Fieldset inline>
      <Label htmlFor={usernameSocialHandleFieldId} className="w-full max-w-[6rem]">
        {socialPlatformsNameForDisplay[socialPlatform]}
      </Label>
      <Input
        id={usernameSocialHandleFieldId}
        placeholder={handle}
        className="flex-1 rounded-md border border-line/20 p-2 text-black"
      />
    </Fieldset>
  );
}
