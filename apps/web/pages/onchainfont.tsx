import { NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const filePath = path.resolve('./public/downloads', 'BritneyOnchain.zip');

  res.setHeader('Content-Disposition', 'attachment; filename=BritneyOnchain.zip');
  res.setHeader('Content-Type', 'application/octet-stream');

  return new Promise((resolve, reject) => {
    // Create a readable stream
    const fileStream = fs.createReadStream(filePath);

    // Pipe the file stream to the response
    fileStream.pipe(res);

    // Handle stream events
    fileStream.on('end', () => {
      res.end();
      resolve({ props: {} });
    });

    fileStream.on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
}

function OnchainFont() {
  return null;
}

export default OnchainFont;
