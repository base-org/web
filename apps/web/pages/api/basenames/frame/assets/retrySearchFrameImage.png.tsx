import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import { RawErrorStrings } from 'apps/web/src/utils/frames/basenames';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';
import retrySearchImageBackground from 'apps/web/pages/api/basenames/frame/assets/retry-search-image.png';

export const config = {
  runtime: 'edge',
};

const secondaryFontColor = '#0052FF';
const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const errorMap: Record<RawErrorStrings, JSX.Element> = {
  [RawErrorStrings.Unavailable]: (
    <div style={divStyle}>
      Sorry, that name is unavailable.
      <br />
      Search for another name
    </div>
  ),
  [RawErrorStrings.TooShort]: (
    <div style={divStyle}>
      Sorry, that name is too short.
      <br />
      Search for another name
    </div>
  ),
  [RawErrorStrings.TooLong]: (
    <div style={divStyle}>
      Sorry, that name is too long.
      <br />
      Search for another name
    </div>
  ),
  [RawErrorStrings.DisallowedChars]: (
    <div style={divStyle}>
      Sorry, that name uses
      <br />
      disallowed characters.
      <br />
      Search for another name
    </div>
  ),
  [RawErrorStrings.Invalid]: (
    <div style={divStyle}>
      Sorry, that name is invalid.
      <br />
      Search for another name
    </div>
  ),
  [RawErrorStrings.InvalidUnderscore]: (
    <div style={divStyle}>
      Sorry, underscores are
      <br />
      only allowed at the start.
      <br />
      Search for another name
    </div>
  ),
} as const;

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('../../../../../src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const error = url.searchParams.get('error') as RawErrorStrings;
  let errorMessage: JSX.Element | undefined;
  if (error) {
    errorMessage = errorMap[error] ?? (
      <div style={divStyle}>
        Sorry, unable to register that name.
        <br />
        Search for another name
      </div>
    );
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: secondaryFontColor,
            fontSize: '3.5rem',
            paddingBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 'auto',
            textAlign: 'center',
          }}
        >
          {errorMessage}
        </div>
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
