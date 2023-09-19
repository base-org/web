require('dotenv').config({ path: `.env.local`, override: true });
require('./helpers/fetchPolyfill');

const fs = require('fs');
const { getBaseCoreContributors } = require('./helpers/getBaseCoreContributors');
const { downloadImage } = require('./helpers/downloadImage');

async function main() {
  const contributors = await getBaseCoreContributors();

  for (const entry of contributors) {
    // eslint-disable-next-line no-continue
    if (!entry.avatarUri) continue;

    // eslint-disable-next-line no-await-in-loop
    const filename = await downloadImage(entry);
    if (filename) {
      entry.filename = filename;
    }
  }

  fs.writeFileSync(
    './src/components/CoreContributors/CoreContributors.json',
    JSON.stringify(contributors),
  );
  console.log('========================');
  console.log('Contributor list updated successfully');
}

main();
