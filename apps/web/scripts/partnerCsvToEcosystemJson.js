const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const jsonArray = [];

const csvFilePath = path.join(__dirname, 'partners.csv'); // Replace with your actual CSV file name

function toSnakeCase(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
}

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const dapp = {};
    dapp.name = row.Name;
    dapp.url = row['Link to Project'];
    dapp.description = row.Description;
    dapp.tags = [row.Category.toLowerCase().replace('infrastructure', 'infra')];
    dapp.imageUrl = `/images/partners/${toSnakeCase(dapp.name)}.png`;
    jsonArray.push(dapp);
  })
  .on('end', () => {
    fs.writeFile(
      path.join(__dirname, '../src/data/ecosystem.json'),
      JSON.stringify(jsonArray, null, 2),
      'utf8',
      (err) => {
        if (err) throw err;
        console.log('Ecosystem.json written');
      },
    );
  });
