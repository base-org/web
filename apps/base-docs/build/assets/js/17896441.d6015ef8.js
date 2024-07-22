"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[8401],{93013:(e,a,t)=>{t.d(a,{A:()=>B});t(14041);var s=t(34164),n=t(31187),r=t(10457),i=t(81524),o=t(42101),d=t(24683),c=t(15379),l=t(28756),u=t(57473),h=t(54441),m=t(89115),f=t(6704);var p=t(31085);t(73593);var b=t(58586);t(71651);const y=new b.xI.Renderer;y.link=(e,a,t)=>`<a target="_blank" href="${e}" title="${a}">${t}</a>`,b.xI.use({renderer:y});t(4364);t(4364);t(4364);var g=t(47366),w=t(38176);const _={tutorialInfo:"tutorialInfo_aWG8",tutorialAuthor:"tutorialAuthor_CfVq"};function k(e){let{children:a}=e;const{frontMatter:t}=(0,r.u)(),n=function(){const{metadata:e,frontMatter:a,contentTitle:t}=(0,r.u)();return a.hide_title||void 0!==t?null:e.title}(),i=t&&t.slug?g[t.slug.substring(1)]:null,o=i?w[i.author]:null;return(0,p.jsxs)("div",{className:(0,s.A)(u.G.docs.docMarkdown,"markdown"),children:[n&&(0,p.jsxs)("div",{children:[(0,p.jsx)("header",{children:(0,p.jsx)(h.A,{as:"h1",children:n})}),i&&o&&(0,p.jsxs)("div",{className:(0,s.A)(_.tutorialInfo),children:[o&&o.link&&(0,p.jsx)("a",{className:(0,s.A)(_.tutorialAuthor),href:o.link,onClick:e=>{e.stopPropagation()},children:(0,p.jsx)("p",{children:`\ud83d\udd8a\ufe0f ${o.name}`})}),o&&!o.link&&(0,p.jsx)("p",{children:`\ud83d\udd8a\ufe0f  ${o.name}`}),!o&&(0,p.jsx)("p",{children:i.author?`\ud83d\udd8a\ufe0f  ${i.author}`:""}),(0,p.jsx)("p",{children:i.last_updated?i.last_updated:""}),(0,p.jsx)("p",{children:i.duration?i.duration:""})]})]}),(0,p.jsx)(m.A,{children:a}),(0,p.jsx)(f.A,{children:()=>(0,p.jsx)(p.Fragment,{})})]})}const v={docItemContainer:"docItemContainer_c0TR",docItemCol:"docItemCol_z5aJ"};function B(e){let{children:a}=e;const t=function(){const{metadata:e,frontMatter:a,toc:t}=(0,r.u)(),s=(0,n.l)(),i=a.hide_table_of_contents,o=!i&&t.length>0;return{hidden:i,mobile:o?(0,p.jsx)(c.A,{}):void 0,desktop:!o||"desktop"!==s&&"ssr"!==s?void 0:(0,p.jsx)(l.A,{})}}();return(0,p.jsxs)("div",{className:"row",children:[(0,p.jsxs)("div",{className:(0,s.A)("col",!t.hidden&&v.docItemCol),children:[(0,p.jsx)(i.A,{}),(0,p.jsx)("div",{className:v.docItemContainer,children:(0,p.jsxs)("article",{children:[(0,p.jsx)(o.A,{}),t.mobile,(0,p.jsx)(k,{children:a}),(0,p.jsx)(d.A,{})]})})]}),t.desktop&&(0,p.jsx)("div",{className:"col col--3",children:t.desktop})]})}},56920:(e,a,t)=>{t.d(a,{A:()=>o});t(14041);var s=t(34164),n=t(49082);const r={tocCollapsibleButton:"tocCollapsibleButton_p7nN",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_ht7h"};var i=t(31085);function o(e){let{collapsed:a,...t}=e;return(0,i.jsx)("button",{type:"button",...t,className:(0,s.A)("clean-btn",r.tocCollapsibleButton,!a&&r.tocCollapsibleButtonExpanded,t.className),children:(0,i.jsx)(n.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"ON THIS PAGE"})})}},5295:(e,a,t)=>{t.d(a,{A:()=>b});var s=t(14041),n=t(2520),r=t(39585),i=t(21020),o=t(34164);const d="tocTitle_k7Tj",c="backLink_sGng";var l=t(31187),u=t(33664),h=t(10457),m=t(31085);function f(e){let{toc:a,className:t,linkClassName:s,isChild:n}=e;const r=(0,l.l)(),{metadata:i}=(0,h.u)();return a.length?(0,m.jsxs)("ul",{className:n?void 0:t,children:[!n&&"desktop"===r&&(0,m.jsx)("li",{children:(0,m.jsx)("p",{className:(0,o.A)(d),children:"ON THIS PAGE"})}),a.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)("a",{href:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(f,{isChild:!0,toc:e.children,className:t,linkClassName:s})]},e.id))),!n&&"desktop"===r&&i.source&&i.source.startsWith("@site/tutorials/docs")&&(0,m.jsx)("li",{children:(0,m.jsx)(u.N_,{to:"/tutorials",children:(0,m.jsx)("p",{className:(0,o.A)(c),children:"All tutorials"})})})]}):null}const p=s.memo(f);function b(e){let{toc:a,className:t="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:d,minHeadingLevel:c,maxHeadingLevel:l,...u}=e;const h=(0,n.p)(),f=c??h.tableOfContents.minHeadingLevel,b=l??h.tableOfContents.maxHeadingLevel,y=(0,r.h)({toc:a,minHeadingLevel:f,maxHeadingLevel:b}),g=(0,s.useMemo)((()=>{if(o&&d)return{linkClassName:o,linkActiveClassName:d,minHeadingLevel:f,maxHeadingLevel:b}}),[o,d,f,b]);return(0,i.i)(g),(0,m.jsx)(p,{toc:y,className:t,linkClassName:o,...u})}},38176:e=>{e.exports=JSON.parse('{"taycaldwell":{"name":"Taylor Caldwell","link":"https://warpcast.com/taycaldwell"},"briandoyle81":{"name":"Brian Doyle","link":"https://warpcast.com/briandoyle81"},"neodaoist":{"name":"Tom Vieira","link":"https://warpcast.com/neodaoist"},"tenderly":{"name":"Tenderly","link":"https://tenderly.co"},"cturakhia-cb":{"name":"Chintan Turakhia","link":"https://warpcast.com/chintan"},"TABASCOatw":{"name":"TABASCO","link":"https://github.com/TABASCOatw"},"lukecd":{"name":"Luke Cassady-Dorion","link":"https://twitter.com/spaceagente"}}')},47366:e=>{e.exports=JSON.parse('{"0_deploy-with-fleek":{"title":"Deploy an Onchain App with Fleek","slug":"/deploy-with-fleek","description":"Learn how to deploy an onchain app using Fleek.","author":"briandoyle81","keywords":["deploy","fleek","onchain","dapp","onchain app"],"tags":["frontend"],"difficulty":"hard","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"9 min read","checksum":"1155994e8aedab6a77e03bed61e33b04004828f11b05b6b7b3b58422292f48fc"},"0_deploy-with-foundry":{"title":"Deploying a smart contract using Foundry","slug":"/deploy-with-foundry","description":"A tutorial that teaches how to deploy a smart contract on the Base test network using Foundry. Includes instructions for setting up the environment, compiling, and deploying the smart contract.","author":"neodaoist","keywords":["Foundry","smart contract","ERC-721","Base","Base test network","Base testnet","Rust","Solidity","smart contract deployment","deploy a smart contract","build on base","write smart contract","smart contract development"],"tags":["smart contracts"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"17 min read","checksum":"b6ba5851a908389eb12dae91ff7d742f3e188eba2322b8550661b05f6731296c"},"0_deploy-with-hardhat":{"title":"Deploying a smart contract using Hardhat","slug":"/deploy-with-hardhat","description":"A tutorial that teaches how to deploy a smart contract on the Base test network using Hardhat. Includes instructions for setting up the environment, compiling, and deploying the smart contract.","author":"taycaldwell","keywords":["Hardhat","smart contract","ERC-721","Base","Base test network","Base testnet","Node.js","Solidity","smart contract deployment","deploy a smart contract","build on base","write smart contract","smart contract development"],"tags":["smart contracts"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"15 min read","checksum":"b9b4a675c58d4cdfb99f3b97ddcf1b223a51dfc5c2414d184cd5d4fb9f988b55"},"0_deploy-with-remix":{"title":"Deploying a smart contract using Remix","slug":"/deploy-with-remix","description":"A tutorial that teaches how to deploy a smart contract on the Base test network using Remix IDE. Includes instructions for setting up the environment, compiling, and deploying the smart contract.","author":"briandoyle81","keywords":["Remix","Remix IDE","smart contract","Base","Base test network","Base testnet","Node.js","Solidity","smart contract deployment","deploy a smart contract","build on Base","write smart contract","smart contract development","online IDE"],"tags":["smart contracts"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"18 min read","checksum":"039bc3fe2c561bc45a6069fbf704b2b29203fb0ce49e1d0dee97a8f0fada11df"},"0_deploy-with-tenderly":{"title":"Deploying a smart contract using Tenderly","slug":"/deploy-with-tenderly","description":"A tutorial that teaches how to deploy smart contracts using Tenderly DevNets. This page covers setup, debugging, transaction simulations, and continuous integration for smart contract development on Base Network.","author":"tenderly","keywords":["Tenderly","smart contract","Tenderly DevNets","Base","Base Network","deployment","debugging","transaction simulations","continuous integration","DevNet environment","Hardhat integration","deploy a smart contract","debug a smart contract","smart contract on Base","build on Base"],"tags":["smart contracts"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"19 min read","checksum":"6b93f84f6431fcf064adbb8b51ee2fb162a97516d4fbac2f982af1eddba87b6b"},"0_deploy-with-thirdweb":{"title":"Deploying a smart contract using thirdweb","slug":"/deploy-with-thirdweb","description":"A tutorial that teaches how to deploy and interact with smart contracts using the thirdweb CLI and SDK. Includes instructions for project creation, contract deployment on the Base test network.","author":"taycaldwell","keywords":["thirdweb","thirdweb CLI","thirdweb SDK","Base","Base network","smart contracts","deployment","Base testnet","CLI","Solidity","ERC-721","web3 development","SDKs","React","deploy a smart contract","debug a smart contract","smart contract on Base","build on Base"],"tags":["smart contracts"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"10 min read","checksum":"f4b7fa789b2c65e00e467c4851857ab2e629f6d8dbed7f8c2d625abf668a124b"},"0_gassless-transactions-with-paymaster":{"title":"Gasless Transactions on Base using Coinbase Paymaster","slug":"/gasless-transaction-on-base-using-a-paymaster","description":"Learn how to leverage Coinbase Paymaster for seamless, gasless transactions on the Coinbase Cloud Developer Platform.","author":"hughescoin","keywords":["Gas","Gasless","Transactions","Paymaster","Sponsor","Sponsored Transactions","Onchain","Coinbase","Base","Crypto","Cloud Platform"],"tags":["Gasless","Crypto","Gas","Sponsor","Coinbase","Base"],"difficulty":"easy","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"25 min read","checksum":"bb4faf87f8d0f36abf18b2f2440d2111af2c6f31552be1cede40f2dc2162c9e4"},"0_run-a-base-node":{"title":"Running a Base Node","slug":"/run-a-base-node","description":"A tutorial that teaches how to set up and run a Base Node.","author":"taycaldwell & wbnns","keywords":["Base Node setup","running a node","Base node","run a Base node","hardware requirements","node synchronization","node snapshots","Base chain","Base blockchain","Base network","node deployment","Ethereum node"],"tags":["nodes"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"6 min read","checksum":"2effa6656ddc3da5f719b560d44007e317de85bc0e4bf133ef521be9db3b2665"},"1_build-with-thirdweb":{"title":"Building an onchain app using thirdweb","slug":"/build-with-thirdweb","description":"A tutorial that teaches how to build an NFT gallery app using thirdweb, including steps for creating an NFT collection, minting NFTs, and configuring the app for the Base testnet.","author":"taycaldwell","keywords":["thirdweb","onchain app","dapp","NFT","NFT collection","smart contract","Base blockchain","Base network","Base testnet","Base test network","mint NFTs","web3 wallet","app development","dapp development","build a dapp on Base","build on Base"],"tags":["smart contracts","nft"],"difficulty":"beginner","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"8 min read","checksum":"527200e33d612b0c76e5eaacddfc23633b57eaa4577f389d4429b8f862c45462"},"1_event-poap-nouns":{"title":"Event POAPs with Nouns","slug":"/event-poaps-with-nouns","description":"Learn how to give attendees of an in-person event a Nouns-based POAP/PFT, even if they\'re not onchain yet.","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","POAP","Nouns","PFP"],"tags":["nft","smart contracts"],"difficulty":"hard","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"4 min read","checksum":"a96c8d7eca808c7f6a7b0b55ff4ece251bfe565d57aa8921896cf49b3c64b3bb"},"1_thirdweb-unreal-nft-items":{"title":"Thirdweb and Unreal - NFT Items","slug":"/thirdweb-unreal-nft-items","description":"Learn how to use NFTs as in-game items using Thirdweb and Unreal.","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","thirdweb","Unreal","c++","blueprints","onchain games"],"tags":["nft","smart contracts"],"difficulty":"hard","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"40 min read","checksum":"dac639cda3aa56bf5ec7041a5152d1b90abef96d80d44a85e1a142551ac635fe"},"2_account-abstraction-with-biconomy":{"title":"Account Abstraction on Base using Biconomy","slug":"/account-abstraction-with-biconomy","description":"A tutorial that teaches how to implement Account Abstraction into a Base project using Biconomy paymasters, bundlers, and smart accounts.","author":"taycaldwell","keywords":["Account Abstraction","AA","Biconomy","Paymaster","Bundler","User operations","userops","Smart contract wallet","Smart account","Particle Network","Particle Auth"],"tags":["account abstraction"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"29 min read","checksum":"8c8189d19e874c08dd05549d06c1eb2e45ce924aa2b0e1239f0adf04c8ee4879"},"2_account-abstraction-with-particle-network":{"title":"Account Abstraction on Base using Particle Network","slug":"/account-abstraction-with-particle-network","description":"A walkthrough on Particle Network\'s Modular Smart Wallet-as-a-Service, leveraging account abstraction and social logins across various providers.","author":"TABASCOatw","keywords":["Account Abstraction","AA","Biconomy","Paymaster","Bundler","Alchemy","ERC-4337 Smart account","Particle Network","Particle Auth","Wallet-as-a-Service"],"tags":["account abstraction"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"34 min read","checksum":"d307c0834f745648d2c7004595a7c60544381a0d90d4f3a3d6337f6152c4c856"},"2_account-abstraction-with-privy-and-base-paymaster":{"title":"Account Abstraction on Base using Privy and the Base Paymaster","slug":"/account-abstraction-with-privy-and-base-paymaster","description":"A tutorial that teaches how to implement Account Abstraction into a Base project using Privy and the Base paymaster.","author":"Brian Doyle and Aaron Hayslip","keywords":["Privy","viem","frontend","smart contract development","EVM","Next.js","Base","Base network","account abstraction","Base paymaster","embedded wallet"],"tags":["account abstraction"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"46 min read","checksum":"fcd90aad54c93b59ab947c2954597b9b861204b885ed599754f7e50cca303fd9"},"2_coinbase-smart-wallet":{"title":"Coinbase Smart Wallet","slug":"/coinbase-smart-wallet","description":"Learn to create an app that uses the Coinbase Smart Wallet and effectively manages assets and permissions for both native and new users of onchain apps","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","wagmi","viem","smart wallet"],"tags":["nft","smart wallet"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"32 min read","checksum":"f8d2be1153df419e835c3afd8ea2714c2560f50a4e967eb303323693eb7777fe"},"2_cross-chain-with-ccip":{"title":"Sending messages and tokens from Base to other chains using Chainlink CCIP","slug":"/cross-chain-with-ccip","description":"A tutorial that teaches how to use Chainlink CCIP to perform cross-chain messaging and token transfers from Base Goerli testnet to Optimism Goerli testnet.","author":"taycaldwell","keywords":["Cross-chain","Omni-chain","Crosschain","OmniChain","Chainlink","Chainlink CCIP","CCIP","cross-chain messaging","transfer tokens across chains"],"tags":["cross-chain"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"32 min read","checksum":"b613b074cbb8f4c8eb55a13651f6371a8a3211afe65b8e2190e5b9df18c1d98f"},"2_cross-chain-with-layerzero":{"title":"Sending messages from Base to other chains using LayerZero V2","slug":"/cross-chain-with-layerzero","description":"A tutorial that teaches how to use LayerZero V2 to perform cross-chain messaging from Base Goerli testnet to Optimism Goerli testnet.","author":"taycaldwell","eywords":["Cross-chain","Omni-chain","Crosschain","OmniChain","LayerZero","LayerZero V2","lz","cross-chain messaging","transfer tokens across chains"],"tags":["cross-chain"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"34 min read","checksum":"a0ce01aa1c3097efa7582a74bc73f9ccad03222b25af451be1fde4fcd45c7dd7"},"2_dynamic-nfts":{"title":"Building dynamic NFTs","slug":"/dynamic-nfts","description":"A tutorial that teaches how to make dynamic NFTs that evolve based on onchain or offchain actions.","author":"lukecd","keywords":["Irys","Permanent data","Solidity","ERC-721","token","NFT","Dynamic NFT","gaming NFT","onchain metadata","nft metadata","onchain nft"],"tags":["nft"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"14 min read","checksum":"0b1498d415cda6e83031231cd05d42edacd2faa82d68471b2ed09670481a3259"},"2_nft-minting-with-zora":{"title":"How to Mint on Zora with an App","slug":"/minting-nfts-with-zora","description":"Learn to use Zora contracts inside your app to create secure, efficient, and feature-rich minting experiences for your users.","author":"briandoyle81","keywords":["Solidity","ERC-1155","token","NFT","wagmi","viem","Zora"],"tags":["nft","smart wallet"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"18 min read","checksum":"fc55c7e07decb6053d9b906445c93002374e4e50120c804b7c04e36af4e1779b"},"2_onchain-nfts":{"title":"Building onchain NFTs","slug":"/complex-onchain-nfts","description":"A tutorial that teaches how to make complex nfts that are procedurally generated and have onchain metadata and images.","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","SVG","generative art","onchain metadata","nft metadata","onchain images","interfaces","pseudorandom numbers","deterministic randomness"],"tags":["nft"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"39 min read","checksum":"108ca52fb9d1242e529c225e6f9e9cdde63f8f0725bddd876bc5ea572db1ea59"},"2_oracles-chainlink-price-feeds":{"title":"Accessing real-world data using Chainlink Data Feeds","slug":"/oracles-chainlink-price-feeds","description":"A tutorial that teaches how to use Chainlink Data Feeds to access real-world data, such as asset prices, directly from your smart contracts on the Base testnet.","author":"taycaldwell","keywords":["Oracle Oracles","Chainlink","price feeds","data feeds","smart contract","Base blockchain","Base network","Base testnet","Base test network","app development","dapp development","build a dapp on Base","build on Base"],"tags":["oracles"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"11 min read","checksum":"df42e4091a128a0bd3e7dc9fcc585f9a711a56027152d57553a54e8040a4001f"},"2_oracles-pyth-price-feeds":{"title":"Accessing real-time asset data using Pyth Price Feeds","slug":"/oracles-pyth-price-feeds","description":"A tutorial that teaches how to use Pyth Price Feeds to access real-time asset data, directly from your smart contracts on the Base testnet.","author":"taycaldwell","keywords":["Oracle Oracles","Pyth","Pyth Network","price feeds","data feeds","smart contract","Base blockchain","Base network","Base testnet","Base test network","app development","dapp development","build a dapp on Base","build on Base"],"tags":["oracles"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"13 min read","checksum":"983e7175434206be7c996758b09db9c33aac454ecb9b4b3da8f301f8140b7c52"},"2_oracles-supra-vrf":{"title":"Generating random numbers contracts using Supra dVRF","slug":"/oracles-supra-vrf","description":"A tutorial that teaches how to use Supra dVRF to serve random numbers using an onchain randomness generation mechanism directly within your smart contracts on the Base testnet.","author":"taycaldwell","keywords":["Oracle Oracles","Supra","Supra VRF","Supra dVRF","VRF","verifiable random function","verifiable random functions","random numbers","rng","random number generator","random numbers in smart contracts","random numbers on Base","smart contract","Base blockchain","Base network","Base testnet","Base test network","app development","dapp development","build a dapp on Base","build on Base"],"tags":["oracles","vrf"],"difficulty":"intermediate","displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"19 min read","checksum":"260e40333e386593cf6f211c06218042d4b93ecac34f56a0decbd398f1e3ddb1"},"2_signature-mint":{"title":"Signature Mint NFT","slug":"/signature-mint-nft","description":"A tutorial that teaches how to create a signature mint, in which minters pay their own gas, but must first be given a valid signed authorization.","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","signature mint","viem","soulbound"],"tags":["nft"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"19 min read","checksum":"bb0152d2ccf76eb7db67a995f5a35590df22bcacfbaf98ff930510e3d5b21704"},"3_farcaster-frames-deploy-to-vercel":{"title":"Farcaster Frames: Deploying to Vercel","slug":"/farcaster-frames-deploy-to-vercel","description":"A tutorial that teaches how to deploy a Farcaster Frame using Vercel.","author":"briandoyle81","keywords":["farcaster","frames farcaster frames","Vercel","OnchainKit","a frame in 100 lines","deploy"],"tags":["frames"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"9 min read","checksum":"3174ebe066db1100e389cf2b0ec1451c2711145fb645dc540f4c08c5a2e48540"},"3_farcaster-frames-gating-and-redirects":{"title":"Farcaster Frames: Gating content and creating redirects","slug":"/farcaster-frames-gating-and-redirects","description":"A tutorial that teaches how to create Frames with more advanced behaviors such as gating content based on a user\'s follows, likes, or recasts, and creating redirect buttons.","author":"briandoyle81","keywords":["farcaster","frames","farcaster frames"],"tags":["frames"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"12 min read","checksum":"81672fdd81867b1ac78f474fb670c073da4132fcccd961b809a88f84580b7fca"},"3_farcaster-frames-hyperframes":{"title":"Farcaster Frames: Building HyperFrames","slug":"/farcaster-frames-hyperframes","description":"A tutorial that teaches how to make cross-linked hyperframes in an organized manner.","author":"briandoyle81","hide_table_of_contents":false,"displayed_sidebar":null,"keywords":["farcaster","frames","farcaster frames","hyperframes","hyper frames","state","frame state","Base"],"difficulty":"intermediate","tags":["frames"],"last_updated":"Jul 11, 2024","duration":"16 min read","checksum":"dca5d7ffcf59c834221a9585628ba88e58842be3ed2c10705e1185e6c5d30715"},"3_farcaster-frames-nft-minting":{"title":"Farcaster Frames: Building an NFT airdrop Frame","slug":"/farcaster-frames-nft-minting","description":"A tutorial that teaches how to make a Farcaster Frame that allows you to mint and airdrop NFTs to users.","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","farcaster","frames","farcaster frames"],"tags":["frames","nft"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"22 min read","checksum":"4f2e23920817a1ef138ce594423b25d57080ecb1f954940cc91ef133f1050fa4"},"3_farcaster-frames-nocode-minting":{"title":"Farcaster Frames: Building a no-code minting Frame","slug":"/farcaster-frames-nocode-minting","description":"A tutorial that teaches how to make a Farcaster Frame with an outbound link to an NFT minting website.","author":"briandoyle81","keywords":["Solidity","ERC-721","token","NFT","farcaster","frames","farcaster frames","mint"],"tags":["frames","nft"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"7 min read","checksum":"2201cf6ca7cf13fc8940de15b834076090671161a37e97a3146fd207b79b2033"},"3_farcaster-frames-transactions":{"title":"Farcaster Frames: Making transactions","slug":"/farcaster-frames-transactions","description":"A tutorial that teaches how to invoke a wallet transaction from a Farcaster Frame.","author":"briandoyle81","keywords":["farcaster","frames","farcaster frames","wallet","transaction","Base"],"tags":["frames"],"difficulty":"intermediate","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"17 min read","checksum":"f039e4e2b33d73e803fbc7785395ca283dc0abe35c46ead630e1dfaa0d7ab275"},"4_hardhat-debugging":{"title":"Hardhat: Debugging smart contracts","slug":"/hardhat-debugging","description":"A tutorial that teaches how to debug your smart contracts using Hardhat.","author":"Edson Alcala","keywords":["Hardhat","smart contract debugging","debugging logs","common errors","error resolution","decentralized applications"],"tags":["smart contracts"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"15 min read","checksum":"c4f0c5cc94e04b85501323d6992a014308db14900c069ac5a7639d5b17703db6"},"4_hardhat-profiling-gas":{"title":"Hardhat: Optimizing the gas usage of smart contracts","slug":"/hardhat-profiling-gas","description":"A tutorial that teaches how to optimize the gas usage of your smart contracts using Hardhat.","author":"Edson Alcala and Brian Doyle","keywords":["Hardhat","gas optimization","gas usage","gas profiling","Hardhat Gas Reporter plugin","smart contract development","cost savings","contract optimization","gas-efficient contracts"],"tags":["smart contracts"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"16 min read","checksum":"7462ea26fdaafac994b2ccbeaaa0fcc08f708debcda1193f8131f99c201005cc"},"4_hardhat-profiling-size":{"title":"Hardhat: Optimizing the size of smart contracts","slug":"/hardhat-profiling-size","description":"A tutorial that teaches how to optimize the size of your smart contracts using Hardhat.","author":"Edson Alcala and Brian Doyle","keywords":["Smart Contract Sizes","Hardhat Contract Sizer","Base network","Base blockchain","Blockchain","Contract Optimization","Inheritance","External Contracts","Solidity Optimizer","Smart Contract Development"],"tags":["smart contracts"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"22 min read","checksum":"38c40aa53b9359a9b8716e7f56f68ebcc910da9ae6d34b055bde866d51da007b"},"4_hardhat-test-coverage":{"title":"Hardhat: Analyzing the test coverage of smart contracts","slug":"/hardhat-test-coverage","description":"A tutorial that teaches how to profile the test coverage of your smart contracts using Hardhat and the Solidity Coverage plugin.","author":"Edson Alcala","keywords":["Solidity Coverage","Smart Contract Testing","Test Coverage","Base network","Base blockchain","blockchain development","Hardhat","Solidity","Code Testing","Test Suite Analysis"],"tags":["smart contracts"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"9 min read","checksum":"54b377b97554eea4e09520fbf6fdacff9978d840248ec69d82ab79c0bebb0846"},"4_intro-to-foundry-setup":{"title":"Foundry: Setting up Foundry with Base","slug":"/intro-to-foundry-setup","description":"A tutorial that teaches how to set up your development environment to work with Foundry.","author":"Edson Alcala","keywords":["Foundry","Forge","Foundry Book","smart contract development","toolchain"],"tags":["smart contracts"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"6 min read","checksum":"0b50de1197db8c50cbf02405a904f99ec7e32159f86ae884993aa6cc36b10fcb"},"4_intro-to-foundry-testing":{"title":"Foundry: Testing smart contracts","slug":"/intro-to-foundry-testing","author":"Edson Alcala","description":"A tutorial that teaches how to test your smart contracts using Foundry.","keywords":["Foundry","Forge","Foundry Book","smart contract development","toolchain","testing","test"],"tags":["smart contracts"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"9 min read","checksum":"2ced64394c425e5749001cb21cca5a3b0043fe6ab013be45e98299e16f337d23"},"4_intro-to-providers":{"title":"Introduction to Providers","slug":"/intro-to-providers","description":"A tutorial that teaches what providers are, why you need one, and how to configure several providers and use them to connect to the blockchain.","author":"briandoyle81","keywords":["blockchain providers","JSON RPC","RainbowKit","wagmi React hooks","viem","frontend","smart contract development","EVM","Next.js","Base","Base network","Base node providers","Base providers","blockchain development","dApps","smart contracts","providers","public providers","wallet providers","vendor providers","rate limits","blockchain API","Ethereum provider","Base","Base network","Base node providers","Base providers","QuickNode","Alchemy","API keys","blockchain connection","public provider","smart contract development"],"tags":["nodes"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"21 min read","checksum":"d09d83f406019b24b7cf9490cbe0200cba4bf09506d98d18d47fe43efa48aa3a"},"5_farcaster-cast-actions-simple":{"title":"Farcaster Cast Actions: Create a Simple Cast Action","slug":"/farcaster-cast-actions-simple","description":"A tutorial that teaches how to make a simple Farcaster cast action.","author":"briandoyle81","keywords":["farcaster","cast actions","farcaster cast actions","farcaster actions"],"tags":["frames","actions"],"difficulty":"beginner","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"9 min read","checksum":"f9ad99285bb78e91cde255b71c826554b6ff1f8cec69450afe814d033af945e6"},"5_shopify-storefront-commerce":{"title":"Deploy a Shopify Storefront with Coinbase Commerce","slug":"/shopify-storefront-commerce","description":"Learn how to launch a Shopify storefront that uses Coinbase Commerce as a crypto payment gateway.","author":"hughescoin","keywords":["Shopify","Coinbase Commerce","crypto payments","ecommerce","Hydrogen","Oxygen","USDC","ocs","onchain"],"tags":["ecommerce","crypto","shopify","onchain summer","ocs"],"difficulty":"easy","hide_table_of_contents":false,"displayed_sidebar":null,"last_updated":"Jul 11, 2024","duration":"8 min read","checksum":"1d485f4ded5aa492578d9887e36fefefea452c262769f5f30f6e9750c24c2913"}}')}}]);