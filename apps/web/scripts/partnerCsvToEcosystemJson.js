const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const csvFilePath = path.join(__dirname, 'partners.csv');
const outputFile = path.join(__dirname, '../src/data/ecosystem.json');

// Function to convert a string to snake_case
function toSnakeCase(str) {
  return str.toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, '');
}

// Function to process each row of the CSV
function processRow(row) {
  return {
    name: row.Name,
    url: row['Link to Project'],
    description: row.Description,
    tags: [row.Category.toLowerCase().replace('infrastructure', 'infra')],
    imageUrl: `/images/partners/${toSnakeCase(row.Name)}.png`,
  };
}

// Main function to read CSV, process data, and write JSON file
function generateEcosystemJson() {
  const jsonArray = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const dapp = processRow(row);
      jsonArray.push(dapp);
    })
    .on('end', () => {
      fs.writeFile(outputFile, JSON.stringify(jsonArray, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing ecosystem.json:', err);
        } else {
          console.log('Ecosystem.json written successfully');
        }
      });
    })
    .on('error', (err) => {
      console.error('Error reading CSV file:', err);
    });
}

generateEcosystemJson();
