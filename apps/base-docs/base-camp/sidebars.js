const sidebars = {
  docs: [
    {
      type: 'doc',
      id: 'docs/welcome',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Introduction to Ethereum',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/intro-to-ethereum-vid',
          label: 'Intro to Ethereum (Video)',
          className: 'sidebar-video',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/ethereum-dev-overview-vid',
          label: 'Ethereum Dev Overview (Video)',
          className: 'sidebar-video',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/ethereum-applications',
          label: 'Ethereum Applications',
          className: 'sidebar-reading',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/gas-use-in-eth-transactions',
          label: 'Gas Use in ETH Transactions',
          className: 'sidebar-reading',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-ethereum/evm-diagram',
          label: 'EVM Diagram',
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
          label: 'Overview',
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
              label: 'Hardhat Overview (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-setup-overview/creating-a-project-vid',
              label: 'Creating a Project (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-setup-overview/hardhat-setup-overview-sbs',
              label: 'Hardhat Setup Overview (Step-by-Step)',
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
              label: 'Testing Overview (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-testing/writing-tests-vid',
              label: 'Writing Tests (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-testing/contract-abi-and-testing-vid',
              label: 'Contract ABI and Testing (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-testing/hardhat-testing-sbs',
              label: 'Hardhat Testing (Step-by-Step)',
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
              label: 'Etherscan (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/etherscan/etherscan-vid',
              label: 'Etherscan (Video)',
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
              label: 'Installing Hardhat Deploy (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/setup-deploy-script-vid',
              label: 'Setup Deploy Script (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/testing-our-deployment-vid',
              label: 'Testing Our Deployment (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/test-network-configuration-vid',
              label: 'Test Network Configuration (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/deployment-vid',
              label: 'Deployment (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-deploy/hardhat-deploy-sbs',
              label: 'Hardhat Deploy (Step-by-Step)',
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
              label: 'Hardhat Verify (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-verify/hardhat-verify-sbs',
              label: 'Hardhat Verify (Step-by-Step)',
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
              label: 'Mainnet Forking (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-forking/hardhat-forking',
              label: 'Hardhat Forking',
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
          label: 'Testing Smart Contracts with Foundry',
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
          label: 'Introduction to Solidity Overview',
          className: 'sidebar-reading',
        },
        {
          type: 'doc',
          id: 'docs/introduction-to-solidity/anatomy-of-a-smart-contract-vid',
          label: 'Anatomy of a Smart Contract (Video)',
          className: 'sidebar-video',
        },
        {
          type: 'category',
          label: 'Introduction to Solidity',
          items: [
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/introduction-to-solidity-vid',
              label: 'Introduction to Solidity (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/solidity-overview',
              label: 'Solidity Overview',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/introduction-to-remix-vid',
              label: 'Introduction to Remix (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/introduction-to-remix',
              label: 'Introduction to Remix',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/deployment-in-remix-vid',
              label: 'Deployment in Remix (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/introduction-to-solidity/deployment-in-remix',
              label: 'Deployment in Remix (Step-by-Step)',
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
              label: 'Intro to Contracts (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/hello-world-step-by-step',
              label: 'Hello World (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/basic-types',
              label: 'Basic Types',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/contracts-and-basic-functions/basic-functions-exercise',
              label: 'Basic Functions (Exercise)',
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
              label: 'Overview of Test Networks (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/test-networks',
              label: 'Test Networks',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/deployment-to-base-sepolia-sbs',
              label: 'Deployment to Base Sepolia (Step-by-Step)',
              className: 'sidebar-stepbystep',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/contract-verification-sbs',
              label: 'Contract Verification (Step-by-Step)',
              className: 'sidebar-stepbystep',
            },
            {
              type: 'doc',
              id: 'docs/deployment-to-testnet/deployment-to-testnet-exercise',
              label: 'Deployment to Testnet (Exercise)',
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
              label: 'Standard Control Structures (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/loops-vid',
              label: 'Loops (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/require-revert-error-vid',
              label: 'Require, Revert, and Error (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/control-structures',
              label: 'Control Structures',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/control-structures/control-structures-exercise',
              label: 'Control Structures (Exercise)',
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
              label: 'Simple Storage (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/storage/simple-storage-sbs',
              label: 'Simple Storage (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/storage/how-storage-works-video',
              label: 'How Storage Works (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/storage/how-storage-works',
              label: 'How Storage Works',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/storage/storage-exercise',
              label: 'Storage (Exercise)',
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
              label: 'Arrays in Solidity (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/writing-arrays-in-solidity-vid',
              label: 'Writing Arrays in Solidity (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/arrays-in-solidity',
              label: 'Arrays in Solidity',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/arrays/filtering-an-array-sbs',
              label: 'Filtering an Array (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/arrays/fixed-size-arrays-vid',
              label: 'Fixed Size Arrays (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/array-storage-layout-vid',
              label: 'Array Storage Layout (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/arrays/arrays-exercise',
              label: 'Arrays (Exercise)',
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
              label: 'Mappings (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/mappings/using-msg-sender-vid',
              label: 'Using msg.sender (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/mappings/mappings-sbs',
              label: 'Mappings (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/mappings/how-mappings-are-stored-vid',
              label: 'How Mappings Are Stored (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/mappings/mappings-exercise',
              label: 'Mappings (Exercise)',
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
              label: 'Function Visibility (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-visibility',
              label: 'Function Visibility',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-modifiers-vid',
              label: 'Function Modifiers (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/advanced-functions/function-modifiers',
              label: 'Function Modifiers',
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
              label: 'Structs (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/structs/structs-sbs',
              label: 'Structs (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/structs/structs-exercise',
              label: 'Structs (Exercise)',
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
              label: 'Inheritance (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/inheritance-sbs',
              label: 'Inheritance (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/multiple-inheritance-vid',
              label: 'Multiple Inheritance (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/multiple-inheritance',
              label: 'Multiple Inheritance',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/abstract-contracts-vid',
              label: 'Abstract Contracts (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/abstract-contracts-sbs',
              label: 'Abstract Contracts (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/inheritance/inheritance-exercise',
              label: 'Inheritance (Exercise)',
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
              label: 'Imports (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/imports/imports-sbs',
              label: 'Imports (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/imports/imports-exercise',
              label: 'Imports (Exercise)',
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
              label: 'Error Triage (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/error-triage/error-triage',
              label: 'Error Triage',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/error-triage/error-triage-exercise',
              label: 'Error Triage (Exercise)',
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
              label: 'Creating a New Contract (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/new-keyword/new-keyword-sbs',
              label: 'The `new` Keyword (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/new-keyword/new-keyword-exercise',
              label: 'The `new` Keyword (Exercise)',
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
              label: 'Intro to Interfaces (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/interfaces/calling-another-contract-vid',
              label: 'Calling Another Contract (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/interfaces/testing-the-interface-vid',
              label: 'Testing the Interface (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/interfaces/contract-to-contract-interaction',
              label: 'Contract to Contract Interaction',
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
              label: 'Hardhat Events (Step-by-Step)',
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
              label: 'Address and Payable',
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
              label: 'Intro to Tokens (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/intro-to-tokens/misconceptions-about-tokens-vid',
              label: 'Misconceptions About Tokens (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/intro-to-tokens/tokens-overview',
              label: 'Tokens Overview',
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
              label: 'Creating a Minimal Token (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/minimal-tokens/transferring-a-minimal-token-vid',
              label: 'Transferring a Minimal Token (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/minimal-tokens/minimal-token-sbs',
              label: 'Minimal Token (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/minimal-tokens/minimal-tokens-exercise',
              label: 'Minimal Tokens (Exercise)',
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
              label: 'Analyzing ERC-20 (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-standard',
              label: 'ERC-20 Standard',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/openzeppelin-erc-20-vid',
              label: 'OpenZeppelin ERC-20 (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-testing-vid',
              label: 'ERC-20 Testing (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-token-sbs',
              label: 'ERC-20 Token (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/erc-20-token/erc-20-exercise',
              label: 'ERC-20 (Exercise)',
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
              label: 'ERC-721 Standard (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-standard',
              label: 'ERC-721 Standard',
              className: 'sidebar-reading',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-on-opensea-vid',
              label: 'ERC-721 on OpenSea (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/openzeppelin-erc-721-vid',
              label: 'OpenZeppelin ERC-721 (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/implementing-an-erc-721-vid',
              label: 'Implementing an ERC-721 (Video)',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-sbs',
              label: 'ERC-721 (Step-by-Step)',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/erc-721-token/erc-721-exercise',
              label: 'ERC-721 (Exercise)',
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
          label: 'Overview',
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
          label: 'Overview',
          className: 'sidebar-reading',
        },
        {
          type: 'category',
          label: 'Frontend Setup',
          items: [
            {
              type: 'doc',
              id: 'docs/frontend-setup/wallet-connectors',
              label: 'Wallet Connectors',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/frontend-setup/building-an-onchain-app',
              label: 'Building an Onchain App',
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
              label: 'useAccount',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/reading-and-displaying-data/useReadContract',
              label: 'useReadContract',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/reading-and-displaying-data/configuring-useReadContract',
              label: 'Configuring useReadContract',
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
              label: 'useWriteContract',
              className: 'sidebar-coding',
            },
            {
              type: 'doc',
              id: 'docs/writing-to-contracts/useSimulateContract',
              label: 'useSimulateContract',
              className: 'sidebar-coding',
            },
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'docs/exercise-contracts',
      label: 'Exercise Contracts',
    },
  ],
};

module.exports = sidebars;
