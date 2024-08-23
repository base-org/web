import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { FrameMetadataResponse } from '@coinbase/onchainkit/frame/types';
import initialImage from 'apps/web/pages/api/basenames/frame/assets/initial-image.png';
import searchImage from 'apps/web/pages/api/basenames/frame/assets/search-image.png';
import txSubmittedImage from 'apps/web/pages/api/basenames/frame/assets/tx-submitted.png'
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';

export const initialFrame: FrameMetadataResponse = getFrameMetadata({
  buttons: [
    {
      label: 'Claim',
    },
  ],
  image: {
    src: `${DOMAIN}/${initialImage.src}`,
  },
  postUrl: `${DOMAIN}/api/basenames/frame/01_inputSearchValue`,
});

export const inputSearchValueFrame = getFrameHtmlResponse({
  buttons: [
    {
      label: 'Continue',
    },
  ],
  image: {
    src: `${DOMAIN}/${searchImage.src}`,
  },
  input: {
    text: 'Search for a name',
  },
  postUrl: `${DOMAIN}/api/basenames/frame/02_validateSearchInputAndSetYears`,
});

export const retryInputSearchValueFrame = (error?: string) =>
  getFrameHtmlResponse({
    buttons: [
      {
        label: 'Search again',
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/frame/assets/retrySearchFrameImage.png?error=${error}`,
    },
    input: {
      text: 'Search for a name',
    },
    postUrl: `${DOMAIN}/api/basenames/frame/02_validateSearchInputAndSetYears`,
  });

export const buttonIndexToYears = {
  1: 1,
  2: 5,
  3: 10,
  4: 100,
};

export const setYearsFrame = (targetName: string, formattedTargetName: string) =>
  getFrameHtmlResponse({
    buttons: [
      {
        label: '1 year',
      },
      {
        label: '5 years',
      },
      {
        label: '10 years',
      },
      {
        label: '100 years',
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/frame/assets/registrationFrameImage.png?name=${formattedTargetName}`,
    },
    postUrl: `${DOMAIN}/api/basenames/frame/03_getPriceAndConfirm`,
    state: {
      targetName,
      formattedTargetName,
    },
  });

export const confirmationFrame = (
  targetName: string,
  formattedTargetName: string,
  targetYears: number,
  registrationPriceInWei: string,
  registrationPriceInEth: string,
) =>
  getFrameHtmlResponse({
    buttons: [
      {
        action: 'tx',
        label: `Claim name`,
        target: `${DOMAIN}/api/basenames/frame/tx`,
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/frame/assets/registrationFrameImage.png?name=${formattedTargetName}&years=${targetYears}&priceInEth=${registrationPriceInEth}`,
    },
    postUrl: `${DOMAIN}/api/basenames/frame/04_txSuccess`,
    state: {
      targetName,
      formattedTargetName,
      targetYears,
      registrationPriceInWei,
      registrationPriceInEth,
    },
  });

export const txSuccessFrame = (name: string) =>
  getFrameHtmlResponse({
    buttons: [
      {
        action: 'link',
        label: `Go to your profile`,
        target: `${DOMAIN}/name/${name}`,
      },
    ],
    image: {
      src: `${DOMAIN}/${txSubmittedImage}`,
    },
  });
