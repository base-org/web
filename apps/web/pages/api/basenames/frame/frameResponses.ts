import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export const initialFrame = getFrameMetadata({
  buttons: [
    {
      label: 'Claim a basename today!',
    },
  ],
  image: {
    src: `http://localhost:3000/images/basenames/contract-uri/feature-image.png`,
  },
  postUrl: `http://localhost:3000/api/basenames/frame/inputSearchValue`,
});

export const inputSearchValueFrame = getFrameHtmlResponse({
  buttons: [
    {
      action: 'post',
      label: 'Claim name',
      target: `http://localhost:3000/api/basenames/frame/validateSearchInputAndSetYears`,
    },
  ],
  image: {
    src: `http://localhost:3000/images/basenames/contract-uri/cover-image.png`,
  },
  input: {
    text: 'Search for a name',
  },
  postUrl: `http://localhost:3000/api/basenames/frame/validateSearchInputAndSetYears`,
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
        target: `http://localhost:3000/api/basenames/frame/confirmation`,
      },
      {
        action: 'post',
        label: '5 years',
        target: `http://localhost:3000/api/basenames/frame/confirmation`,
      },
      {
        action: 'post',
        label: '10 years',
        target: `http://localhost:3000/api/basenames/frame/confirmation`,
      },
      {
        action: 'post',
        label: '100 years',
        target: `http://localhost:3000/api/basenames/frame/confirmation`,
      },
    ],
    image: {
      src: `http://localhost:3000/api/basenames/${targetName}/assets/coverImage.png`,
    },
    postUrl: `http://localhost:3000/api/basenames/frame/confirmation`,
    state: {
      targetName,
    },
  });

export const confirmationFrame = (targetName: string, targetYears: number, registrationPrice: number) =>
  getFrameHtmlResponse({
    buttons: [
      {
        action: 'tx',
        label: `Confirm: Register ${targetName} for ${targetYears} years for ${registrationPrice} ETH`,
        target: `http://localhost:3000/api/basenames/frame/tx`,
      },
    ],
    image: {
      src: `http://localhost:3000/api/basenames/${targetName}/assets/coverImage.png`,
    },
    target: `http://localhost:3000/api/basenames/frame/tx`,
    postUrl: `http://localhost:3000/api/basenames/frame/tx`,
  });
