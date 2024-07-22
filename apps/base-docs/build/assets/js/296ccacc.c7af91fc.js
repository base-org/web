"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[2607],{82247:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>h});var o=n(14041);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),s=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(n),d=r,h=p["".concat(l,".").concat(d)]||p[d]||y[d]||a;return n?o.createElement(h,i(i({ref:t},u),{},{components:n})):o.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[p]="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},52886:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>y,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var o=n(89575),r=(n(14041),n(82247));const a={title:"Contract Verification",description:"Verify your contract and interact with it.",hide_table_of_contents:!1},i=void 0,c={unversionedId:"docs/deployment-to-testnet/contract-verification-sbs",id:"docs/deployment-to-testnet/contract-verification-sbs",title:"Contract Verification",description:"Verify your contract and interact with it.",source:"@site/base-camp/docs/deployment-to-testnet/contract-verification-sbs.md",sourceDirName:"docs/deployment-to-testnet",slug:"/docs/deployment-to-testnet/contract-verification-sbs",permalink:"/base-camp/docs/deployment-to-testnet/contract-verification-sbs",draft:!1,tags:[],version:"current",frontMatter:{title:"Contract Verification",description:"Verify your contract and interact with it.",hide_table_of_contents:!1},sidebar:"docs",previous:{title:"Deployment to Base Sepolia",permalink:"/base-camp/docs/deployment-to-testnet/deployment-to-base-sepolia-sbs"},next:{title:"Deployment Exercise",permalink:"/base-camp/docs/deployment-to-testnet/deployment-to-testnet-exercise"}},l={},s=[{value:"Objectives",id:"objectives",level:2},{value:"Verify the Contract",id:"verify-the-contract",level:3},{value:"Interact with the Contract",id:"interact-with-the-contract",level:3},{value:"Conclusion",id:"conclusion",level:2}],u={toc:s},p="wrapper";function y(e){let{components:t,...a}=e;return(0,r.yg)(p,(0,o.A)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"Once your contract is deployed, you can verify it using a number of popular services. Doing so will let you users have confidence that your contract does what you claim, and will allow you to interact with it using a similar interface to what you used in Remix."),(0,r.yg)("hr",null),(0,r.yg)("h2",{id:"objectives"},"Objectives"),(0,r.yg)("p",null,"By the end of this lesson you should be able to:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Verify a contract on the Base Sepolia testnet and interact with it in Etherscan")),(0,r.yg)("hr",null),(0,r.yg)("h3",{id:"verify-the-contract"},"Verify the Contract"),(0,r.yg)("p",null,"Make sure you still have the address of the contract you deployed in the last article copied to the clipboard."),(0,r.yg)("p",null,"You can interact with your deployed contract using Remix, the same as before, but it's also possible to interact with it through Etherscan. Paste your address in the search field to find it."),(0,r.yg)("p",null,"On this page, you can review the balance, information about, and all the transactions that have ever occurred with your contract."),(0,r.yg)("p",null,"Click the ",(0,r.yg)("em",{parentName:"p"},"Contract")," tab in the main panel. At the top is a message asking you to ",(0,r.yg)("em",{parentName:"p"},"Verify and Publish")," your contract source code."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"Verify",src:n(77004).A,width:"549",height:"78"})),(0,r.yg)("p",null,"Verifying your contract maps the names of your functions and variables to the compiled byte code, which makes it possible to interact with the contract using a human-readable interface."),(0,r.yg)("p",null,"Click the link. Your contract address is already entered."),(0,r.yg)("p",null,"Under ",(0,r.yg)("em",{parentName:"p"},"Please select Compiler Type")," choose ","_","Solidity (Single file)"),(0,r.yg)("p",null,"For ",(0,r.yg)("em",{parentName:"p"},"Please Select Compiler Version")," select the version matching the ",(0,r.yg)("inlineCode",{parentName:"p"},"pragma")," at the top of your source file. Our examples are currently using ",(0,r.yg)("em",{parentName:"p"},"v0.8.17+commit.8df45f5f"),"."),(0,r.yg)("p",null,"For ",(0,r.yg)("em",{parentName:"p"},"Please select Open Source License Type")," pick the license that matches what you selected for your contract as the ",(0,r.yg)("inlineCode",{parentName:"p"},"SPDX-License-Identifier"),". Pick ",(0,r.yg)("em",{parentName:"p"},"None")," if you followed the Solidity-recommended practice of using ",(0,r.yg)("inlineCode",{parentName:"p"},"UNLICENSED"),"."),(0,r.yg)("p",null,"On the next page, copy and paste your source code in the window. Verify that you are not a robot, and click ",(0,r.yg)("em",{parentName:"p"},"Verify and Publish"),". You should see a success message."),(0,r.yg)("p",null,(0,r.yg)("img",{alt:"Success",src:n(46561).A,width:"818",height:"89"})),(0,r.yg)("p",null,"Click the linked address to your contract to return to the contract page. You'll now see your code!"),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("p",{parentName:"admonition"},"If you have imports, you'll need to right click on the name of the file and choose ",(0,r.yg)("inlineCode",{parentName:"p"},"Flatten"),". Submit the newly generated ",(0,r.yg)("inlineCode",{parentName:"p"},"filename_flattened.sol")," for verification.")),(0,r.yg)("h3",{id:"interact-with-the-contract"},"Interact with the Contract"),(0,r.yg)("p",null,"You can now interact with your contract using Etherscan. Click the ",(0,r.yg)("em",{parentName:"p"},"Read Contract")," button. Both of your functions will be listed here and can be tested using the web interface."),(0,r.yg)("p",null,"You won't have anything under ",(0,r.yg)("em",{parentName:"p"},"Write Contract")," because this contract doesn't have any functions that save data to state."),(0,r.yg)("hr",null),(0,r.yg)("h2",{id:"conclusion"},"Conclusion"),(0,r.yg)("p",null,"With your contracts verified, you can interact with them using online tools and your users can be secure that your code does what you claim."),(0,r.yg)("hr",null))}y.isMDXComponent=!0},46561:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/compiler-debug-log-50bbdd41270d157f4fe8b37bf63ca288.png"},77004:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/verify-and-publish-937d8f1fd6626a36862dd12e8946995f.png"}}]);