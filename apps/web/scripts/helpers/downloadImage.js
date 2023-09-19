const fs = require('fs');

async function downloadImage(entry) {
  if (!entry.avatarUri) return undefined;

  const path = `./public/images/avatars/${entry.ensName}`;
  console.log(path);

  // catch embedded SVGs
  if (entry.avatarUri.startsWith('data:image')) {
    const buff = Buffer.from(
      entry.avatarUri.replace(/^data:image\/svg\+xml;base64,/, ''),
      'base64',
    );
    fs.writeFileSync(`${path}.svg`, buff);
    return `${entry.ensName}.svg`;
  }

  const response = await fetch(entry.avatarUri);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(`${path}.png`, buffer);
  return `${entry.ensName}.png`;
}

module.exports = { downloadImage };
