import { encodeUrlQueryParams } from 'apps/web/src/utils/urls';

// TODO: There's way more that neymar returns but we only need this for now
export type NeymarButton = {
  action_type: string;
  index: number;
  post_url: string;
  title: string;
  target?: string;
};

export type NeynarFrame = {
  buttons: NeymarButton[];
  frames_url: string;
  image: string;
  image_aspect_ratio: string;
  title: string;
  post_url?: string;
  version?: string;
};

export type NeynarEmbed = {
  // metadata: {};
  url: string;
};

export type NeymarEmbedCast = {
  cast_id: { fid: number; hash: string };
};

export type NeymarCastData = {
  cast: {
    frames: NeynarFrame[];
    embeds: NeynarEmbed[];
    hash: string;
    author: {
      display_name: string;
      pfp_url: string;
      username: string;
    };
    text: string;
    parent_url: string;
  };
};

export async function fetchCast({
  identifier,
  type,
}: {
  identifier: string;
  type: 'url' | 'hash';
}) {
  const url = `https://api.neynar.com/v2/farcaster/cast?${encodeUrlQueryParams({
    identifier,
    type,
  })}`;
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', api_key: process.env.NEYNAR_API_KEY },
  };
  try {
    const response = await fetch(url, options);
    const data = (await response.json()) as NeymarCastData;
    return data.cast;
  } catch (error) {}
}
