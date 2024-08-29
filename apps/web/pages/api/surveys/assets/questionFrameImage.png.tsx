import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import { DOMAIN } from 'apps/web/src/constants';
import questionImageBackground from 'apps/web/pages/api/surveys/assets/question-bg.png';

export const config = {
  runtime: 'edge',
};
const secondaryFontColor = '#0052FF';

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('apps/web/src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const surveyQuestion = url.searchParams.get('survey');

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
          backgroundImage: `url(${DOMAIN + questionImageBackground.src})`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              color: secondaryFontColor,
              fontSize: '3rem',
              paddingBottom: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 'auto',
              textAlign: 'center',
            }}
          >
            {surveyQuestion}
          </span>
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
