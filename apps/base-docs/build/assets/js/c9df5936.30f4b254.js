"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[3704],{82247:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>g});var a=t(14041);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=a.createContext({}),d=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=d(e.components);return a.createElement(l.Provider,{value:n},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},h=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=d(t),h=o,g=c["".concat(l,".").concat(h)]||c[h]||u[h]||r;return t?a.createElement(g,s(s({ref:n},p),{},{components:t})):a.createElement(g,s({ref:n},p))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,s=new Array(r);s[0]=h;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i[c]="string"==typeof e?e:o,s[1]=i;for(var d=2;d<r;d++)s[d]=t[d];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},18606:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var a=t(89575),o=(t(14041),t(82247));const r={title:"Gate IRL Events with Nouns",slug:"/event-gate-with-nouns",description:"Learn how to gate entry to an IRL event for members of a Nounish DAO.",author:"briandoyle81",keywords:["Solidity","ERC-721","token","NFT","Gate","Nouns","PFP"],tags:["nft","smart contracts","frontend"],difficulty:"intermediate",hide_table_of_contents:!1,displayed_sidebar:null},s=void 0,i={unversionedId:"docs/event-gate-nouns",id:"docs/event-gate-nouns",title:"Gate IRL Events with Nouns",description:"Learn how to gate entry to an IRL event for members of a Nounish DAO.",source:"@site/tutorials/docs/1_event-gate-nouns.md",sourceDirName:"docs",slug:"/event-gate-with-nouns",permalink:"/tutorials/event-gate-with-nouns",draft:!1,tags:[{label:"nft",permalink:"/tutorials/tags/nft"},{label:"smart contracts",permalink:"/tutorials/tags/smart-contracts"},{label:"frontend",permalink:"/tutorials/tags/frontend"}],version:"current",sidebarPosition:1,frontMatter:{title:"Gate IRL Events with Nouns",slug:"/event-gate-with-nouns",description:"Learn how to gate entry to an IRL event for members of a Nounish DAO.",author:"briandoyle81",keywords:["Solidity","ERC-721","token","NFT","Gate","Nouns","PFP"],tags:["nft","smart contracts","frontend"],difficulty:"intermediate",hide_table_of_contents:!1,displayed_sidebar:null}},l={},d=[{value:"Objectives",id:"objectives",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"ERC-721 Tokens",id:"erc-721-tokens",level:3},{value:"Vercel",id:"vercel",level:3},{value:"Onchain Apps",id:"onchain-apps",level:3},{value:"The Nouns Protocol",id:"the-nouns-protocol",level:2},{value:"Creating your Own DAO",id:"creating-your-own-dao",level:2},{value:"General",id:"general",level:3},{value:"Auction",id:"auction",level:3},{value:"Veto and Allocation",id:"veto-and-allocation",level:2},{value:"Artwork",id:"artwork",level:3},{value:"Deploying the Contracts",id:"deploying-the-contracts",level:3},{value:"Finding the Contracts",id:"finding-the-contracts",level:3},{value:"Building the App",id:"building-the-app",level:2},{value:"Setting up the Template",id:"setting-up-the-template",level:3},{value:"Reading QR Codes",id:"reading-qr-codes",level:3},{value:"Verifying NFT Ownership",id:"verifying-nft-ownership",level:3},{value:"Conclusion",id:"conclusion",level:2}],p={toc:d},c="wrapper";function u(e){let{components:n,...r}=e;return(0,o.yg)(c,(0,a.A)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"You've probably seen people in onchain communities use \u2310\u25e8-\u25e8 in their profile names. These are called ",(0,o.yg)("em",{parentName:"p"},"Nouns Goggles"),", or ",(0,o.yg)("em",{parentName:"p"},"Noggles"),". They're an ASCII representation of the glasses found on every procedurally generated ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.center/intro"},"Nouns")," NFT avatar. The ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.wtf/"},"Nouns Auction")," makes one new Noun available for auction every single day - forever!"),(0,o.yg)("p",null,"In this tutorial, you'll learn how to use Nouns and the Coinbase ",(0,o.yg)("a",{parentName:"p",href:"https://www.smartwallet.dev/why"},"Smart Wallet")," to create an app in which non-crypto-native participants at an IRL event can be onboarded and receive Nounish avatars."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"objectives"},"Objectives"),(0,o.yg)("p",null,"By the end of this tutorial you should be able to:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Deploy a copy of the ",(0,o.yg)("a",{parentName:"li",href:"https://nouns.center/dev/nouns-protocol"},"Nouns Protocol")),(0,o.yg)("li",{parentName:"ul"},"Construct a web app that scan a user's QR code and indicate whether or not the user possesses the appropriate NFT")),(0,o.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.yg)("h3",{id:"erc-721-tokens"},"ERC-721 Tokens"),(0,o.yg)("p",null,"This tutorial assumes that you are familiar with the properties of ERC-721 tokens."),(0,o.yg)("h3",{id:"vercel"},"Vercel"),(0,o.yg)("p",null,"You'll need to be comfortable deploying your app to ","[Vercel]",", or using another solution on your own. Check out our tutorial on ","[deploying with Vercel]"," if you need a refresher!"),(0,o.yg)("h3",{id:"onchain-apps"},"Onchain Apps"),(0,o.yg)("p",null,"The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in ",(0,o.yg)("a",{parentName:"p",href:"https://base.org.camp"},"Base Camp")," for ","[Building an Onchain App]","."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"the-nouns-protocol"},"The Nouns Protocol"),(0,o.yg)("p",null,"Ownership of a Noun gives a wallet address membership in the ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.wtf/vote"},"Nouns DAO"),". The ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.center/dev/nouns-protocol"},"Nouns Protocol")," is open-source and the art is public domain, so any builder can leverage the protocol to create their own community. For example, the ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.build/dao/base/0x8de71d80eE2C4700bC9D4F8031a2504Ca93f7088/563"},"Purple DAO")," supports ",(0,o.yg)("a",{parentName:"p",href:"https://www.farcaster.xyz/"},"Farcaster"),"."),(0,o.yg)("h2",{id:"creating-your-own-dao"},"Creating your Own DAO"),(0,o.yg)("p",null,"You can use the contracts in the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/nounsDAO/nouns-monorepo/"},"Nouns Monorepo")," to deploy your own DAO, but there's an easier method! ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.build/about"},"BuilderDAO")," is a DAO that maintains a set of tools making it easy for anyone to create their own DAO."),(0,o.yg)("p",null,"Navigate to the ",(0,o.yg)("a",{parentName:"p",href:"https://testnet.nouns.build/"},"Testnet Builder DAO")," site and connect your wallet."),(0,o.yg)("admonition",{type:"danger"},(0,o.yg)("p",{parentName:"admonition"},"The name of this site is a little misleading. It will treat the DAOs you create here as test DAOs, but it deploys contracts on Base Mainnet, ",(0,o.yg)("strong",{parentName:"p"},"not")," Base Sepolia. Luckily, gas is inexpensive enough that this isn't a terrible price.")),(0,o.yg)("p",null,"Click the green circle in the upper right, and select ",(0,o.yg)("inlineCode",{parentName:"p"},"Create a DAO")),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Create DAO",src:t(80594).A,width:"1024",height:"191"})),(0,o.yg)("h3",{id:"general"},"General"),(0,o.yg)("p",null,"Give your DAO a name and symbol. Optionally, upload a cover avatar image and/or link to a website. Click ",(0,o.yg)("inlineCode",{parentName:"p"},"Continue"),"."),(0,o.yg)("h3",{id:"auction"},"Auction"),(0,o.yg)("p",null,"For testing, you'll want the ",(0,o.yg)("inlineCode",{parentName:"p"},"Auction Reserve Price")," as low as possible, .0001 ETH, and the ",(0,o.yg)("inlineCode",{parentName:"p"},"Auction Duration")," to be enough time to buy a few NFTs for testing with different wallet addresses, but not so long you get bored. About 2 minutes is a good middle ground."),(0,o.yg)("p",null,(0,o.yg)("strong",{parentName:"p"},"Be sure")," to change ",(0,o.yg)("inlineCode",{parentName:"p"},"Days")," from 1 to 0!"),(0,o.yg)("h2",{id:"veto-and-allocation"},"Veto and Allocation"),(0,o.yg)("p",null,"Set ",(0,o.yg)("inlineCode",{parentName:"p"},"Veto Power")," and initial ",(0,o.yg)("inlineCode",{parentName:"p"},"Token Allocation")," as you see fit. To speed up testing, you may wish to grant several addresses here."),(0,o.yg)("admonition",{type:"caution"},(0,o.yg)("p",{parentName:"admonition"},"The app gets confused if you change addresses from the browser extension wallet, copy them from another window, or another location.")),(0,o.yg)("h3",{id:"artwork"},"Artwork"),(0,o.yg)("p",null,"Add a description for your DAO. You must put something in this field."),(0,o.yg)("p",null,"For the art, click the ",(0,o.yg)("inlineCode",{parentName:"p"},"Download demo folder")," link and review the assets downloaded if you're not familiar with how these types of collections assemble NFT art out of random properties."),(0,o.yg)("p",null,"When you're done, simply upload the folder you downloaded. Use the ",(0,o.yg)("inlineCode",{parentName:"p"},"Generate Random Preview")," button a few times to see the variants of NFTs this protocol can create, then click ",(0,o.yg)("inlineCode",{parentName:"p"},"Continue"),"."),(0,o.yg)("h3",{id:"deploying-the-contracts"},"Deploying the Contracts"),(0,o.yg)("p",null,"Review the linked documents for the ToS and Protocol Rewards, the check the boxes and click ",(0,o.yg)("inlineCode",{parentName:"p"},"Deploy Contracts (1 of 2)"),"."),(0,o.yg)("p",null,"Approve the transaction. ",(0,o.yg)("strong",{parentName:"p"},"Remember, this is using real funds!")),(0,o.yg)("p",null,"Click ",(0,o.yg)("inlineCode",{parentName:"p"},"Deploy Contracts (2 of 2)")," and approve the transaction. After it processes, you should be taken to the auction page for your DAO. Click ",(0,o.yg)("inlineCode",{parentName:"p"},"Start Auction")," and approve the transaction."),(0,o.yg)("p",null,"If you chose to distribute tokens to founding addresses, those will be airdropped to those addresses. Otherwise, use the auction to purchase NFTs with a few different addresses."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Auction",src:t(37450).A,width:"1024",height:"568"})),(0,o.yg)("h3",{id:"finding-the-contracts"},"Finding the Contracts"),(0,o.yg)("p",null,"Near the bottom of the page, click the ",(0,o.yg)("inlineCode",{parentName:"p"},"Contracts")," tab. You'll need the ",(0,o.yg)("inlineCode",{parentName:"p"},"NFT")," contract address for the app."),(0,o.yg)("h2",{id:"building-the-app"},"Building the App"),(0,o.yg)("p",null,"The app is designed to be used by the person at the door to a private event for DAO members. To gain entry, members must prove their ownership of at least 1 NFT from the DAO."),(0,o.yg)("p",null,'The app will work by using a QR code scanner to read the member\'s "pay me" QR code, look up their NFT ownership status, then share that with the person using the app to scan entrants.'),(0,o.yg)("h3",{id:"setting-up-the-template"},"Setting up the Template"),(0,o.yg)("p",null,"Start by using ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/Zizzamia/an-onchain-app-in-100-components"},"An Onchain App in 100 Components")," as a template."),(0,o.yg)("p",null,"Clone your copy of the repo, install dependencies, and check that it works."),(0,o.yg)("p",null,"Open ",(0,o.yg)("inlineCode",{parentName:"p"},"src/app/page.tsx"),". Clean out the demo content and set up for your app:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'\'use client\';\n\nexport default function Page() {\n  return (\n    <div className="flex w-96 flex-col md:w-[600px]">\n      <section className="mb-6 flex w-full flex-col border-b border-sky-800 pb-6">\n        <aside className="mb-6 flex">\n          <h2 className="text-2xl">Welcome to our Event!</h2>\n        </aside>\n        <main className="flex flex-col space-x-4">\n          <p className="text-body mb-4 text-white">\n            Please scan the QR code for your wallet address that holds the NFT.\n          </p>\n        </main>\n      </section>\n    </div>\n  );\n}\n')),(0,o.yg)("h3",{id:"reading-qr-codes"},"Reading QR Codes"),(0,o.yg)("p",null,"You'll need a library to read QR codes. A lightweight option is ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/mebjas/html5-qrcode"},"Html5-QRCode"),"."),(0,o.yg)("p",null,"Add it with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"bun add html5-qrcode\n")),(0,o.yg)("p",null,"In ",(0,o.yg)("inlineCode",{parentName:"p"},"page.tsx"),", import, and add the state variables needed by the scanner, as outlined in the ",(0,o.yg)("a",{parentName:"p",href:"https://qrcode.minhazav.dev/"},"Html5-QRCode Docs"),", and the variables you'll need to show whether or not to let the person into the event:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import { Html5Qrcode } from 'html5-qrcode';\n")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const [scannedAddress, setScannedAddress] = useState<`0x${string}` | null>(null);\nconst [authorized, setAuthorized] = useState(false);\nconst [scanning, setScanning] = useState(false);\n")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"scannedAddress")," will be populated by the QR Code scanner. You'll use it with ",(0,o.yg)("inlineCode",{parentName:"p"},"useEffect")," to check for NFT ownership."),(0,o.yg)("p",null,"Review the operations of the scanner from the ",(0,o.yg)("a",{parentName:"p",href:"https://qrcode.minhazav.dev/"},"Html5-QRCode Docs"),", and modify it to only look for addresses, and to handle the different formats used by popular wallets:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"async function startScanning() {\n  setScanning(true);\n  setScannedAddress(null);\n  setAuthorized(false);\n  let cameraId = '';\n\n  try {\n    // This method will trigger user permissions\n    const devices = await Html5Qrcode.getCameras();\n\n    if (!devices || devices.length === 0) {\n      return;\n    }\n\n    cameraId = devices[0].id;\n\n    const html5QrCode = new Html5Qrcode('reader', false);\n\n    try {\n      html5QrCode.start(\n        { facingMode: 'environment' } || cameraId,\n        {\n          fps: 10, // Optional, frame per seconds for qr code scanning\n          qrbox: { width: 500, height: 500 }, // Optional, if you want bounded box UI\n        },\n        (decodedText) => {\n          let scannedAddress = decodedText;\n          if (scannedAddress.includes('ethereum:')) {\n            scannedAddress = scannedAddress.replace('ethereum:', '');\n          }\n\n          // If there is an @ symbol, remove it and everything after it\n          if (scannedAddress.includes('@')) {\n            scannedAddress = scannedAddress.split('@')[0];\n          }\n\n          // If it's not the correct length, it's not a valid address\n          if (scannedAddress.length !== 42) {\n            return;\n          }\n\n          // handle the result\n          setScannedAddress(scannedAddress as `0x${string}`);\n          setScanning(false);\n          html5QrCode.stop();\n        },\n        (errorMessage) => {\n          // parse error, ignore it.\n        },\n      );\n    } catch (error) {}\n  } catch (error) {}\n}\n")),(0,o.yg)("p",null,"Update the returned HTML to display:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"The scanner object"),(0,o.yg)("li",{parentName:"ul"},"The last scanned address"),(0,o.yg)("li",{parentName:"ul"},"Whether or not the last scanned address is authorized to enter"),(0,o.yg)("li",{parentName:"ul"},"Any errors"),(0,o.yg)("li",{parentName:"ul"},"A button to start up the scanner")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'return (\n  <div className="flex w-96 flex-col md:w-[600px]">\n    <section className="mb-6 flex w-full flex-col border-b border-sky-800 pb-6">\n      <aside className="mb-6 flex">\n        <h2 className="text-2xl">Welcome to our Event!</h2>\n      </aside>\n      <main className="flex flex-col space-x-4">\n        <p className="text-body mb-4 text-white">\n          Please scan the QR code for your wallet address that holds the NFT.\n        </p>\n        <div id="middle" className="flex h-3/4 items-center justify-center">\n          {!scanning && (\n            <button\n              onClick={() => startScanning()}\n              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"\n            >\n              Scan QR Code\n            </button>\n          )}\n          {scanning && (\n            <div id="reader-container" className="h-full w-full">\n              <div id="reader"></div>\n            </div>\n          )}\n        </div>\n        <div id="bottom" className="h-1/8">\n          <br />\n          <p>Last scanned: {scannedAddress}</p>\n          <p>Authorized: {authorized ? \'Yes\' : \'No\'}</p>\n        </div>\n      </main>\n    </section>\n  </div>\n);\n')),(0,o.yg)("p",null,"Run the app, and press the button to enable your camera. You may have to grant permissions."),(0,o.yg)("p",null,"On your phone, open your wallet app, display the QR code you use to receive payments and show it to the camera. Your wallet address will be displayed below the video. If you have another wallet app, try it as well."),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"Authorized")," won't change because you aren't checking for NFT ownership yet."),(0,o.yg)("h3",{id:"verifying-nft-ownership"},"Verifying NFT Ownership"),(0,o.yg)("p",null,"To verify NFT ownership, you can use the ERC-721 ",(0,o.yg)("inlineCode",{parentName:"p"},"balanceOf")," function and check that the balance returned for the scanned address is > 0. To call this, you'll need the address of the NFT contract, which you got above from the Nouns Builder page, and the ABI for the contract."),(0,o.yg)("p",null,"You may be used to generating the ABI as a part of your deployment process, but that's not the only way to get it. They also ",(0,o.yg)("strong",{parentName:"p"},"don't")," need to be complete, and aren't unique for contracts following a specification."),(0,o.yg)("p",null,"This means that you can use a simplified one here. Add a folder in ",(0,o.yg)("inlineCode",{parentName:"p"},"app")," called ",(0,o.yg)("inlineCode",{parentName:"p"},"constants"),", and a file called ",(0,o.yg)("inlineCode",{parentName:"p"},"abi.ts"),". In it, put:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"export const abi = [\n  {\n    constant: true,\n    inputs: [\n      {\n        name: 'owner',\n        type: 'address',\n      },\n    ],\n    name: 'balanceOf',\n    outputs: [\n      {\n        name: '',\n        type: 'uint256',\n      },\n    ],\n    payable: false,\n    stateMutability: 'view',\n    type: 'function',\n  },\n] as const;\n")),(0,o.yg)("p",null,"Back in ",(0,o.yg)("inlineCode",{parentName:"p"},"page.tsx"),", import your ABI and add a constant for your contract address:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import { abi } from './constants/abi';\nconst contractAddress = '<YOUR CONTRACT ADDRESS HERE>';\n")),(0,o.yg)("p",null,"Your contract is on Base Mainnet, so you need to modify ",(0,o.yg)("inlineCode",{parentName:"p"},"src/wagmi.ts")," to use that. Go ahead and update your app name while you're there:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import { http, createConfig } from 'wagmi';\nimport { base } from 'wagmi/chains';\nimport { coinbaseWallet } from 'wagmi/connectors';\n\nexport const wagmiConfig = createConfig({\n  chains: [base],\n  // turn off injected provider discovery\n  multiInjectedProviderDiscovery: false,\n  connectors: [\n    coinbaseWallet({\n      appName: 'DAO Gate',\n      preference: 'all',\n      version: '4',\n    }),\n  ],\n  ssr: true,\n  transports: {\n    [base.id]: http(),\n  },\n});\n\ndeclare module 'wagmi' {\n  interface Register {\n    config: typeof wagmiConfig;\n  }\n}\n")),(0,o.yg)("p",null,"Return to ",(0,o.yg)("inlineCode",{parentName:"p"},"page.tsx"),", and implement a ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract")," to read the ",(0,o.yg)("inlineCode",{parentName:"p"},"balanceOf")," the scanned address. First, add needed dependencies:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import { useReadContract } from 'wagmi';\nimport { useQueryClient } from '@tanstack/react-query';\n")),(0,o.yg)("p",null,"And the ",(0,o.yg)("inlineCode",{parentName:"p"},"queryClient"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"export default function Page() {\n  // Other state variables\n\n  const queryClient = useQueryClient();\n\n  // Other code...\n")),(0,o.yg)("p",null,"Then, add the ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract")," hook:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const {\n  data: balanceData,\n  isError: balanceIsError,\n  isPending: balanceIsPending,\n  queryKey: balanceQueryKey,\n} = useReadContract({\n  address: contractAddress,\n  abi,\n  functionName: 'balanceOf',\n  args: scannedAddress ? [scannedAddress] : undefined,\n});\n")),(0,o.yg)("p",null,"And a ",(0,o.yg)("inlineCode",{parentName:"p"},"useEffect")," to handle the ",(0,o.yg)("inlineCode",{parentName:"p"},"balanceData")," being retrieved. You should also make use of the additional variables to handle errors, pending state, etc. on your own."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"useEffect(() => {\n  if (balanceData !== undefined) {\n    const balance = balanceData as bigint;\n    setAuthorized(balance > 0n);\n  }\n}, [balanceData]);\n")),(0,o.yg)("p",null,"You also need a ",(0,o.yg)("inlineCode",{parentName:"p"},"useEffect")," to refetch the data from the blockchain when ",(0,o.yg)("inlineCode",{parentName:"p"},"scannedAddress")," changes, accomplished by invalidating the query for the ",(0,o.yg)("inlineCode",{parentName:"p"},"queryKey")," you extracted from ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract")," :"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"useEffect(() => {\n  if (scannedAddress) {\n    queryClient.invalidateQueries({ queryKey: balanceQueryKey });\n  }\n}, [scannedAddress]);\n")),(0,o.yg)("p",null,"With these pieces in place, when the scanner scans a QR code, it will check if what it has read is a valid address and return it. That triggers an update to the ",(0,o.yg)("inlineCode",{parentName:"p"},"scannedAddress"),", which in turn causes a read of the blockchain to see if that address owns any of the NFTS. If the address does own at least one NFT, it sets ",(0,o.yg)("inlineCode",{parentName:"p"},"authorized")," to ",(0,o.yg)("inlineCode",{parentName:"p"},"true"),", and displays that the user may enter."),(0,o.yg)("p",null,"From here, you can add much better styling, or even pull the NFT art of the owner's NFT for a personalized welcome! Another great feature would be displaying a status level based on the number of NFTs owned by the entrant."),(0,o.yg)("h2",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"In this tutorial, you learned about ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.center/intro"},"Nouns")," and how the platform makes it easy to create avatar-based communities. You also learned how to use ",(0,o.yg)("a",{parentName:"p",href:"https://nouns.build/about"},"BuilderDAO")," to create your own DAO without writing any code. Finally, you learned how to create an app that can be used to allow or deny access to a private event based on ownership of an NFT in your DAO."),(0,o.yg)("hr",null))}u.isMDXComponent=!0},37450:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/auction-fa8c4daeef3b97b3a7f61c3cc0154bf6.png"},80594:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/create-dao-bea892d1ad566dcbd8159f383e2b494c.png"}}]);