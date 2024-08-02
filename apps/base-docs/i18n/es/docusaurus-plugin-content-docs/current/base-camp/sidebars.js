const sidebars = {
  docs: [
    ['docs/bienvenida'],
    {
      type: 'category',
      label: 'Introducción a Ethereum',
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
          label: 'Guía de Base',
          href: 'https://www.coinbase.com/cloud/discover/protocol-guides/guide-to-base',
          className: 'sidebar-reading',
        },
      ],
    },
    {
      type: 'category',
      label: 'Herramientas de Desarrollo',
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
      label: 'Desarrollo con Hardhat',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Configuración y Visión General de Hardhat',
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
          label: 'Pruebas con Typescript',
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
          label: 'Desplegando Contratos Inteligentes',
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
          label: 'Verificando Contratos Inteligentes',
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
          label: 'Forking de Mainnet',
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
      label: 'Desarrollo con Foundry',
      collapsible: true,
      items: [
        {
          type: 'link',
          label: 'Introducción a Foundry',
          href: 'https://docs.base.org/tutorials/intro-to-foundry-setup',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Pruebas de contratos inteligentes con Foundry',
          href: 'https://docs.base.org/tutorials/intro-to-foundry-testing',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Desarrollo de Contratos Inteligentes',
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
          label: 'Introducción a Solidity',
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
          label: 'Contratos y Funciones Básicas',
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
          label: 'Despliegue en una Testnet',
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
          label: 'Estructuras de Control',
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
          label: 'Almacenamiento en Solidity',
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
          label: 'Arreglos en Solidity',
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
          label: 'El Tipo Mapping',
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
          label: 'Funciones Avanzadas',
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
          label: 'Herencia',
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
          label: 'Errores',
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
          label: 'La palabra clave `new`',
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
          label: 'Interacciones Contrato a Contrato',
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
          label: 'Eventos',
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
          label: 'Dirección y Pagable',
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
      label: 'Desarrollo de Tokens',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Introducción a Tokens',
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
          label: 'Tokens Mínimos',
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
          label: 'Tokens ERC-20',
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
          label: 'Tokens ERC-721',
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
      label: 'Herramientas y Pruebas de Hardhat',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/hardhat-tools-and-testing/overview',
          className: 'sidebar-reading',
        },
        {
          type: 'link',
          label: 'Perfilado de Gas',
          href: 'https://docs.base.org/tutorials/hardhat-profiling-gas',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Perfilado de Tamaño',
          href: 'https://docs.base.org/tutorials/hardhat-profiling-size',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Depuración',
          href: 'https://docs.base.org/tutorials/hardhat-debugging',
          className: 'sidebar-coding',
        },
        {
          type: 'link',
          label: 'Cobertura de Pruebas',
          href: 'https://docs.base.org/tutorials/hardhat-test-coverage',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Desarrollo de Aplicaciones Onchain (Frontend)',
      collapsible: true,
      items: [
        {
          type: 'doc',
          id: 'docs/frontend-setup/overview',
          className: 'sidebar-reading',
        },
        {
          type: 'category',
          label: 'Configuración del Frontend',
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
          label: 'Conectando con la Blockchain',
          href: 'https://docs.base.org/tutorials/intro-to-providers',
          className: 'sidebar-coding',
        },
        {
          type: 'category',
          label: 'Lectura y Visualización de Datos',
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
          label: 'Escribiendo en Contratos',
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
    ['docs/ejercicio-contratos'],
  ],
};

module.exports = sidebars;
