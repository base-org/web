import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { NextApiResponse, NextApiRequest } from 'next';

export const ALLOWED_IMAGE_TYPE = [
  'image/svg+xml',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGE_SIZE_IN_MB = 1; // max 1mb

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body as HandleUploadBody;
  const username = request.query.username;
  if (!username) return;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // TODO: We can maybe compare username to an address for additional security
        //       Currently this endpoints allows anonymous upload

        return {
          allowedContentTypes: ALLOWED_IMAGE_TYPE,
          tokenPayload: JSON.stringify({
            username: username,
          }),
        };
      },
      onUploadCompleted: async () => {
        // TODO: Maybe analytics?
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: (error as Error).message });
  }
}
