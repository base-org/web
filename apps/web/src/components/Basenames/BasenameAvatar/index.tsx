import { BaseName } from '@coinbase/onchainkit/identity';

// Note: The animations provided by the studio team didn't match the number from our SVGs
//       If we replace those, double check the animation avatar is the same shape as the SVG
import animation1 from './animations/01.json';
import animation2 from './animations/02.json';
import animation3 from './animations/03.json';
import animation4 from './animations/04.json';
import animation5 from './animations/05.json';
import animation6 from './animations/06.json';
import animation7 from './animations/07.json';

import image1 from './images/1.svg';
import image2 from './images/2.svg';
import image3 from './images/3.svg';
import image4 from './images/4.svg';
import image5 from './images/5.svg';
import image6 from './images/6.svg';
import image7 from './images/7.svg';

import LottieAnimation from 'apps/web/src/components/LottieAnimation';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

import { StaticImageData } from 'next/image';
import { sha256 } from 'viem';

export const getUsernamePictureIndex = (name: string, totalOptions: number) => {
  const nameAsUint8Array = Uint8Array.from(name.split('').map((letter) => letter.charCodeAt(0)));
  const hash = sha256(nameAsUint8Array);
  const hashValue = parseInt(hash, 16);
  const remainder = hashValue % totalOptions;
  const selectedOption = remainder;
  return selectedOption;
};

export const getBasenameAnimation = (username: string) => {
  const animations = [
    animation1,
    animation2,
    animation3,
    animation4,
    animation5,
    animation6,
    animation7,
  ];
  const profilePictureIndex = getUsernamePictureIndex(username, animations.length);
  const selectedAnimation = animations[profilePictureIndex];
  return selectedAnimation;
};

export const getBasenameImage = (username: string) => {
  const images = [image1, image2, image3, image4, image5, image6, image7];
  const profilePictureIndex = getUsernamePictureIndex(username, images.length);
  const selectedAnimation = images[profilePictureIndex] as StaticImageData;
  return selectedAnimation;
};

export default function BasenameAvatar({
  basename,
  wrapperClassName = 'h-8 w-8 overflow-hidden rounded-full',
  animate = true,
  width,
  height,
}: {
  basename: BaseName;
  wrapperClassName?: string;
  animate?: boolean;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
}) {
  const { data: basenameAvatar, isLoading: basenameAvatarIsLoading } = useBaseEnsAvatar({
    name: basename,
  });

  if (basenameAvatar ?? !animate) {
    const image = getBasenameImage(basename);
    return (
      <ImageWithLoading
        src={basenameAvatar ?? image}
        alt={basename}
        title={basename}
        wrapperClassName={wrapperClassName}
        imageClassName="object-cover w-full h-full"
        backgroundClassName="bg-blue-500"
        width={width}
        height={height}
        forceIsLoading={basenameAvatarIsLoading}
      />
    );
  }

  const animation = getBasenameAnimation(basename);

  return <LottieAnimation data={animation} wrapperClassName={wrapperClassName} />;
}
