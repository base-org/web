const sidebars = {
  docs: [
    {
      type: 'doc',
      id: 'docs/help-on-discord',
    },
    ['docs/welcome'],
    {
      type: 'category',
      label: 'Introduction to Ethereum',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/intro-to-ethereum-vid',
          className: 'sidebar-video',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/ethereum-dev-overview-vid',
          className: 'sidebar-video',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/ethereum-applications',
          className: 'sidebar-reading',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/gas-use-in-eth-transactions',
          className: 'sidebar-reading',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/evm-diagram',
          className: 'sidebar-reading',
        },
        {
          type: 'link',
          label: 'Guide to Base',
          href: 'https://www.coinbase.com/cloud/discover/protocol-guides/guide-to-base',
          className: 'sidebar-reading',
        },
      ],
    },
    {
      type: 'category',
      label: 'Development Tools',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/development-tools/overview',
        },
      ],
    },
    {
      type: 'category',
      label: 'Development with Hardhat',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Hardhat Setup and Overview',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-setup-overview/hardhat-overview-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-setup-overview/creating-a-project-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-setup-overview/hardhat-setup-overview-sbs',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Testing with Typescript',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-testing/testing-overview-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-testing/writing-tests-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-testing/contract-abi-and-testing-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-testing/hardhat-testing-sbs',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Etherscan',
          items: [
            {
              type: 'doc',
              id: 'docs/etherscan/etherscan-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/etherscan/etherscan-vid',
              className: 'sidebar-video',
            },
          ],
        },
        {
          type: 'category',
          label: 'Deploying Smart Contracts',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/installing-hardhat-deploy-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/setup-deploy-script-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/testing-our-deployment-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/test-network-configuration-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/deployment-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/hardhat-deploy-sbs',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Verifying Smart Contracts',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-verify/hardhat-verify-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-verify/hardhat-verify-sbs',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Mainnet Forking',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-forking/mainnet-forking-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-forking/hardhat-forking',
              className: 'sidebar-coding',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Development With Foundry',
      collapsible: true,
      items: [
        {
          type: 'link',
          label: 'Introduction to Foundry',
          href: 'https://docs.base.org/tutorials/intro-to-foundry-setup',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Testing smart contracts with Foundry',
          href: 'https://docs.base.org/tutorials/intro-to-foundry-testing',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Smart Contract Development',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/introduction-to-solidity/introduction-to-solidity-overview',
          className: 'sidebar-reading',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-solidity/anatomy-of-a-smart-contract-vid',
          className: 'sidebar-video',
        },
        {
          type: 'category',
          label: 'Introduction to Solidity',
          items: [
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/introduction-to-solidity-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/solidity-overview',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/introduction-to-remix-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/introduction-to-remix',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/deployment-in-remix-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/deployment-in-remix',
              className: 'sidebar-stepbystep',
            },
          ],
        },
        {
          type: 'category',
          label: 'Contracts and Basic Functions',
          items: [
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/intro-to-contracts-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/hello-world-step-by-step',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/basic-types',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/basic-functions-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Deploying to a Testnet',
          items: [
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/overview-of-test-networks-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/test-networks',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/deployment-to-base-sepolia-sbs',
              className: 'sidebar-stepbystep',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/contract-verification-sbs',
              className: 'sidebar-stepbystep',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/deployment-to-testnet-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Control Structures',
          items: [
            {
              type: 'doc',
              id: 'docs/control-structures/standard-control-structures-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/loops-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/require-revert-error-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/control-structures',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/control-structures-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Storage in Solidity',
          items: [
            {
              type: 'doc',
              id: 'docs/storage/simple-storage-video',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/storage/simple-storage-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/storage/how-storage-works-video',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/storage/how-storage-works',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/storage/storage-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Arrays in Solidity',
          items: [
            {
              type: 'doc',
              id: 'docs/arrays/arrays-in-solidity-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/writing-arrays-in-solidity-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/arrays-in-solidity',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/arrays/filtering-an-array-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/arrays/fixed-size-arrays-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/array-storage-layout-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/arrays-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'The Mapping Type',
          items: [
            {
              type: 'doc',
              id: 'docs/mappings/mappings-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/mappings/using-msg-sender-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/mappings/mappings-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/mappings/how-mappings-are-stored-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/mappings/mappings-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Advanced Functions',
          items: [
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-visibility-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-visibility',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-modifiers-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-modifiers',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Structs',
          items: [
            {
              type: 'doc',
              id: 'docs/structs/structs-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/structs/structs-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/structs/structs-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Inheritance',
          items: [
            {
              type: 'doc',
              id: 'docs/inheritance/inheritance-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/inheritance-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/multiple-inheritance-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/multiple-inheritance',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/abstract-contracts-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/abstract-contracts-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/inheritance-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Imports',
          items: [
            {
              type: 'doc',
              id: 'docs/imports/imports-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/imports/imports-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/imports/imports-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Errors',
          items: [
            {
              type: 'doc',
              id: 'docs/error-triage/error-triage-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/error-triage/error-triage',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/error-triage/error-triage-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'The `new` Keyword',
          items: [
            {
              type: 'doc',
              id: 'docs/new-keyword/creating-a-new-contract-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/new-keyword/new-keyword-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/new-keyword/new-keyword-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'Contract to Contract Interactions',
          items: [
            {
              type: 'doc',
              id: 'docs/interfaces/intro-to-interfaces-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/interfaces/calling-another-contract-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/interfaces/testing-the-interface-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/interfaces/contract-to-contract-interaction',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Events',
          items: [
            {
              type: 'doc',
              id: 'docs/events/hardhat-events-sbs',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Address and Payable',
          items: [
            {
              type: 'doc',
              id: 'docs/address-and-payable/address-and-payable',
              className: 'sidebar-coding',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Token Development',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Introduction to Tokens',
          items: [
            {
              type: 'doc',
              id: 'docs/intro-to-tokens/intro-to-tokens-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/intro-to-tokens/misconceptions-about-tokens-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/intro-to-tokens/tokens-overview',
              className: 'sidebar-reading',
            },
          ],
        },
        {
          type: 'category',
          label: 'Minimal Tokens',
          items: [
            {
              type: 'doc',
              id: 'docs/minimal-tokens/creating-a-minimal-token-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/minimal-tokens/transferring-a-minimal-token-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/minimal-tokens/minimal-token-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/minimal-tokens/minimal-tokens-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'ERC-20 Tokens',
          items: [
            {
              type: 'doc',
              id: 'docs/erc-20-token/analyzing-erc-20-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-standard',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/openzeppelin-erc-20-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-testing-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-token-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
        {
          type: 'category',
          label: 'ERC-721 Tokens',
          items: [
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-standard-video',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-standard',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-on-opensea-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/openzeppelin-erc-721-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/implementing-an-erc-721-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-sbs',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-exercise',
              className: 'sidebar-exercise',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hardhat Tools and Testing',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/hardhat-tools-and-testing/overview',
          className: 'sidebar-reading',
        },
        {
          type: 'link',
          label: 'Profiling Gas',
          href: 'https://docs.base.org/tutorials/hardhat-profiling-gas',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Profiling Size',
          href: 'https://docs.base.org/tutorials/hardhat-profiling-size',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Debugging',
          href: 'https://docs.base.org/tutorials/hardhat-debugging',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Test Coverage',
          href: 'https://docs.base.org/tutorials/hardhat-test-coverage',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Onchain App Development (Frontend)',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/frontend-setup/overview',
          className: 'sidebar-reading',
        },
        {
          type: 'category',
          label: 'Frontend Setup',
          items: [
            {
              type: 'doc',
              id: 'docs/frontend-setup/wallet-connectors',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/frontend-setup/building-an-onchain-app',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'link',
          label: 'Connecting to the Blockchain',
          href: 'https://docs.base.org/tutorials/intro-to-providers',
          className: 'sidebar-coding',
        },
        {
          type: 'category',
          label: 'Reading and Displaying Data',
          items: [
            {
              type: 'doc',
              id: 'docs/reading-and-displaying-data/useAccount',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/reading-and-displaying-data/useReadContract',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/reading-and-displaying-data/configuring-useReadContract',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Writing to Contracts',
          items: [
            {
              type: 'doc',
              id: 'docs/writing-to-contracts/useWriteContract',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/writing-to-contracts/useSimulateContract',
              className: 'sidebar-coding',
            },
          ],
        },
      ],
    },
    ['docs/exercise-contracts'],
  ],
};

module.exports = sidebars;
