const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

console.log('Running install-custom-dependency.js');

const useCustomRegistry = process.env.USE_CUSTOM_REGISTRY === 'true';
const packageJsonPath = path.resolve(
  __dirname,
  'node_modules/@cbhq/config-service-node/package.json',
);

// Check if the custom dependency is already installed
const isDependencyInstalled = fs.existsSync(packageJsonPath);

if (useCustomRegistry && !isDependencyInstalled) {
  console.log('Installing custom dependency from custom registry...');
  execSync('yarn add @cbhq/config-service-node@0.0.8', {
    stdio: 'inherit',
  });
} else {
  console.log('Skipping custom dependency installation.');
}
