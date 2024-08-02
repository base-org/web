import satori from 'satori';
import { NextRequest } from 'next/server';
import { getUserNamePicture, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import twemoji from 'twemoji';
import { base } from 'viem/chains';
import { namehash } from 'viem';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { isDevelopment } from 'apps/web/src/constants';

const emojiCache: Record<string, Promise<string>> = {};

export async function loadEmoji(emojiString: string) {
  const code = twemoji.convert.toCodePoint(emojiString);

  if (code in emojiCache) {
    return emojiCache[code];
  }

  // TODO: Is this okay? Vercel's OG image already does these calls
  const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`;

  return (emojiCache[code] = fetch(url).then(async (r) => r.text()));
}

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
  } catch (error) {}

  // Using Satori for a SVG response
  const svg = await satori(
    <div
      style={{
        color: 'black',
        height: 1000,
        width: 1000,
        background: '#F7F7F7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0455FF',
          borderRadius: '5rem',
          padding: '7%',
          width: '100%',
          height: '100%',
          maxHeight: '55%',
          maxWidth: '90%',
          boxShadow:
            '0px 8px 16px 0px rgba(0,82,255,0.32),inset 0px 8px 16px 0px rgba(255,255,255,0.25) ',
        }}
      >
        <figure style={{ borderRadius: '100%', overflow: 'hidden', height: 120, width: 120 }}>
          {/* We cannot use <Image> in these satori rendered images */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSource} height={120} width={120} alt={username} />
        </figure>
        <span
          style={{
            color: 'white',
            paddingBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 'auto',
            fontSize: '5rem',
          }}
        >
          {username}
        </span>
      </div>
    </div>,
    {
      width: 1000,
      height: 1000,
      fonts: [
        {
          name: 'CoinbaseDisplay',
          data: fontData,
          weight: 500,
          style: 'normal',
        },
      ],
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          return `data:image/svg+xml;base64,${btoa(await loadEmoji(segment))}`;
        }

        return code;
      },
    },
  );

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
    },
  });
}
