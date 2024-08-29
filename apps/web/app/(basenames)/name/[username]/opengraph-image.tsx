import { UsernameProfileProps } from 'apps/web/app/(basenames)/name/[username]/page';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { ImageResponse } from 'next/og';
import coverImageBackground from 'apps/web/app/(basenames)/name/[username]/coverImageBackground.png';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { isDevelopment } from 'apps/web/src/constants';
import {
  formatBaseEthDomain,
  getBasenameImage,
  USERNAME_DOMAINS,
} from 'apps/web/src/utils/usernames';
import { base, baseSepolia } from 'viem/chains';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { CLOUDFARE_IPFS_PROXY } from 'apps/web/src/utils/urls';
export const runtime = 'edge';

const size = {
  width: 1200,
  height: 630,
};

export async function generateImageMetadata({ params }: UsernameProfileProps) {
  let username = params.username;
  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    username = formatBaseEthDomain(username, base.id);
  }

  return [
    {
      alt: `Basenames | ${username}`,
      contentType: 'image/png',
      size,
      id: username,
    },
  ];
}

type ImageRouteProps = { id: string };

export default async function OpenGraphImage(props: ImageRouteProps) {
  let username = props.id;

  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    username = formatBaseEthDomain(username, base.id);
  }

  const fontData = await fetch(
    new URL('apps/web/src/fonts/CoinbaseDisplay-Regular.ttf', import.meta.url),
  ).then(async (res) => res.arrayBuffer());

  const domainName = isDevelopment ? `http://localhost:3000` : 'https://www.base.org';
  const profilePicture = getBasenameImage(username);
  let imageSource = domainName + profilePicture.src;

  // NOTE: Do we want to fail if the name doesn't exists?
  try {
    const client = getBasenamePublicClient(base.id);
    const avatar = await client.getEnsAvatar({
      name: username,
      universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[base.id],
      assetGatewayUrls: {
        ipfs: CLOUDFARE_IPFS_PROXY,
      },
    });

    // Satori Doesn't support webp
    if (avatar && !avatar.endsWith('.webp')) {
      imageSource = avatar;
    }
  } catch (error) {}

  return new ImageResponse(
    (
      // ImageResponse JSX element
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
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'CoinbaseDisplay',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
