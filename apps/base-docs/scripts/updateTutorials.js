const yaml = require('js-yaml');
const fs = require('fs');
const { readFile } = require('fs/promises');
const path = require('path');

const tutorialsDir = path.join(__dirname, '..', 'tutorials', 'docs');

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
      }
    }
  } catch (e) {
    console.error('Error updating tutorial data.', e);
  }
  const outputFilePath = path.join(__dirname, '..', 'tutorials', 'data.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(tutorials, null, 4));
})();
