import { ImageResponse } from '@vercel/og';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import { NextRequest } from 'next/server';
import tempPendingAnimation from 'apps/web/src/components/Basenames/tempPendingAnimation.png';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';

export const config = {
  runtime: 'edge',
};

// TODO: Do we want to check if the name actually exists?
export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('../../../../../src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const username = url.searchParams.get('name') ?? 'yourname';
  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';
  const profilePicture = getUserNamePicture(username);

  // Using vercel's OG image for a PNG response
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
          backgroundImage: `url(${domainName + tempPendingAnimation.src})`,
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
            padding: '1rem',
            paddingRight: '1.5rem',
            fontSize: '5rem',
            maxWidth: '100%',
            boxShadow:
              '0px 8px 16px 0px rgba(0,82,255,0.32),inset 0px 8px 16px 0px rgba(255,255,255,0.25) ',
          }}
        >
          <figure style={{ borderRadius: '100%', overflow: 'hidden' }}>
            {/* We cannot use <Image> in these satori rendered images */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={domainName + profilePicture.src} height={80} width={80} alt={username} />
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
