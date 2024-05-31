import { NextApiResponse } from 'next';

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const fileUrl = 'https://base.org/downloads/BritneyOnchain.zip';
  const fileName = 'BritneyOnchain.zip';

  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-Type', 'application/octet-stream');

  const response = await fetch(fileUrl);
  const buffer = await response.arrayBuffer();

  res.write(Buffer.from(buffer));
  res.end();

  return {
    props: {},
  };
}

const OnchainFont = () => {
  return null;
};

export default OnchainFont;
