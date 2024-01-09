import { Framework, Region, TrackerType, TrackingCategory } from '@coinbase/cookie-manager';

export const cookieManagerConfig = {
  categories: [
    {
      id: TrackingCategory.NECESSARY,
      expiry: 365,
      required: true,
      trackers: [
        {
          id: 'ip_country',
          type: TrackerType.COOKIE,
          expiry: 10,
        },
        {
          id: 'locale',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.PERFORMANCE,
      expiry: 365,
      trackers: [
        {
          id: 'rfm',
          type: TrackerType.COOKIE,
          sessionCookie: true,
        },
      ],
    },
    {
      id: TrackingCategory.FUNCTIONAL,
      expiry: 365,
      trackers: [
        {
          id: 'mode',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.TARGETING,
      expiry: 365,
      trackers: [
        {
          id: 'gclid',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.DELETE_IF_SEEN,
      expiry: 0,
      trackers: [
        {
          id: 'challenge-regex',
          type: TrackerType.COOKIE,
          regex: '^(cf_chl_prog$)|(cf_cc_...$)|(cf_chl_cc_...$)|(cf_chl_seq_...$)',
        },
      ],
    },
  ],
  geolocationRules: [
    {
      region: Region.DEFAULT,
      framework: Framework.OPT_OUT,
    },
    {
      region: Region.EU,
      framework: Framework.OPT_IN,
    },
  ],
};
