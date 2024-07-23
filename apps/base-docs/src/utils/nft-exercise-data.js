/* eslint-disable */
import { useAccount } from 'wagmi';
import arraysGoerli from '../../base-learn/assets/deployments/base-goerli/ArraysUT.json';
import basicMathGoerli from '../../base-learn/assets/deployments/base-goerli/BasicMathUnitTest.json';
import controlStructuresGoerli from '../../base-learn/assets/deployments/base-goerli/ControlStructuresUT.json';
import erc20Goerli from '../../base-learn/assets/deployments/base-goerli/ERC20UT.json';
import erc721Goerli from '../../base-learn/assets/deployments/base-goerli/ERC721UT.json';
import errorGoerli from '../../base-learn/assets/deployments/base-goerli/ErrorTriageUT.json';
import importsGoerli from '../../base-learn/assets/deployments/base-goerli/ImportsUT.json';
import inheritanceGoerli from '../../base-learn/assets/deployments/base-goerli/InheritanceUnitTest.json';
import mappingGoerli from '../../base-learn/assets/deployments/base-goerli/MappingsUT.json';
import minimalTokenGoerli from '../../base-learn/assets/deployments/base-goerli/MinimalTokenUT.json';
import newGoerli from '../../base-learn/assets/deployments/base-goerli/NewUT.json';
import storageGoerli from '../../base-learn/assets/deployments/base-goerli/StorageUT.json';
import structsGoerli from '../../base-learn/assets/deployments/base-goerli/StructsUT.json';

import arraysSepolia from '../../base-learn/assets/deployments/base-sepolia/ArraysUT.json';
import basicMathSepolia from '../../base-learn/assets/deployments/base-sepolia/BasicMathUnitTest.json';
import controlStructuresSepolia from '../../base-learn/assets/deployments/base-sepolia/ControlStructuresUT.json';
import erc20Sepolia from '../../base-learn/assets/deployments/base-sepolia/ERC20UT.json';
import erc721Sepolia from '../../base-learn/assets/deployments/base-sepolia/ERC721UT.json';
import errorSepolia from '../../base-learn/assets/deployments/base-sepolia/ErrorTriageUT.json';
import importsSepolia from '../../base-learn/assets/deployments/base-sepolia/ImportsUT.json';
import inheritanceSepolia from '../../base-learn/assets/deployments/base-sepolia/InheritanceUT.json';
import mappingSepolia from '../../base-learn/assets/deployments/base-sepolia/MappingsUT.json';
import minimalTokenSepolia from '../../base-learn/assets/deployments/base-sepolia/MinimalTokenUT.json';
import newSepolia from '../../base-learn/assets/deployments/base-sepolia/NewUT.json';
import storageSepolia from '../../base-learn/assets/deployments/base-sepolia/StorageUT.json';
import structsSepolia from '../../base-learn/assets/deployments/base-sepolia/StructsUT.json';

import img1 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_01.png';
import img2 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_02.png';
import img3 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_03.png';
import img4 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_04.png';
import img5 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_05.png';
import img7 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_07.png';
import img8 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_08.png';
import img10 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_10.png';
import img12 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_12.png';
import img13 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_13.png';
import img14 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_14.png';
import img15 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_15.png';
import img19 from '../../base-learn/assets/images/nft-pins/Base_Camp_NFT_19.png';
import { baseGoerli, baseSepolia } from 'viem/chains';

const nftData = {
  1: {
    img: img1,
    title: 'Deploying to a Testnet',
    url: '/base-learn/docs/deployment-to-testnet/deployment-to-testnet-exercise',
  },
  2: {
    img: img2,
    title: 'Control Structures',
    url: '/base-learn/docs/control-structures/control-structures-exercise',
  },
  3: {
    img: img3,
    title: 'Storage',
    url: '/base-learn/docs/storage/storage-exercise',
  },
  4: {
    img: img4,
    title: 'Arrays',
    url: '/base-learn/docs/arrays/arrays-exercise',
  },
  5: {
    img: img5,
    title: 'Mappings',
    url: '/base-learn/docs/mappings/mappings-exercise',
  },
  7: {
    img: img7,
    title: 'Structs',
    url: '/base-learn/docs/structs/structs-exercise',
  },
  8: {
    img: img8,
    title: 'Inheritance',
    url: '/base-learn/docs/inheritance/inheritance-exercise',
  },
  10: {
    img: img10,
    title: 'Errors',
    url: '/base-learn/docs/error-triage/error-triage-exercise',
  },
  12: {
    img: img12,
    title: 'The "new" keyword',
    url: '/base-learn/docs/new-keyword/new-keyword-exercise',
  },
  13: {
    img: img13,
    title: 'Minimal Tokens',
    url: '/base-learn/docs/minimal-tokens/minimal-tokens-exercise',
  },
  14: {
    img: img14,
    title: 'ERC-20 Tokens',
    url: '/base-learn/docs/erc-20-token/erc-20-exercise',
  },
  15: {
    img: img15,
    title: 'ERC-721 Tokens',
    url: '/base-learn/docs/erc-721-token/erc-721-exercise',
  },
  19: {
    img: img19,
    title: 'Imports',
    url: '/base-learn/docs/imports/imports-exercise',
  },
};

const baseGoerliDeployments = {
  1: basicMathGoerli,
  2: controlStructuresGoerli,
  3: storageGoerli,
  4: arraysGoerli,
  5: mappingGoerli,
  7: structsGoerli,
  8: inheritanceGoerli,
  10: errorGoerli,
  12: newGoerli,
  13: minimalTokenGoerli,
  14: erc20Goerli,
  15: erc721Goerli,
  19: importsGoerli,
};

const baseSepoliaDeployments = {
  1: basicMathSepolia,
  2: controlStructuresSepolia,
  3: storageSepolia,
  4: arraysSepolia,
  5: mappingSepolia,
  7: structsSepolia,
  8: inheritanceSepolia,
  10: errorSepolia,
  12: newSepolia,
  13: minimalTokenSepolia,
  14: erc20Sepolia,
  15: erc721Sepolia,
  19: importsSepolia,
};

function useNFTData() {
  const { chain } = useAccount();

  // Map the correct deployment based on the chain
  let deployments = {};
  switch (chain?.id || 84532) {
    case baseGoerli.id:
      deployments = baseGoerliDeployments;
      break;
    case baseSepolia.id:
      deployments = baseSepoliaDeployments;
      break;
    default:
      throw new Error(
        `Unsupported network (Chain ID: ${chain?.id}). Please connect to Base Sepolia.`,
      );
      break;
  }

  // Map the correct NFT data based on the chain
  Object.keys(nftData).forEach((key) => {
    nftData[key].deployment = deployments[key];
  });

  return nftData;
}

export default useNFTData;
