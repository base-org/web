import farcaster from 'apps/web/src/components/Basenames/socials/farcaster.svg';
import twitter from 'apps/web/src/components/Basenames/socials/twitter.svg';
import { QueryParams, urlWithQueryParams } from 'apps/web/src/utils/urls';
import { StaticImageData } from 'next/image';

export enum SocialPlatform {
  Twitter = 'twitter', // Never surrender
  Farcaster = 'farcaster',
  Lens = 'lens',
  Telegram = 'telegram',
  Discord = 'discord',
}

export const socialPlatformsNameForDisplay = {
  [SocialPlatform.Twitter]: 'X / Twitter',
  [SocialPlatform.Farcaster]: 'Farcaster',
  [SocialPlatform.Lens]: 'Lens',
  [SocialPlatform.Telegram]: 'Telegram',
  [SocialPlatform.Discord]: 'Discord',
};

export const socialPlatformHandle = {
  [SocialPlatform.Twitter]: '@base',
  [SocialPlatform.Farcaster]: '@base',
  [SocialPlatform.Lens]: '',
  [SocialPlatform.Telegram]: '',
  [SocialPlatform.Discord]: '',
};

export const socialPlatformCtaForDisplay = {
  [SocialPlatform.Twitter]: 'Post',
  [SocialPlatform.Farcaster]: 'Cast',
  [SocialPlatform.Lens]: '',
  [SocialPlatform.Telegram]: '',
  [SocialPlatform.Discord]: '',
};

export const socialPlatformLogoForDisplay = {
  [SocialPlatform.Twitter]: twitter as StaticImageData,
  [SocialPlatform.Farcaster]: farcaster as StaticImageData,
  [SocialPlatform.Lens]: '',
  [SocialPlatform.Telegram]: '',
  [SocialPlatform.Discord]: '',
};

export type SocialMediaShareParams = {
  text: string;
  url: string;
};

type SocialShareFunction = ({ text, url }: SocialMediaShareParams) => string;
type SocialPlatformShareLinkFunction = Record<SocialPlatform, false | SocialShareFunction>;

export const socialPlatformShareLinkFunction: SocialPlatformShareLinkFunction = {
  [SocialPlatform.Twitter]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      text: text,
      url: url,
    };

    return urlWithQueryParams('https://twitter.com/intent/tweet', shareParams);
  },
  [SocialPlatform.Farcaster]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      'embeds[]': url,
      text: text,
    };

    return urlWithQueryParams('https://warpcast.com/~/compose', shareParams);
  },
  [SocialPlatform.Lens]: false, // not supported
  [SocialPlatform.Telegram]: ({ text, url }: SocialMediaShareParams) => {
    const shareParams: QueryParams = {
      url: url,
      text: text,
    };

    return urlWithQueryParams('https://t.me/share/url', shareParams);
  },
  [SocialPlatform.Discord]: false, // not supported
};

export type SocialMediaHandleParams = {
  handle: string;
};
type SocialHandleFunction = ({ handle }: SocialMediaHandleParams) => string;
type SocialPlatformHandleFunction = Record<SocialPlatform, SocialHandleFunction>;

export const socialPlatformHandleFunction: SocialPlatformHandleFunction = {
  [SocialPlatform.Twitter]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
  [SocialPlatform.Farcaster]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
  [SocialPlatform.Lens]: ({ handle }: SocialMediaHandleParams) => {
    return `${handle}.lens`;
  },
  [SocialPlatform.Telegram]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
  [SocialPlatform.Discord]: ({ handle }: SocialMediaHandleParams) => {
    return `@${handle}`;
  },
};
