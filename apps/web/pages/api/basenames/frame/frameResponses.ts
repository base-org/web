import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export const DOMAIN = `https://base-web-git-feat-basenames-frame-coinbase-vercel.vercel.app`;
// export const DOMAIN = `http://localhost:3000`;

export const initialFrame = getFrameMetadata({
  buttons: [
    {
      label: 'Begin',
    },
  ],
  image: {
    src: `${DOMAIN}/images/frames/basenames/initial-image.png`,
  },
  postUrl: `${DOMAIN}/api/basenames/frame/inputSearchValue`,
});

export const inputSearchValueFrame = getFrameHtmlResponse({
  buttons: [
    {
      action: 'post',
      label: 'Continue',
    },
  ],
  image: {
    src: `${DOMAIN}/images/frames/basenames/search-image.png`, // TODO: is this too hacky?
  },
  input: {
    text: 'Search for a name',
  },
  postUrl: `${DOMAIN}/api/basenames/frame/validateSearchInputAndSetYears`,
});

export const retryInputSearchValueFrame = (error?: string) =>
  getFrameHtmlResponse({
    buttons: [
      {
        action: 'post',
        label: 'Search again',
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/frame/assets/retrySearchFrameImage.png?error=${error}`,
    },
    input: {
      text: 'Search for a name',
    },
    postUrl: `${DOMAIN}/api/basenames/frame/validateSearchInputAndSetYears`,
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
        action: 'post',
        label: '1 year',
      },
      {
        action: 'post',
        label: '5 years',
      },
      {
        action: 'post',
        label: '10 years',
      },
      {
        action: 'post',
        label: '100 years',
      },
    ],
    image: {
      // src: `${DOMAIN}/api/basenames/frame/assets/registrationFrameImage.png?name=${formattedTargetName}`,
      src: `${DOMAIN}/api/basenames/frame/assets/retrySearchFrameImage.png?error=${formattedTargetName}`,
    },
    postUrl: `${DOMAIN}/api/basenames/frame/confirmation`,
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
    postUrl: `${DOMAIN}/api/basenames/frame/txSuccess`,
    state: {
      targetName,
      formattedTargetName,
      targetYears,
      registrationPriceInWei,
      registrationPriceInEth,
    },
  });

export const txSuccessFrame = (txId: string) =>
  getFrameHtmlResponse({
    buttons: [
      {
        label: `Tx: ${txId}`,
      },
    ],
    image: {
      src: `${DOMAIN}/images/basenames/contract-uri/feature-image.png`,
    },
  });
