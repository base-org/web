import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/frameResponses';
import retrySearchImageBackground from './retry-search-image.png';

export const config = {
  runtime: 'edge',
};

const secondaryFontColor = '#0052FF';

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('../../../../../src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const error = url.searchParams.get('error');
  const parsedError = error?.split(':');

  let errorBody: string;
  if (parsedError && parsedError.length > 1) {
    errorBody = parsedError[1].trim();
  } else {
    errorBody = error ?? '';
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${DOMAIN + retrySearchImageBackground.src})`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          padding: '1.5rem',
        }}
      >
        <span
          style={{
            color: secondaryFontColor,
            fontSize: '5rem',
            paddingBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 'auto',
            textAlign: 'center',
            // textTransform: 'capitalize',
          }}
        >
          {errorBody ? errorBody.charAt(0).toUpperCase() + errorBody.slice(1) : ''}
        </span>
      </div>
    ),
    {
      width: openGraphImageWidth,
      height: openGraphImageHeight,
      fonts: [
        {
          name: 'Typewriter',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
