import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import {
  SocialMediaShareParams,
  SocialPlatform,
  socialPlatformHandle,
  socialPlatformIconName,
  socialPlatformShareLinkFunction,
} from 'apps/web/src/utils/socialPlatforms';
import { ActionType } from 'libs/base-ui/utils/logEvent';

import { useCallback } from 'react';

export const socialPlatformsEnabled = [SocialPlatform.Farcaster, SocialPlatform.Twitter];

function SocialPlatformButton({
  socialPlatform,
  openPopup,
}: {
  socialPlatform: SocialPlatform;
  openPopup: (socialPlatform: SocialPlatform) => void;
}) {
  const onClick = useCallback(() => {
    openPopup(socialPlatform);
  }, [socialPlatform, openPopup]);

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={`Share on ${socialPlatformIconName[socialPlatform]}`}
    >
      <Icon
        name={socialPlatformIconName[socialPlatform]}
        color="currentColor"
        height="1.5rem"
        width="1.5rem"
      />
    </button>
  );
}

export default function RegistrationShareOnSocials() {
  const { logEventWithContext } = useAnalytics();
  const { selectedName } = useRegistration();

  const popupWidth = 600;
  const popupHeight = 600;

  const openPopup = (socialPlatform: SocialPlatform) => {
    const text = [
      'I just got my Basename as part of Onchain Summer! 😎',
      `Basenames are ENS names supercharged by ${socialPlatformHandle[socialPlatform]}: low-cost (or free!), easy to use, and a powerful tool for connecting builders across the onchain economy.`,
      'Get yours at base.org/names',
    ].join('\n\n');

    const socialMediaShareParams: SocialMediaShareParams = {
      text: text,
      url: `https://base.org/name/${selectedName}`,
    };
    const shareLinkFunction = socialPlatformShareLinkFunction[socialPlatform];
    if (shareLinkFunction) {
      logEventWithContext(`share_on_social_${socialPlatform}`, ActionType.click);

      const shareLink = shareLinkFunction(socialMediaShareParams);
      const left = window.innerWidth / 2 - popupWidth / 2;
      const top = window.innerHeight / 2 - popupHeight / 2;
      const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

      window.open(shareLink, '_blank', options);
    }
  };

  return (
    <p className="flex items-center justify-center gap-4 text-center font-bold uppercase tracking-widest text-white">
      Share your name
      {socialPlatformsEnabled.map((socialPlatform) => (
        <SocialPlatformButton
          socialPlatform={socialPlatform}
          openPopup={openPopup}
          key={socialPlatform}
        />
      ))}
    </p>
  );
}
