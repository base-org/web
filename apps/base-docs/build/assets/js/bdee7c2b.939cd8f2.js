"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[3405],{82247:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>h});var a=r(14041);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,i=function(e,t){if(null==e)return{};var r,a,i={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var r=e.components,i=e.mdxType,n=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),g=c(r),p=i,h=g["".concat(l,".").concat(p)]||g[p]||d[p]||n;return r?a.createElement(h,o(o({ref:t},u),{},{components:r})):a.createElement(h,o({ref:t},u))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var n=r.length,o=new Array(n);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[g]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<n;c++)o[c]=r[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},45364:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>s,toc:()=>c});var a=r(89575),i=(r(14041),r(82247));const n={title:"Overview",slug:"/hardhat-tools-and-testing/overview",description:"What's in this learning material.",author:"Brian Doyle",keywords:["Hardhat Tools","Smart Contract Development","Gas Optimization","Debugging","Test Coverage","Contract Size","Solidity","Base network","Base blockchain","blockchain development"],hide_table_of_contents:!1,displayed_sidebar:null},o="Overview of Hardhat Tools and Testing",s={unversionedId:"docs/hardhat-tools-and-testing/overview",id:"docs/hardhat-tools-and-testing/overview",title:"Overview",description:"What's in this learning material.",source:"@site/base-camp/docs/hardhat-tools-and-testing/overview.md",sourceDirName:"docs/hardhat-tools-and-testing",slug:"/hardhat-tools-and-testing/overview",permalink:"/base-camp/hardhat-tools-and-testing/overview",draft:!1,tags:[],version:"current",frontMatter:{title:"Overview",slug:"/hardhat-tools-and-testing/overview",description:"What's in this learning material.",author:"Brian Doyle",keywords:["Hardhat Tools","Smart Contract Development","Gas Optimization","Debugging","Test Coverage","Contract Size","Solidity","Base network","Base blockchain","blockchain development"],hide_table_of_contents:!1,displayed_sidebar:null}},l={},c=[{value:"Objectives",id:"objectives",level:2},{value:"Profiling Size",id:"profiling-size",level:3},{value:"Profiling Gas",id:"profiling-gas",level:3},{value:"Debugging",id:"debugging",level:3},{value:"Test Coverage",id:"test-coverage",level:3},{value:"Prerequisites",id:"prerequisites",level:2},{value:"1. Basic understanding of writing smart contracts",id:"1-basic-understanding-of-writing-smart-contracts",level:3},{value:"2. Familiarity with Hardhat",id:"2-familiarity-with-hardhat",level:3}],u={toc:c},g="wrapper";function d(e){let{components:t,...r}=e;return(0,i.yg)(g,(0,a.A)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"overview-of-hardhat-tools-and-testing"},"Overview of Hardhat Tools and Testing"),(0,i.yg)("p",null,"This series of guides shows you how to use a number of ",(0,i.yg)("a",{parentName:"p",href:"https://hardhat.org/hardhat-runner/plugins"},"Hardhat plugins")," that will help you more effectively build and test your smart contracts."),(0,i.yg)("p",null,"Learn how to keep your contracts under the 24 kiB limit, improve gas costs for your users, make sure your unit tests fully cover your code, and practice debugging."),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"objectives"},"Objectives"),(0,i.yg)("p",null,"By the end of these guides, you should be able to:"),(0,i.yg)("h3",{id:"profiling-size"},"Profiling Size"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Use Hardhat Contract Sizer plugin to profile contract size"),(0,i.yg)("li",{parentName:"ul"},"Describe common strategies for managing the contract size limit"),(0,i.yg)("li",{parentName:"ul"},"Describe the impact that inheritance has on the byte code size limit"),(0,i.yg)("li",{parentName:"ul"},"Describe the impact that external contracts have on the byte code size limit"),(0,i.yg)("li",{parentName:"ul"},"Describe the impact of using libraries has on the byte code size limit"),(0,i.yg)("li",{parentName:"ul"},"Describe the impact of using the Solidity optimizer")),(0,i.yg)("h3",{id:"profiling-gas"},"Profiling Gas"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Use the Hardhat Gas Reporter plugin to profile gas usage"),(0,i.yg)("li",{parentName:"ul"},"Describe common strategies for improving the gas usage of a contract")),(0,i.yg)("h3",{id:"debugging"},"Debugging"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Use ",(0,i.yg)("inlineCode",{parentName:"li"},"console.log")," to write debugging logs"),(0,i.yg)("li",{parentName:"ul"},"List common errors and their resolutions"),(0,i.yg)("li",{parentName:"ul"},"Determine if an error is a contract error or an error in the test")),(0,i.yg)("h3",{id:"test-coverage"},"Test Coverage"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Use the Solidity Coverage plugin to analyze the coverage of your test suite"),(0,i.yg)("li",{parentName:"ul"},"Increase the coverage of your test suite")),(0,i.yg)("hr",null),(0,i.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.yg)("h3",{id:"1-basic-understanding-of-writing-smart-contracts"},"1. Basic understanding of writing smart contracts"),(0,i.yg)("p",null,"These guides assume that you're reasonably comfortable writing basic smart contracts. If you're just getting started, jump over to our ",(0,i.yg)("a",{parentName:"p",href:"https://base.org/camp"},"Basecamp")," guides and start learning!"),(0,i.yg)("h3",{id:"2-familiarity-with-hardhat"},"2. Familiarity with Hardhat"),(0,i.yg)("p",null,"We also assume that you've got Hardhat up and running, and can write unit tests for your smart contracts. If you're not there yet, but already know Solidity, you can ",(0,i.yg)("a",{parentName:"p",href:"https://docs.base.org/base-camp/docs/hardhat-setup-overview/hardhat-setup-overview-sbs"},"setup Hardhat here"),"."))}d.isMDXComponent=!0}}]);