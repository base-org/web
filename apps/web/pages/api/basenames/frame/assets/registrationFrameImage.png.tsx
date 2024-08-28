import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';
import registrationImageBackground from 'apps/web/pages/api/basenames/frame/assets/registration-bg.png';
import { getBasenameImage } from 'apps/web/src/utils/usernames';

export const config = {
  runtime: 'edge',
};
const secondaryFontColor = '#0052FF';

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('../../../../../src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const username = url.searchParams.get('name') as string;
  const profilePicture = getBasenameImage(username);
  let imageSource = DOMAIN + profilePicture.src;
  const years = url.searchParams.get('years');
  const priceInEth = url.searchParams.get('priceInEth');

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
          backgroundImage: `url(${DOMAIN + registrationImageBackground.src})`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0455FF',
            borderRadius: '5rem',
            marginTop: '12%',
            padding: '1rem',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
            fontSize: '5rem',
            maxWidth: '100%',
            boxShadow:
              '0px 8px 16px 0px rgba(0,82,255,0.32),inset 0px 8px 16px 0px rgba(255,255,255,0.25) ',
          }}
        >
          <figure style={{ borderRadius: '100%', overflow: 'hidden' }}>
            <ImageRaw src={imageSource} height={80} width={80} alt={username} />
          </figure>
          <span
            style={{
              color: 'white',
              paddingBottom: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 'auto',
            }}
          >
            {username}
          </span>
        </div>
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!years && (
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
              How long do you want to register this name?
            </span>
          )}
          {years && (
            <span
              style={{
                color: secondaryFontColor,
                fontSize: '3rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 'auto',
                textAlign: 'center',
              }}
            >
              Register for: {years} year{Number(years) > 1 ? 's' : ''}
            </span>
          )}
          {priceInEth && (
            <span
              style={{
                color: secondaryFontColor,
                fontSize: '3rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 'auto',
                textAlign: 'center',
              }}
            >
              Cost: {priceInEth} ETH
            </span>
          )}
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
