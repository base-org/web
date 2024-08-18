import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export const DOMAIN = `https://base-web-git-feat-basenames-frame-coinbase-vercel.vercel.app/`

export const initialFrame = getFrameMetadata({
  buttons: [
    {
      label: 'Claim a basename today!',
    },
  ],
  image: {
    src: `${DOMAIN}/images/basenames/contract-uri/feature-image.png`,
  },
  postUrl: `${DOMAIN}/api/basenames/frame/inputSearchValue`,
});

export const inputSearchValueFrame = getFrameHtmlResponse({
  buttons: [
    {
      action: 'post',
      label: 'Claim name',
      target: `${DOMAIN}/api/basenames/frame/validateSearchInputAndSetYears`,
    },
  ],
  image: {
    src: `${DOMAIN}/images/basenames/contract-uri/cover-image.png`,
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

export const setYearsFrame = (targetName: string) =>
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
      src: `${DOMAIN}/api/basenames/${targetName}/assets/coverImage.png`,
    },
    postUrl: `${DOMAIN}/api/basenames/frame/confirmation`,
    state: {
      targetName,
    },
  });

export const confirmationFrame = (
  targetName: string,
  targetYears: number,
  registrationPriceInWei: string,
  registrationPriceInEth: number,
) =>
  getFrameHtmlResponse({
    buttons: [
      {
        action: 'tx',
        label: `Confirm: Register ${targetName} for ${targetYears} years for ${registrationPriceInEth} ETH`,
        target: `${DOMAIN}/api/basenames/frame/tx`,
      },
    ],
    image: {
      src: `${DOMAIN}/api/basenames/${targetName}/assets/coverImage.png`,
    },
    target: `${DOMAIN}/api/basenames/frame/tx`,
    postUrl: `${DOMAIN}/api/basenames/frame/tx`,
    state: {
      name: targetName,
      years: targetYears,
      priceInWei: registrationPriceInWei,
      priceInEth: registrationPriceInEth,
    },
  });
