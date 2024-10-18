import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { FrameMetadataResponse } from '@coinbase/onchainkit/frame/types';
import initialImage from 'apps/web/pages/api/basenames/frame/assets/initial-image.png';
import searchImage from 'apps/web/pages/api/basenames/frame/assets/search-image.png';
import txSucceededImage from 'apps/web/pages/api/basenames/frame/assets/tx-succeeded.png';
import txFailedImage from 'apps/web/pages/api/basenames/frame/assets/tx-failed.png';
import { DOMAIN, acceptedProtocols } from 'apps/web/pages/api/basenames/frame/constants';

export const initialFrame: FrameMetadataResponse = getFrameMetadata({
  isOpenFrame: true,
  accepts: acceptedProtocols,
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
  isOpenFrame: true,
  accepts: acceptedProtocols,
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
    isOpenFrame: true,
    accepts: acceptedProtocols,
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
    isOpenFrame: true,
    accepts: acceptedProtocols,
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
    isOpenFrame: true,
    accepts: acceptedProtocols,
    buttons: [
      {
        action: 'tx',
        label: `Claim name`,
        target: `${DOMAIN}/api/basenames/frame/tx`,
        postUrl: `${DOMAIN}/api/basenames/frame/04_txSubmitted`,
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/frame/assets/registrationFrameImage.png?name=${formattedTargetName}&years=${targetYears}&priceInEth=${registrationPriceInEth}`,
    },
    postUrl: `${DOMAIN}/api/basenames/frame/04_txSubmitted`,
    state: {
      targetName,
      formattedTargetName,
      targetYears,
      registrationPriceInWei,
      registrationPriceInEth,
    },
  });

export const txSucceededFrame = (name: string, transactionId: string) =>
  getFrameHtmlResponse({
    isOpenFrame: true,
    accepts: acceptedProtocols,
    buttons: [
      {
        action: 'link',
        label: `Go to your profile`,
        target: `${DOMAIN}/name/${name}`,
      },
      {
        action: 'link',
        label: `View on block explorer`,
        target: `https://basescan.org/tx/${transactionId}`,
      },
    ],
    image: {
      src: `${DOMAIN}/${txSucceededImage.src}`,
    },
  });

export const txRevertedFrame = (name: string, transactionId: string) =>
  getFrameHtmlResponse({
    isOpenFrame: true,
    accepts: acceptedProtocols,
    buttons: [
      {
        action: 'link',
        label: `View on block explorer`,
        target: `https://basescan.org/tx/${transactionId}`,
      },
    ],
    image: {
      src: `${DOMAIN}/${txFailedImage.src}`,
    },
  });
