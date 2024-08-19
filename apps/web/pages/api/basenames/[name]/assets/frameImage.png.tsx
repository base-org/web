import { ImageResponse } from '@vercel/og';
import { getUserNamePicture, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { NextRequest } from 'next/server';
import coverImageBackground from './coverImageBackground.png';
import { openGraphImageHeight, openGraphImageWidth } from 'apps/web/src/utils/opengraphs';
import { namehash } from 'viem';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { base } from 'viem/chains';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { isDevelopment } from 'apps/web/src/constants';
import ImageRaw from 'apps/web/src/components/ImageRaw';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('../../../../../src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const url = new URL(request.url);
  const username = url.searchParams.get('name') ?? 'yourname';
  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';
  const profilePicture = getUserNamePicture(username);
  const chainIdFromParams = url.searchParams.get('chainId');
  const chainId = chainIdFromParams ? Number(chainIdFromParams) : base.id;
  let imageSource = domainName + profilePicture.src;
  const years = url.searchParams.get('years');
  const priceInEth = url.searchParams.get('priceInEth');
  const error = url.searchParams.get('error');

  if (username === 'INVALID_NAME_FOR_INITIAL_RENDER') {
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
            backgroundImage: `url(${domainName + coverImageBackground.src})`,
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            padding: '1.5rem',
          }}
        >
          <span
            style={{
              color: 'black',
              fontSize: '3rem',
              paddingBottom: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 'auto',
            }}
          >
            {error}
          </span>
        </div>
      ),
    );
  }

  // NOTE: Do we want to fail if the name doesn't exists?
  try {
    const nameHash = namehash(username);
    const client = getBasenamePublicClient(chainId);
    const avatar = await client.readContract({
      abi: L2ResolverAbi,
      address: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
      args: [nameHash, UsernameTextRecordKeys.Avatar],
      functionName: 'text',
    });

    // Satori Doesn't support webp
    if (avatar && !avatar.endsWith('.webp')) {
      imageSource = avatar;
    }
  } catch (e) {
    console.error(e);
  }

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
          backgroundImage: `url(${domainName + coverImageBackground.src})`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          padding: '1.5rem',
        }}
      >
        <span
          style={{
            color: 'black',
            fontSize: '3rem',
            paddingBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 'auto',
          }}
        >
          Registering
        </span>
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
        {years && (
          <span
            style={{
              color: 'black',
              fontSize: '3rem',
              paddingBottom: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 'auto',
            }}
          >
            Duration: {years} years
          </span>
        )}
        {priceInEth && (
          <span
            style={{
              color: 'black',
              fontSize: '3rem',
              paddingBottom: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 'auto',
            }}
          >
            Cost: {priceInEth} ETH
          </span>
        )}
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
