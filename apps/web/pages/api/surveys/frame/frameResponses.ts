import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { FrameMetadataResponse } from '@coinbase/onchainkit/frame/types';
import initialImage from 'apps/web/pages/api/basenames/frame/assets/initial-image.png';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';
import { Survey } from 'apps/web/pages/api/surveys/surveys';

export const initialFrame: FrameMetadataResponse = (survey: Survey) =>
  getFrameMetadata({
    buttons: [
      {
        label: 'Begin Survey',
      },
    ],
    image: {
      src: `${DOMAIN}/api/surveys/assets/questionFrameImage.png?survey=${survey?.description}`,
    },
    postUrl: 'http://localhost:3000/api/surveys/frame/',
  });
