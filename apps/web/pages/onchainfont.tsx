import { NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const filePath = path.resolve('./public/downloads', 'BritneyOnchain.zip');

  res.setHeader('Content-Disposition', 'attachment; filename=BritneyOnchain.zip');
  res.setHeader('Content-Type', 'application/octet-stream');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  return {
    props: {},
  };
}

function OnchainFont() {
  return null;
}

export default OnchainFont;
