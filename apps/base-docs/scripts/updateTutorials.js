const yaml = require('js-yaml');
const fs = require('fs');
const { readFile } = require('fs/promises');
const path = require('path');

const tutorialsDir = path.join(__dirname, '..', 'tutorials', 'docs');

async function getDuration(filePath) {
  try {
    let content = await readFile(filePath, 'utf8');
    const words = content.trim().split(/\s+/).length;
    const averageReadingSpeed = 225; // Average between 200 and 250 wpm
    const readingTimeMinutes = (words / averageReadingSpeed) * 2; // Double estimated time

    const hours = Math.floor(readingTimeMinutes / 60);
    const minutes = Math.round(readingTimeMinutes % 60);

    let timeString = '';
    if (hours > 0) {
      timeString += `${hours} hrs `;
    }
    timeString += `${minutes} mins`;

    return `${timeString}`;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

async function getLastUpdated(filePath) {
  try {
    const stats = await fs.promises.stat(filePath);
    const lastModified = stats.mtime;

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
    const month = months[lastModified.getMonth()];
    const day = lastModified.getDate();

    return `${month} ${day}`;
  } catch (error) {
    console.error('Error getting file stats:', error);
    return null;
  }
}

(async () => {
  const tutorials = {};
  try {
    const files = await fs.promises.readdir(tutorialsDir);
    for (const file of files) {
      const tutorialsPath = path.join(tutorialsDir, file);
      const tutorialsStat = await fs.promises.stat(tutorialsPath);
      if (tutorialsStat.isDirectory()) {
        // const files = await fs.promises.readdir(tutorialsPath);
        // for (const file of files) {
        //   const tutorialPath = path.join(tutorialsPath, file);
        //   const tutorialStat = await fs.promises.stat(tutorialPath);
        //   if (tutorialStat.isFile()) {
        //     let content = await readFile(tutorialPath, 'utf8');
        //     content = content.split('---\n')[1];
        //     const frontMatter = yaml.load(content);
        //     tutorials[frontMatter.slug.substring(1)] = frontMatter;
        //   }
        // }
      } else if (tutorialsStat.isFile()) {
        let content = await readFile(tutorialsPath, 'utf8');
        content = content.split('---\n')[1];
        const frontMatter = yaml.load(content);
        tutorials[frontMatter.slug.substring(1)] = frontMatter;
        tutorials[frontMatter.slug.substring(1)].last_updated = await getLastUpdated(tutorialsPath);
        tutorials[frontMatter.slug.substring(1)].duration = await getDuration(tutorialsPath);
      }
    }
  } catch (e) {
    console.error('Error updating tutorial data.', e);
  }
  const outputFilePath = path.join(__dirname, '..', 'tutorials', 'data.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(tutorials, null, 4));
})();
