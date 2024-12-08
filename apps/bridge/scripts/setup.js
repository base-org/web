const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const envFile = path.join(__dirname, '..', '.env');
const envExample = path.join(__dirname, '..', '.env.sepolia.example');

// Copy .env.sepolia.example to .env if it doesn't exist
if (!fs.existsSync(envFile)) {
  fs.copyFileSync(envExample, envFile);
  console.log(chalk.green('✓ Created .env file from .env.sepolia.example'));
}

// Read .env file
const envContent = fs.readFileSync(envFile, 'utf8');

// Check if WALLET_CONNECT_PROJECT_ID is set
if (!envContent.match(/WALLET_CONNECT_PROJECT_ID=[\w-]+/)) {
  console.log(chalk.yellow('\n⚠️  Warning: WALLET_CONNECT_PROJECT_ID is not set'));
  console.log(chalk.white('\nTo fix this:'));
  console.log(chalk.white('1. Get a project ID from https://cloud.walletconnect.com'));
  console.log(chalk.white('2. Add it to your .env file:'));
  console.log(chalk.white('   WALLET_CONNECT_PROJECT_ID=your_project_id_here\n'));
}
