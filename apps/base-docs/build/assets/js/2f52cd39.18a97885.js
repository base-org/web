"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[8451],{82247:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>u});var n=a(14041);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,l=e.originalType,p=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),d=s(a),h=o,u=d["".concat(p,".").concat(h)]||d[h]||g[h]||l;return a?n.createElement(u,i(i({ref:t},c),{},{components:a})):n.createElement(u,i({ref:t},c))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=a.length,i=new Array(l);i[0]=h;var r={};for(var p in t)hasOwnProperty.call(t,p)&&(r[p]=t[p]);r.originalType=e,r[d]="string"==typeof e?e:o,i[1]=r;for(var s=2;s<l;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},13495:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>g,frontMatter:()=>l,metadata:()=>r,toc:()=>s});var n=a(89575),o=(a(14041),a(82247));const l={title:"Building an onchain app using thirdweb",slug:"/build-with-thirdweb",description:"A tutorial that teaches how to build an NFT gallery app using thirdweb, including steps for creating an NFT collection, minting NFTs, and configuring the app for the Base testnet.",author:"taycaldwell",keywords:["thirdweb","onchain app","dapp","NFT","NFT collection","smart contract","Base blockchain","Base network","Base testnet","Base test network","mint NFTs","web3 wallet","app development","dapp development","build a dapp on Base","build on Base"],tags:["smart contracts","nft"],difficulty:"beginner",displayed_sidebar:null},i=void 0,r={unversionedId:"docs/build-with-thirdweb",id:"docs/build-with-thirdweb",title:"Building an onchain app using thirdweb",description:"A tutorial that teaches how to build an NFT gallery app using thirdweb, including steps for creating an NFT collection, minting NFTs, and configuring the app for the Base testnet.",source:"@site/tutorials/docs/1_build-with-thirdweb.md",sourceDirName:"docs",slug:"/build-with-thirdweb",permalink:"/tutorials/build-with-thirdweb",draft:!1,tags:[{label:"smart contracts",permalink:"/tutorials/tags/smart-contracts"},{label:"nft",permalink:"/tutorials/tags/nft"}],version:"current",sidebarPosition:1,frontMatter:{title:"Building an onchain app using thirdweb",slug:"/build-with-thirdweb",description:"A tutorial that teaches how to build an NFT gallery app using thirdweb, including steps for creating an NFT collection, minting NFTs, and configuring the app for the Base testnet.",author:"taycaldwell",keywords:["thirdweb","onchain app","dapp","NFT","NFT collection","smart contract","Base blockchain","Base network","Base testnet","Base test network","mint NFTs","web3 wallet","app development","dapp development","build a dapp on Base","build on Base"],tags:["smart contracts","nft"],difficulty:"beginner",displayed_sidebar:null}},p={},s=[{value:"Objectives",id:"objectives",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"1. Setting Up a Coinbase Wallet",id:"1-setting-up-a-coinbase-wallet",level:3},{value:"2. Wallet Funding",id:"2-wallet-funding",level:3},{value:"Creating an NFT Collection",id:"creating-an-nft-collection",level:2},{value:"Building an NFT Gallery App",id:"building-an-nft-gallery-app",level:2},{value:"Running the Application",id:"running-the-application",level:2},{value:"Conclusion",id:"conclusion",level:2}],c={toc:s},d="wrapper";function g(e){let{components:t,...l}=e;return(0,o.yg)(d,(0,n.A)({},c,l,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"In this tutorial you will learn how to build an app on Base using the ",(0,o.yg)("a",{parentName:"p",href:"https://portal.thirdweb.com/"},"thirdweb")," platform."),(0,o.yg)("p",null,"To achieve this, you will deploy a smart contract for a NFT collection and create an NFT gallery app for viewing the metadata details of each NFT within the collection."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"objectives"},"Objectives"),(0,o.yg)("p",null,"By the end of this tutorial, you should be able to:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Create an NFT collection and mint new NFTs using thirdweb."),(0,o.yg)("li",{parentName:"ul"},"Develop an NFT gallery app using a prebuilt thirdweb templates.")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.yg)("h3",{id:"1-setting-up-a-coinbase-wallet"},"1. Setting Up a Coinbase Wallet"),(0,o.yg)("p",null,"To begin developing an app on Base, you first need to set up a web3 wallet. We recommend using the Coinbase Wallet, which can be easily created by downloading the Coinbase Wallet browser extension."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en"},"Download Coinbase Wallet")),(0,o.yg)("h3",{id:"2-wallet-funding"},"2. Wallet Funding"),(0,o.yg)("p",null,"Blockchain transactions, including deploying smart contracts, necessitate a gas fee. Therefore, you will need to fund your wallet with ETH to cover those gas fees."),(0,o.yg)("p",null,"For this tutorial, you will be deploying a contract to the Base Sepolia test network. You can fund your wallet with Base Sepolia ETH using one of the faucets listed on the Base ",(0,o.yg)("a",{parentName:"p",href:"https://docs.base.org/tools/network-faucets"},"Network Faucets")," page."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"creating-an-nft-collection"},"Creating an NFT Collection"),(0,o.yg)("p",null,"Before developing an app, you need to create an NFT collection via thirdweb."),(0,o.yg)("p",null,"Follow these steps to set up your NFT collection:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Visit the ",(0,o.yg)("a",{parentName:"li",href:"https://thirdweb.com/dashboard"},"thirdweb dashboard"),"."),(0,o.yg)("li",{parentName:"ol"},"Click the ",(0,o.yg)("strong",{parentName:"li"},"Connect Wallet")," button located in the upper right corner to connect your wallet."),(0,o.yg)("li",{parentName:"ol"},"From the dashboard, select ",(0,o.yg)("strong",{parentName:"li"},(0,o.yg)("a",{parentName:"strong",href:"https://thirdweb.com/explore"},"Browse contracts"))," to explore a list of deployable smart contracts."),(0,o.yg)("li",{parentName:"ol"},"Navigate to the ",(0,o.yg)("strong",{parentName:"li"},"NFTs")," section and select the ",(0,o.yg)("strong",{parentName:"li"},(0,o.yg)("a",{parentName:"strong",href:"https://thirdweb.com/thirdweb.eth/TokenERC721"},"NFT Collection"))," smart contract."),(0,o.yg)("li",{parentName:"ol"},"Click the ",(0,o.yg)("strong",{parentName:"li"},"Deploy now")," button."),(0,o.yg)("li",{parentName:"ol"},"Provide the required details for your NFT collection:",(0,o.yg)("ol",{parentName:"li"},(0,o.yg)("li",{parentName:"ol"},"Contract metadata (i.e. image, name, symbol, description)"),(0,o.yg)("li",{parentName:"ol"},"Network (Choose ",(0,o.yg)("strong",{parentName:"li"},"Base Sepolia Testnet"),")"))),(0,o.yg)("li",{parentName:"ol"},"Click ",(0,o.yg)("strong",{parentName:"li"},"Deploy Now"),".")),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Thirdweb Deploy Contract",src:a(39137).A,width:"1016",height:"1892"})),(0,o.yg)("admonition",{type:"info"},(0,o.yg)("p",{parentName:"admonition"},"For production / mainnet deployments select ",(0,o.yg)("inlineCode",{parentName:"p"},"Base")," (mainnet) as the network rather than ",(0,o.yg)("inlineCode",{parentName:"p"},"Base Sepolia"),".")),(0,o.yg)("p",null,"Post-deployment, you can manage your smart contract via the ",(0,o.yg)("a",{parentName:"p",href:"https://thirdweb.com/dashboard/contracts"},"thirdweb dashboard"),"."),(0,o.yg)("p",null,"Currently, your NFT Collection lacks NFTs. To populate our upcoming NFT Gallery app, we will need to create several NFTs."),(0,o.yg)("p",null,"Follow the steps below to mint new NFTs:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Visit the ",(0,o.yg)("a",{parentName:"li",href:"https://thirdweb.com/dashboard"},"thirdweb dashboard"),"."),(0,o.yg)("li",{parentName:"ol"},"From the dashboard, select ",(0,o.yg)("strong",{parentName:"li"},(0,o.yg)("a",{parentName:"strong",href:"https://thirdweb.com/dashboard/contracts"},"View contracts"))," to view all your previously deployed contracts."),(0,o.yg)("li",{parentName:"ol"},"Select the NFT Collection smart contract you deployed."),(0,o.yg)("li",{parentName:"ol"},"Navigate to the ",(0,o.yg)("strong",{parentName:"li"},"NFTs")," tab on the left-hand sidebar."),(0,o.yg)("li",{parentName:"ol"},"Click ",(0,o.yg)("strong",{parentName:"li"},"Mint"),"."),(0,o.yg)("li",{parentName:"ol"},"Fill in the metadata details for the NFT (name, media, description, properties)."),(0,o.yg)("li",{parentName:"ol"},"Click ",(0,o.yg)("strong",{parentName:"li"},"Mint NFT"),".")),(0,o.yg)("p",null,"Repeat these steps to mint as many NFTs as you'd like."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Thirdweb Mint NFT",src:a(19838).A,width:"1346",height:"2012"})),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"building-an-nft-gallery-app"},"Building an NFT Gallery App"),(0,o.yg)("p",null,"With an NFT Collection in place, it's time to construct an NFT Gallery App. The ",(0,o.yg)("a",{parentName:"p",href:"https://portal.thirdweb.com/cli"},"thirdweb CLI")," provides various prebuilt and starter ",(0,o.yg)("a",{parentName:"p",href:"https://portal.thirdweb.com/templates"},"templates")," for popular app use-cases, which can significantly expedite your app development process."),(0,o.yg)("p",null,"In this tutorial, we'll use the ",(0,o.yg)("a",{parentName:"p",href:"https://portal.thirdweb.com/cli"},"thirdweb CLI")," to generate a new app project using the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/thirdweb-example/nft-gallery"},"NFT Gallery template"),"."),(0,o.yg)("p",null,"Run the following command:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"npx thirdweb create --template nft-gallery\n")),(0,o.yg)("p",null,"By default, the template is configured for an NFT collection on the Ethereum Mainnet. We will modify the code to adapt our NFT collection on the Base Sepolia Testnet."),(0,o.yg)("p",null,"Follow these steps to update the template:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Open the project using your preferred code editor."),(0,o.yg)("li",{parentName:"ol"},"Open the ",(0,o.yg)("inlineCode",{parentName:"li"},"src/consts/parameters.ts")," file.",(0,o.yg)("ol",{parentName:"li"},(0,o.yg)("li",{parentName:"ol"},"Update the ",(0,o.yg)("inlineCode",{parentName:"li"},"contractAddress")," variable to your NFT collection's contract address (found on the thirdweb dashboard)."),(0,o.yg)("li",{parentName:"ol"},"Update the ",(0,o.yg)("inlineCode",{parentName:"li"},"chain")," variable to ",(0,o.yg)("inlineCode",{parentName:"li"},"base-sepolia"),"."),(0,o.yg)("li",{parentName:"ol"},"Update the ",(0,o.yg)("inlineCode",{parentName:"li"},"blockExplorer")," variable to ",(0,o.yg)("inlineCode",{parentName:"li"},"https://sepolia.basescan.org"),"."))),(0,o.yg)("li",{parentName:"ol"},"Open the ",(0,o.yg)("inlineCode",{parentName:"li"},"src/main.tsx")," file."),(0,o.yg)("li",{parentName:"ol"},"Replace the file contents with the following code:")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},'    import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\nimport "./index.css";\nimport { ThirdwebProvider } from "@thirdweb-dev/react";\nimport { BaseSepoliaTestnet } from "@thirdweb-dev/chains";\n\n\nReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(\n  <React.StrictMode>\n    <ThirdwebProvider activeChain={BaseSepoliaTestnet}>\n      <App />\n    </ThirdwebProvider>\n  </React.StrictMode>,\n);\n')),(0,o.yg)("p",null,"The above code imports and uses ",(0,o.yg)("inlineCode",{parentName:"p"},"BaseSepoliaTestnet")," to be the ",(0,o.yg)("inlineCode",{parentName:"p"},"activeChain"),"."),(0,o.yg)("admonition",{type:"info"},(0,o.yg)("p",{parentName:"admonition"},"For production / mainnet deployments, update the information above so that the ",(0,o.yg)("inlineCode",{parentName:"p"},"chain")," variable is ",(0,o.yg)("inlineCode",{parentName:"p"},"base")," (step ii), the ",(0,o.yg)("inlineCode",{parentName:"p"},"blockExplorer")," is ",(0,o.yg)("inlineCode",{parentName:"p"},"https://basescan.org")," (step iii), and update both instances of ",(0,o.yg)("inlineCode",{parentName:"p"},"BaseSepoliaTestnet")," to ",(0,o.yg)("inlineCode",{parentName:"p"},"Base")," in the example javascript code.")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"running-the-application"},"Running the Application"),(0,o.yg)("p",null,"With the updated Base Sepolia Testnet chain and your NFT collection's address, you can view your NFT collection from the application."),(0,o.yg)("p",null,"To start the application, run the following command from the root directory:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"yarn dev\n")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"Congratulations on reaching the end of this tutorial! You've now learned how to create an NFT collection using Thirdweb, mint new NFTs, and build an NFT gallery app on the Base blockchain!"),(0,o.yg)("p",null,"As a next step, check out other prebuilt ",(0,o.yg)("a",{parentName:"p",href:"https://thirdweb.com/explore"},"smart contracts")," and starter ",(0,o.yg)("a",{parentName:"p",href:"https://portal.thirdweb.com/templates"},"templates")," provided by the ",(0,o.yg)("a",{parentName:"p",href:"https://portal.thirdweb.com"},"thirdweb")," platform that can help you build your next onchain app on Base."),(0,o.yg)("hr",null))}g.isMDXComponent=!0},39137:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/deploy-contract-054bcd52615d62c4762dc3c24271ba6f.png"},19838:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mint-nft-9d36371c00b8c9eed0aefbf11a6fe2e3.png"}}]);