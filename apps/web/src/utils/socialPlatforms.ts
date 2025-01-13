import { QueryParams, urlWithQueryParams } from 'apps/web/src/utils/urls';

/*
 * Series of constant and utilities to share content on social platform
 */

export enum SocialPlatform {
  X = 'twitter', // Main platform name
  Farcaster = 'farcaster',
}

// Alias for backward compatibility
export const Twitter = SocialPlatform.X;

export const socialPlatformsNameForDisplay = {
  [SocialPlatform.X]: 'X',
  [SocialPlatform.Farcaster]: 'Farcaster',
};

export const socialPlatformHandle = {
  [SocialPlatform.X]: '@base',
  [SocialPlatform.Farcaster]: '@base',
};

export const socialPlatformCtaForDisplay = {
  [SocialPlatform.X]: 'Share',
  [SocialPlatform.Farcaster]: 'Share',
};

export const socialPlatformIconName: Record<SocialPlatform, string> = {
  [SocialPlatform.X]: 'x',
  [SocialPlatform.Farcaster]: 'farcaster',
};

export type SocialMediaShareParams = {
  text: string;
  url: string;
};

type SocialShareFunction = ({ text, url }: SocialMediaShareParams) => string;
type SocialPlatformShareLinkFunction = Record<SocialPlatform, false | SocialShareFunction>;

export const socialPlatformShareLinkFunction: SocialPlatformShareLinkFunction = {
  [SocialPlatform.X]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      text: text,
      url: url,
    };

    return urlWithQueryParams('https://x.com/intent/tweet', shareParams);
  },
  [SocialPlatform.Farcaster]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      'embeds[]': url,
      text: text,
    };

    return urlWithQueryParams('https://warpcast.com/~/compose', shareParams);
  },
};

export type SocialMediaHandleParams = {
  handle: string;
};
type SocialHandleFunction = ({ handle }: SocialMediaHandleParams) => string;
type SocialPlatformHandleFunction = Record<SocialPlatform, SocialHandleFunction>;

export const socialPlatformHandleFunction: SocialPlatformHandleFunction = {
  [SocialPlatform.X]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
  [SocialPlatform.Farcaster]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
};
