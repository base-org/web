import satori from 'satori';
import { NextRequest } from 'next/server';
import {
  getBasenameImage,
  getChainForBasename,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import twemoji from 'twemoji';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { isDevelopment } from 'apps/web/src/constants';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import { getIpfsGatewayUrl, IpfsUrl, IsValidIpfsUrl } from 'apps/web/src/utils/urls';
import { logger } from 'apps/web/src/utils/logger';
import { Basename } from '@coinbase/onchainkit/identity';
import { getCloudinaryMediaUrl } from 'apps/web/src/utils/images';

const emojiCache: Record<string, Promise<string>> = {};
const fontCache: Record<string, Promise<ArrayBuffer>> = {};

// Load fonts with caching
async function loadFont(fontPath: string): Promise<ArrayBuffer> {
  if (!fontCache[fontPath]) {
    fontCache[fontPath] = fetch(new URL(fontPath, import.meta.url)).then(res => res.arrayBuffer());
  }
  return fontCache[fontPath];
}

// Cache and load emoji
async function loadEmoji(emojiString: string): Promise<string> {
  const code = twemoji.convert.toCodePoint(emojiString);
  if (!emojiCache[code]) {
    const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code.toLowerCase()}.svg`;
    emojiCache[code] = fetch(url).then(r => r.text());
  }
  return emojiCache[code];
}

// Resolve avatar URL
async function resolveAvatarUrl(username: string, chainId: number): Promise<string> {
  const client = getBasenamePublicClient(chainId);
  const avatar = await client.getEnsText({
    name: username,
    key: UsernameTextRecordKeys.Avatar,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
  });

  if (!avatar) return '';

  if (IsValidIpfsUrl(avatar)) {
    return getIpfsGatewayUrl(avatar as IpfsUrl) || '';
  }

  return getCloudinaryMediaUrl({ media: avatar, format: 'png', width: 120 });
}

// Generate SVG
async function createSvg(username: string, imageSource: string, fontData: ArrayBuffer): Promise<string> {
  const containerStyle = {
    color: 'black',
    height: 1000,
    width: 1000,
    background: '#F7F7F7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle = {
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
    boxShadow: '0px 8px 16px 0px rgba(0,82,255,0.32), inset 0px 8px 16px 0px rgba(255,255,255,0.25)',
  };

  return satori(
    <div style={containerStyle}>
      <div style={cardStyle}>
        <figure style={{ borderRadius: '100%', overflow: 'hidden', height: 120, width: 120 }}>
          <ImageRaw src={imageSource} height={120} width={120} alt={username} />
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
      fonts: [{ name: 'CoinbaseDisplay', data: fontData, weight: 500, style: 'normal' }],
      loadAdditionalAsset: async (code, segment) => {
        if (code === 'emoji') return `data:image/svg+xml;base64,${btoa(await loadEmoji(segment))}`;
        return code;
      },
    }
  );
}

// Main handler
export const config = {
  runtime: 'edge',
};

export default async function handler(request: NextRequest) {
  const fontData = await loadFont('../../../../../src/fonts/CoinbaseDisplay-Regular.ttf');
  const url = new URL(request.url);
  const username = url.searchParams.get('name') ?? 'yourname';
  const chain = getChainForBasename(username as Basename);

  let imageSource = await resolveAvatarUrl(username, chain.id);
  if (!imageSource) {
    imageSource = `${isDevelopment ? url.origin : 'https://www.base.org'}${getBasenameImage(username).src}`;
  }

  try {
    const svg = await createSvg(username, imageSource, fontData);
    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
  } catch (error) {
    logger.error('Error generating SVG:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
