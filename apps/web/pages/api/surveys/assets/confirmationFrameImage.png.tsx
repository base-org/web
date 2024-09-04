import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import { DOMAIN } from 'apps/web/src/constants';
import questionImageBackground from 'apps/web/pages/api/surveys/assets/question-bg.png';
import { UserQuestionResponse } from 'apps/web/pages/api/surveys/surveys';

export const config = {
  runtime: 'edge',
};
const secondaryFontColor = '#0052FF';

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('apps/web/src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const responses = url.searchParams.get('responses');
  const decodedResponses = JSON.parse(
    decodeURIComponent(responses ?? ''),
  ) as UserQuestionResponse[];

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
          {decodedResponses.map((response, index) => (
            <div
              key={response.questionId}
              style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  color: secondaryFontColor,
                  fontSize: '3rem',
                  paddingBottom: '0.75rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                }}
              >
                {`Question ${index + 1}: ` + ' '}
              </span>
              <span
                style={{
                  color: secondaryFontColor,
                  fontSize: '3rem',
                  paddingBottom: '0.75rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                }}
              >
                {response.answer}
              </span>
            </div>
          ))}
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
