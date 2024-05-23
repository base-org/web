const yaml = require('js-yaml');
const fs = require('fs');
const { readFile } = require('fs/promises');
const path = require('path');

const tutorialsDir = path.join(__dirname, '..', 'tutorials', 'docs');

async function getDuration(filePath) {
  try {
    let content = await readFile(filePath, 'utf8');
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

async function getLastUpdated(filePath) {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.mtime;
  } catch (error) {
    console.error('Error getting file stats:', error);
    return null;
  }
}

async function formatDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

(async () => {
  const tutorials = {};
  const outputFilePath = path.join(__dirname, '..', 'tutorials', 'data.json');
  let existingData = {};

  try {
    existingData = JSON.parse(await readFile(outputFilePath, 'utf8'));
  } catch (e) {
    console.error('Failed to read existing data:', e);
  }

  try {
    const files = await fs.promises.readdir(tutorialsDir);
    for (const file of files) {
      const tutorialsPath = path.join(tutorialsDir, file);
      const tutorialsStat = await fs.promises.stat(tutorialsPath);
      if (tutorialsStat.isFile()) {
        let content = await readFile(tutorialsPath, 'utf8');
        content = content.split('---\n')[1];
        const frontMatter = yaml.load(content);
        const slug = frontMatter.slug.substring(1);
        const lastUpdated = await getLastUpdated(tutorialsPath);

        if (!existingData[slug] || existingData[slug].last_updated !== lastUpdated.toISOString()) {
          tutorials[slug] = frontMatter;
          tutorials[slug].last_updated = await formatDate(lastUpdated);
          tutorials[slug].duration = await getDuration(tutorialsPath);
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
