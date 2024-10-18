'use server';

import { OAuth2Client } from 'google-auth-library';

type AccessCredentials = {
  access_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
  refresh_token: string;
};

type OAuthRefreshResponse = {
  credentials: AccessCredentials;
  res: unknown;
};

const CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLOUD_CLIENT_SECRET;
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';
const REFRESH_TOKEN = process.env.GOOGLE_SHEETS_REFRESH_TOKEN;

export async function getAccessToken() {
  try {
    const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const { credentials } = (await oauth2Client.refreshAccessToken()) as OAuthRefreshResponse;
    return credentials.access_token;
  } catch (err) {
    throw new Error('Could not get new access token.');
  }
}
