import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

// export const DOMAIN = `https://base-web-git-feat-basenames-frame-coinbase-vercel.vercel.app`
export const DOMAIN = `http://localhost:3000`;

export const initialFrame = getFrameMetadata({
  buttons: [
    {
      label: 'Register a basename today!',
    },
  ],
  image: {
    src: `${DOMAIN}/images/basenames/contract-uri/feature-image.png`,
  },
  postUrl: `${DOMAIN}/api/basenames/frame/inputSearchValue`,
});

export const inputSearchValueFrame = (error?: string) =>
  getFrameHtmlResponse({
    buttons: [
      {
        action: 'post',
        label: 'Register name',
        target: `${DOMAIN}/api/basenames/frame/validateSearchInputAndSetYears`,
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/INVALID_NAME_FOR_INITIAL_RENDER/assets/frameImage.png?error=${
        error ?? ''
      }`, // TODO: is this too hacky?
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
        target: `${DOMAIN}/api/basenames/frame/confirmation`,
      },
      {
        action: 'post',
        label: '5 years',
        target: `${DOMAIN}/api/basenames/frame/confirmation`,
      },
      {
        action: 'post',
        label: '10 years',
        target: `${DOMAIN}/api/basenames/frame/confirmation`,
      },
      {
        action: 'post',
        label: '100 years',
        target: `${DOMAIN}/api/basenames/frame/confirmation`,
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/${formattedTargetName}/assets/frameImage.png`,
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
        label: `Submit Basename Registration`,
        target: `${DOMAIN}/api/basenames/frame/tx`,
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/${formattedTargetName}/assets/frameImage.png?years=${targetYears}&priceInEth=${registrationPriceInEth}`,
    },
    target: `${DOMAIN}/api/basenames/frame/tx`,
    postUrl: `${DOMAIN}/api/basenames/frame/tx`,
    state: {
      targetName,
      formattedTargetName,
      targetYears,
      registrationPriceInWei,
      registrationPriceInEth,
    },
  });