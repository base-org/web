import { Button } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import Image from 'next/image';
import penguin from './penguin.png';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import {
  SocialMediaShareParams,
  SocialPlatform,
  socialPlatformCtaForDisplay,
  socialPlatformHandle,
  socialPlatformLogoForDisplay,
  socialPlatformShareLinkFunction,
  socialPlatformsEnabled,
  socialPlatformsNameForDisplay,
} from 'apps/web/src/utils/socialPlatforms';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';

export default function ShareUsernameModal({
  isOpen,
  toggleModal,
  username,
}: {
  isOpen: boolean;
  toggleModal: () => void;
  username: string;
}) {
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState<SocialPlatform | undefined>(
    undefined,
  );

  const [imageIsLoading, setImageIsLoading] = useState<boolean>(true);

  const coverImageWrapperClasses = classNames(
    'min-h-[11.25rem] w-full  overflow-hidden rounded-2xl border border-line/20 bg-line/10',
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
      url: `https://base.org/names/${username}`,
    };
    const shareLinkFunction = socialPlatformShareLinkFunction[socialPlatform];

    const shareLink = shareLinkFunction(socialMediaShareParams);
    const left = window.innerWidth / 2 - popupWidth / 2;
    const top = window.innerHeight / 2 - popupHeight / 2;
    const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

    window.open(shareLink, '_blank', options);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleModal}
      title="Share your name on socials"
      titleAlign="left"
    >
      <div className="mt-4 flex w-full flex-col gap-4 rounded-3xl border border-line/20 p-6">
        <p>
          I just got a name from <span className="text-blue-500">@base</span> during Onchain Summer!
          You can get yours too at <span className="text-blue-500">base.org/names</span>
        </p>
        <figure className={coverImageWrapperClasses}>
          <img
            src={`/api/og/names/${username}`}
            alt={`{${username}.base.eth`}
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
            <button
              onClick={() => openPopup(socialPlatform)}
              className="flex w-full items-center gap-6 rounded-2xl border border-line/20 bg-white px-6 py-4 text-xl hover:bg-blue-500/10"
            >
              <Image
                src={socialPlatformLogoForDisplay[socialPlatform]}
                alt={socialPlatformsNameForDisplay[socialPlatform]}
              />
              {socialPlatformCtaForDisplay[socialPlatform]} on{' '}
              {socialPlatformsNameForDisplay[socialPlatform]}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );

  // const socialMediaShareParams: SocialMediaShareParams = {
  //   text: `I just got a name from ${socialPlatformHandle[selectedSocialPlatform]} during Onchain Summer! You can get yours too at base.org/names`,
  //   url: `https://base.org/names/${username}`,
  // };
  // const shareLinkFunction = socialPlatformShareLinkFunction[selectedSocialPlatform];
  // const shareLink = shareLinkFunction(socialMediaShareParams);

  // const popupWidth = 600;
  // const popupHeight = 600;

  // const openPopup = () => {
  //   const left = window.innerWidth / 2 - popupWidth / 2;
  //   const top = window.innerHeight / 2 - popupHeight / 2;
  //   const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

  //   window.open(shareLink, '_blank', options);
  // };

  // const selectedProfilePicture = getUserNamePicture(username);

  // return (
  //   <Modal
  //     isOpen={isOpen}
  //     onClose={toggleModal}
  //     onBack={() => setSelectedSocialPlatform(undefined)}
  //     title={`Share on ${socialPlatformsNameForDisplay[selectedSocialPlatform]}`}
  //     titleAlign="left"
  //   >
  //     <div className="mt-4 flex w-full flex-col gap-4 rounded-3xl border border-line/20 p-6">
  //       <p>
  //         I just got a name from <span className="text-blue-500">@base</span> during Onchain Summer!
  //         You can get yours too at <span className="text-blue-500">base.org/names</span>
  //       </p>
  //       <figure className={coverImageWrapperClasses}>
  //         <img
  //           src={`/api/og/names/${username}`}
  //           alt={`{${username}.base.eth`}
  //           onLoad={onLoadImage}
  //           className={coverImageClasses}
  //           width={openGraphImageWidth}
  //           height={openGraphImageHeight}
  //         />
  //       </figure>
  //     </div>
  //     <Link href={shareLink} target="_blank" className="mt-4 w-full">
  //       <Button variant={'black'} className="w-full rounded-full" onClick={openPopup}>
  //         {socialPlatformCtaForDisplay[selectedSocialPlatform]}
  //       </Button>
  //     </Link>
  //   </Modal>
  // );
}
