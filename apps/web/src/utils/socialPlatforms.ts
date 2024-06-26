import farcaster from 'apps/web/src/components/Basenames/socials/farcaster.svg';
import twitter from 'apps/web/src/components/Basenames/socials/twitter.svg';
import { QueryParams, urlWithQueryParams } from 'apps/web/src/utils/urls';

export enum SocialPlatform {
  Twitter = 'twitter', // Never surrender
  Farcaster = 'farcaster',
}

export const socialPlatformsEnabled = [SocialPlatform.Twitter, SocialPlatform.Farcaster];

export const socialPlatformsNameForDisplay = {
  [SocialPlatform.Twitter]: 'X / Twitter',
  [SocialPlatform.Farcaster]: 'Farcaster',
};

export const socialPlatformHandle = {
  [SocialPlatform.Twitter]: '@base',
  [SocialPlatform.Farcaster]: '@base',
};

export const socialPlatformCtaForDisplay = {
  [SocialPlatform.Twitter]: 'Post',
  [SocialPlatform.Farcaster]: 'Cast',
};

export const socialPlatformLogoForDisplay = {
  [SocialPlatform.Twitter]: twitter,
  [SocialPlatform.Farcaster]: farcaster,
};

export interface SocialMediaShareParams {
  text: string;
  url: string;
}
export const socialPlatformShareLinkFunction = {
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
};
