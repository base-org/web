import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import {
  SocialMediaShareParams,
  SocialPlatform,
  socialPlatformCtaForDisplay,
  socialPlatformHandle,
  socialPlatformIconName,
  socialPlatformShareLinkFunction,
  socialPlatformsNameForDisplay,
} from 'apps/web/src/utils/socialPlatforms';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useAnalytics } from 'apps/web/contexts/Analytics';

export const socialPlatformsEnabled = [SocialPlatform.Twitter, SocialPlatform.Farcaster];

export default function ShareUsernameModal({
  isOpen,
  toggleModal,
  selectedName,
}: {
  isOpen: boolean;
  toggleModal: () => void;
  selectedName: string;
}) {
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(true);
  const { logEventWithContext } = useAnalytics();
  const coverImageWrapperClasses = classNames(
    'min-h-[10.25rem] w-full  overflow-hidden rounded-2xl border border-gray-40/20 bg-gray-40/10',
    {
      'animate-pulse': imageIsLoading,
    },
  );

  const coverImageClasses = classNames('transition-opacity duration-500', {
    'opacity-0': imageIsLoading,
    'opacity-100': !imageIsLoading,
  });

  const onLoadImage = useCallback(() => {
    setImageIsLoading(false);
  }, []);

  const popupWidth = 600;
  const popupHeight = 600;

  const openPopup = (socialPlatform: SocialPlatform) => {
    const socialMediaShareParams: SocialMediaShareParams = {
      text: `I just got a name from ${socialPlatformHandle[socialPlatform]} during Onchain Summer! You can get yours too at base.org/names`,
      url: `https://base.org/names/${selectedName}`,
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
    <Modal
      isOpen={isOpen}
      onClose={toggleModal}
      title="Share your name on socials"
      titleAlign="left"
    >
      <div className="mt-4 flex w-full flex-col gap-4 rounded-3xl border border-gray-40/20 p-6">
        <p>
          I just got a name from <span className="text-blue-500">@base</span> during Onchain Summer!
          You can get yours too at <span className="text-blue-500">base.org/names</span>
        </p>
        <figure className={coverImageWrapperClasses}>
          <img
            src={`/api/og/names/${selectedName}`}
            alt={selectedName}
            onLoad={onLoadImage}
            className={coverImageClasses}
            width={openGraphImageWidth}
            height={openGraphImageHeight}
          />
        </figure>
      </div>
      <ul className="mt-4  flex w-full flex-col gap-4">
        {socialPlatformsEnabled.map((socialPlatform) => (
          <li key={socialPlatform} className="">
            <Button
              onClick={() => openPopup(socialPlatform)}
              variant={ButtonVariants.Gray}
              rounded
              fullWidth
            >
              <Icon
                name={socialPlatformIconName[socialPlatform]}
                color="currentColor"
                height="1rem"
                width="1rem"
              />
              {socialPlatformCtaForDisplay[socialPlatform]} on{' '}
              {socialPlatformsNameForDisplay[socialPlatform]}
            </Button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
