import arraysDeployment from '../../base-camp/assets/deployments/base-goerli/ArraysUT.json';
import basicMathDeployment from '../../base-camp/assets/deployments/base-goerli/BasicMathUnitTest.json';
import controlStructuresDeployment from '../../base-camp/assets/deployments/base-goerli/ControlStructuresUT.json';
import erc20Deployment from '../../base-camp/assets/deployments/base-goerli/ERC20UT.json';
import erc721Deployment from '../../base-camp/assets/deployments/base-goerli/ERC721UT.json';
import errorDeployment from '../../base-camp/assets/deployments/base-goerli/ErrorTriageUT.json';
import importsDeployment from '../../base-camp/assets/deployments/base-goerli/ImportsUT.json';
import inheritanceDeployment from '../../base-camp/assets/deployments/base-goerli/InheritanceUnitTest.json';
import mappingDeployment from '../../base-camp/assets/deployments/base-goerli/MappingsUT.json';
import minimalTokenDeployment from '../../base-camp/assets/deployments/base-goerli/MinimalTokenUT.json';
import newDeployment from '../../base-camp/assets/deployments/base-goerli/NewUT.json';
import storageDeployment from '../../base-camp/assets/deployments/base-goerli/StorageUT.json';
import structsDeployment from '../../base-camp/assets/deployments/base-goerli/StructsUT.json';
import img1 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_01.png';
import img2 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_02.png';
import img3 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_03.png';
import img4 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_04.png';
import img5 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_05.png';
import img7 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_07.png';
import img8 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_08.png';
import img10 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_10.png';
import img12 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_12.png';
import img13 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_13.png';
import img14 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_14.png';
import img15 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_15.png';
import img19 from '../../base-camp/assets/images/nft-pins/Base_Camp_NFT_19.png';

const NFTExerciseData = {
  1: {
    img: img1,
    title: 'Deploying to a Testnet',
    address: '0xB01946eeb7869438aE899d086896A727279AF1E5',
    deployment: basicMathDeployment,
    url: '/base-camp/docs/deployment-to-testnet/deployment-to-testnet-exercise',
  },
  2: {
    img: img2,
    title: 'Control Structures',
    address: '0xe6aA64DD6C3dCe257567b3BB13bAaeE6779728e3',
    deployment: controlStructuresDeployment,
    url: '/base-camp/docs/control-structures/control-structures-exercise',
  },
  3: {
    img: img3,
    title: 'Storage',
    address: '0x805712508445AC8883C048B639D7eAdF33C1EE35',
    deployment: storageDeployment,
    url: '/base-camp/docs/storage/storage-exercise',
  },
  4: {
    img: img4,
    title: 'Arrays',
    address: '0xdC01a54eD81923F96aF4CF8fC7dB2B00a9366714',
    deployment: arraysDeployment,
    url: '/base-camp/docs/arrays/arrays-exercise',
  },
  5: {
    img: img5,
    title: 'Mappings',
    address: '0x889AC78027Be87ccf795eb79201B6E246e907384',
    deployment: mappingDeployment,
    url: '/base-camp/docs/mappings/mappings-exercise',
  },
  7: {
    img: img7,
    title: 'Structs',
    address: '0x510ceaeEB06965d92880d2b5936F4fD259539018',
    deployment: structsDeployment,
    url: '/base-camp/docs/structs/structs-exercise',
  },
  8: {
    img: img8,
    title: 'Inheritance',
    address: '0xb02B34c48138464888A477a6F0CC96d8Ce2Fe3F0',
    deployment: inheritanceDeployment,
    url: '/base-camp/docs/inheritance/inheritance-exercise',
  },
  10: {
    img: img10,
    title: 'Errors',
    address: '0xeD5FD5BDCb0E1e49ccfDfd17fD0e1C8975bB6A1B',
    deployment: errorDeployment,
    url: '/base-camp/docs/error-triage/error-triage-exercise',
  },
  12: {
    img: img12,
    title: 'The "new" keyword',
    address: '0x930B0dED8EBaC6f176EC3fa96426CA74153b2e74',
    deployment: newDeployment,
    url: '/base-camp/docs/new-keyword/new-keyword-exercise',
  },
  13: {
    img: img13,
    title: 'Minimal Tokens',
    address: '0xcf3a9cb9e5146EA7e9D9C20717eE33E737F96211',
    deployment: minimalTokenDeployment,
    url: '/base-camp/docs/minimal-tokens/minimal-tokens-exercise',
  },
  14: {
    img: img14,
    title: 'ERC-20 Tokens',
    address: '0x652Ad79cB9996C5e5E3de2f19e63eB5ae8b51ea8',
    deployment: erc20Deployment,
    url: '/base-camp/docs/erc-20-token/erc-20-exercise',
  },
  15: {
    img: img15,
    title: 'ERC-721 Tokens',
    address: '0xc626b3B66c97e8fE114723C7a9c1E16D6F2306ea',
    deployment: erc721Deployment,
    url: '/base-camp/docs/erc-721-token/erc-721-exercise',
  },
  19: {
    img: img19,
    title: 'Imports',
    address: '0xB7261b7ba8f20FbC2EcA0f31F4D776838a9ADA29',
    deployment: importsDeployment,
    url: '/base-camp/docs/imports/imports-exercise',
  },
};

export default NFTExerciseData;
