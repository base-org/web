const yaml = require('js-yaml');
const fs = require('fs');
const { readFile, readdir, stat } = fs.promises;
const path = require('path');
const crypto = require('crypto');

const tutorialsDir = path.join(__dirname, '..', 'tutorials', 'docs');
const outputFilePath = path.join(__dirname, '..', 'tutorials', 'data.json');

async function getDuration(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const words = content.trim().split(/\s+/).length;
    const averageReadingSpeed = 225;
    const readingTimeMinutes = (words / averageReadingSpeed) * 2;

    const hours = Math.floor(readingTimeMinutes / 60);
    const minutes = Math.round(readingTimeMinutes % 60);

    let timeString = '';
    if (hours > 0) {
      timeString += `${hours} hr `;
    }
    timeString += `${minutes} min`;

    return `${timeString} read`;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

async function formatDate(date) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

async function calculateChecksum(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

(async () => {
  const tutorials = {};
  let existingData = {};

  try {
    existingData = JSON.parse(await readFile(outputFilePath, 'utf8'));
  } catch (e) {
    console.error('Failed to read existing data:', e);
  }

  try {
    const files = await readdir(tutorialsDir);
    for (const file of files) {
      const tutorialsPath = path.join(tutorialsDir, file);
      const tutorialsStat = await stat(tutorialsPath);
      if (tutorialsStat.isFile()) {
        let content = await readFile(tutorialsPath, 'utf8');
        const frontMatter = yaml.load(content.split('---\n')[1]);
        const slug = path.parse(file).name;
        const checksum = await calculateChecksum(tutorialsPath);
        const currentDate = new Date();

        if (!existingData[slug] || existingData[slug].checksum !== checksum) {
          tutorials[slug] = {
            ...frontMatter,
            last_updated: await formatDate(currentDate),
            duration: await getDuration(tutorialsPath),
            checksum: checksum,
          };
        } else {
          tutorials[slug] = existingData[slug];
        }
      }
    }
  } catch (e) {
    console.error('Error updating tutorial data:', e);
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(tutorials, null, 4));
})();
