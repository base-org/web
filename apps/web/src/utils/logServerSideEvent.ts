import { AnalyticsEventData } from 'libs/base-ui/utils/logEvent';
import md5 from 'md5';
import { analyticsConfig } from 'apps/web/src/constants';

// const dummyData = [
//   {
//     device_id: 'brendan3_ff397469-6362-4407-9265-6d2b01e88074',
//     event_type: 'claim_initiated',
//     event_properties: {
//       action: 'unknown',
//       context: 'basenames_claim_frame',
//       component_type: 'unknown',
//       project_name: 'base_web',
//       // page_path: '/names',
//       // error: 'Name+is+too+short',
//       // auth: 0,
//       // platform: 'web',
//       // locale: null,
//       // session_lcc_id: null,
//       // time_start: 1726165582942,
//       // page_key: '',
//       // prev_page_key: '',
//       // prev_page_path: '',
//       // has_double_fired: false,
//       // session_uuid: '8129a999-5dd9-484f-b03d-3ee8d6279c65',
//       // height: 859,
//       // width: 1440,
//     },
//     // user_id: null,
//     // timestamp: 1726165686659,
//     // event_id: 14104,
//     // session_id: 1726155043144,
//     // version_name: '1.0.0',
//     // platform: 'Web',
//     // os_name: 'Chrome',
//     // os_version: '128',
//     // device_model: 'Mac+OS',
//     // language: 'en-US',
//     // user_properties: {},
//     // uuid: '62fe25a7-27d0-4243-9a2f-a8ba6faefaf4',
//     // library: { name: '@cbhq/client-analytics', version: '10.6.0' },
//     // sequence_number: 14104,
//     // user_agent:
//     //   'Mozilla/5.0+(Macintosh;+Intel+Mac+OS+X+10_15_7)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/128.0.0.0+Safari/537.36',
//   },
// ];

type ServerSideEvent = {
  eventType: string;
  deviceId?: string;
  eventProperties: {
    action: string;
    context: string;
    componentType: string;
    projectName: string;
    pagePath?: string;
    error?: string;
    platform?: string;
    locale?: string | null;
    sessionLccId?: string | null;
    timeStart?: number;
    pageKey?: string;
    prevPageKey?: string;
    prevPagePath?: string;
    hasDoubleFired?: boolean;
    sessionUuid?: string;
    height?: number;
    width?: number;
    auth?: number;
  },
  userId?: string | null;
  timestamp?: number;
  eventId?: number;
  sessionId?: number;
  versionName?: string;
  platform?: string;
  osName?: string;
  osVersion?: number;
  deviceModel?: string;
  language?: string;
  userProperties?: unknown;
  uuid?: string;
  sequenceNumber?: number;
  userAgent?: unknown;
  // library?: { name: '@cbhq/client-analytics', version: '10.6.0' },

}

export default function logServerSideEvent(event: ServerSideEvent) {
  // TODO: need to convert keys from camel to snake case
  const cleanEvent = convertKeys(event);
  const stringifiedEvent = JSON.stringify([cleanEvent]);
  const uploadTime = new Date().getTime().toString();

  const checksum = md5(stringifiedEvent + uploadTime);

  const eventData = {
    e: stringifiedEvent,
    // client: amplitudeApiKey as string,
    client: analyticsConfig.amplitudeApiKey.prod,
    checksum,
  };

  // const postUrl = serverSideAnalyticsURL as string;
  const postUrl = analyticsConfig.serverSideAnalyticsURL.prod;
  const fetchConfig = {
    method: 'POST',
    body: JSON.stringify(eventData),
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(JSON.stringify(fetchConfig));

  fetch(postUrl, fetchConfig)
    .then(async (res) => {
      console.log('Full response:', res);
      console.log('Response status:', res.status);
      return res.text();
    })
    .then((data) => {
      console.log('Response body:', data);
    })
    .catch((error) => console.error('analytics call failed', error));
}

function convertKeys(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      camelToSnakeCase(key),
      convertKeys(value)
    ])
  )
}

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
