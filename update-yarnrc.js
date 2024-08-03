const fs = require('fs');
const path = require('path');
require('dotenv').config();

const useCustomRegistry = process.env.USE_CUSTOM_REGISTRY === 'true';
const yarnrcPath = path.resolve(__dirname, '.yarnrc.yml');

console.log('Running update-yarnrc.js');

let yarnrcContent = `enableGlobalCache: false

enableTelemetry: false

nodeLinker: node-modules

npmRegistryServer: "https://registry.npmjs.org/"

plugins:
  - path: .yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs
    spec: "@yarnpkg/plugin-interactive-tools"
  - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
    spec: "@yarnpkg/plugin-workspace-tools"

yarnPath: .yarn/releases/yarn-3.5.0.cjs

`;

if (useCustomRegistry) {
  yarnrcContent += `
npmScopes:
  cbhq:
    npmRegistryServer: "https://registry-npm.cbhq.net"
  cb:
    npmRegistryServer: "https://registry-npm.cbhq.net"
`;
} else {
  console.log('Using default registry');
}

fs.writeFileSync(yarnrcPath, yarnrcContent, 'utf8');
