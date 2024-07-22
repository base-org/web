"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[12],{82247:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>y});var r=n(14041);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=o,y=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(y,a(a({ref:t},c),{},{components:n})):r.createElement(y,a({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<i;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},46885:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(89575),o=(n(14041),n(82247));const i={title:"Imports",description:"Learn to import code into your contract.",hide_table_of_contents:!1},a=void 0,l={unversionedId:"docs/imports/imports-sbs",id:"docs/imports/imports-sbs",title:"Imports",description:"Learn to import code into your contract.",source:"@site/base-camp/docs/imports/imports-sbs.md",sourceDirName:"docs/imports",slug:"/docs/imports/imports-sbs",permalink:"/base-camp/docs/imports/imports-sbs",draft:!1,tags:[],version:"current",frontMatter:{title:"Imports",description:"Learn to import code into your contract.",hide_table_of_contents:!1},sidebar:"docs",previous:{title:"Imports",permalink:"/base-camp/docs/imports/imports-vid"},next:{title:"Imports Exercise",permalink:"/base-camp/docs/imports/imports-exercise"}},p={},s=[{value:"Objectives",id:"objectives",level:2},{value:"OpenZeppelin",id:"openzeppelin",level:2},{value:"Docs",id:"docs",level:3},{value:"Implementing the OpenZeppelin EnumeratedSet",id:"implementing-the-openzeppelin-enumeratedset",level:3},{value:"Trying It Out",id:"trying-it-out",level:3},{value:"Conclusion",id:"conclusion",level:2}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.yg)(u,(0,r.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"In this lesson, we'll learn how to import code written by others into your contracts. We'll also explore the ",(0,o.yg)("a",{parentName:"p",href:"https://www.openzeppelin.com/"},"OpenZeppelin")," library of smart contracts."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"objectives"},"Objectives"),(0,o.yg)("p",null,"By the end of this lesson you should be able to:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Import and use code from another file"),(0,o.yg)("li",{parentName:"ul"},"Utilize OpenZeppelin contracts within Remix")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"openzeppelin"},"OpenZeppelin"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://www.openzeppelin.com/"},"OpenZeppelin")," has a robust ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/OpenZeppelin/openzeppelin-contracts"},"library")," of well-",(0,o.yg)("a",{parentName:"p",href:"https://docs.openzeppelin.com/contracts/4.x/"},"documented")," smart contracts. These include a number of standard-compliant token implementations and a suite of utilities. All the contracts are audited and are therefore safer to use than random code you might find on the internet (you should still do your own audits before releasing to production)."),(0,o.yg)("h3",{id:"docs"},"Docs"),(0,o.yg)("p",null,"The ",(0,o.yg)("a",{parentName:"p",href:"https://docs.openzeppelin.com/contracts/4.x/"},"docs")," start with installation instructions, which we'll return to when we switch over to local development. You do ",(0,o.yg)("strong",{parentName:"p"},"not")," need to install anything to use these contracts in Remix."),(0,o.yg)("p",null,"Find the documentation for the ",(0,o.yg)("inlineCode",{parentName:"p"},"EnumerableSet")," under ",(0,o.yg)("em",{parentName:"p"},"Utils"),". This library will allow you to create ",(0,o.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Set_(abstract_data_type)"},"sets")," of ",(0,o.yg)("inlineCode",{parentName:"p"},"bytes32"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"address"),", and ",(0,o.yg)("inlineCode",{parentName:"p"},"uint256"),". Since they're enumerated, you can iterate through them. Neat!"),(0,o.yg)("h3",{id:"implementing-the-openzeppelin-enumeratedset"},"Implementing the OpenZeppelin EnumeratedSet"),(0,o.yg)("p",null,"Create a new file to work in and add the ",(0,o.yg)("inlineCode",{parentName:"p"},"pragma")," and license identifier."),(0,o.yg)("p",null,"In Remix, you can import libraries directly from Github!"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-solidity"},'import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableSet.sol";\n')),(0,o.yg)("p",null,"You should see ",(0,o.yg)("inlineCode",{parentName:"p"},"EnumerableSet.sol")," pop into your workspace files, nested deeply in a bunch of folders."),(0,o.yg)("h3",{id:"trying-it-out"},"Trying It Out"),(0,o.yg)("p",null,"Add a contract called ",(0,o.yg)("inlineCode",{parentName:"p"},"SetExploration"),". Review the extensive comments within the contract itself."),(0,o.yg)("p",null,"To use the ",(0,o.yg)("inlineCode",{parentName:"p"},"EnumerableSet"),", you need to use the ",(0,o.yg)("a",{parentName:"p",href:"https://docs.soliditylang.org/en/v0.8.17/contracts.html#using-for"},(0,o.yg)("inlineCode",{parentName:"a"},"using"))," keyword. This directive attaches all of the library methods to the type. Doing so allows you to call the method on the variable with dot notation, and the variable itself will be supplied as the first argument."),(0,o.yg)("p",null,"Follow the pattern in the example in the comments, but name the variable ",(0,o.yg)("inlineCode",{parentName:"p"},"visitors"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"using EnumerableSet for EnumerableSet.AddressSet;\n\nEnumerableSet.AddressSet private visitors;\n")),(0,o.yg)("p",null,"Add a function called ",(0,o.yg)("inlineCode",{parentName:"p"},"registerVisitor")," that makes use of the library's ",(0,o.yg)("inlineCode",{parentName:"p"},"add")," function to add the sender of the message to the ",(0,o.yg)("inlineCode",{parentName:"p"},"visitors")," set."),(0,o.yg)("admonition",{type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"There's also an ",(0,o.yg)("inlineCode",{parentName:"p"},"_add")," function, which is private.")),(0,o.yg)("details",null,(0,o.yg)("summary",null,"Reveal code"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-solidity"},"function registerVisitor() public {\n    visitors.add(msg.sender);\n}\n"))),(0,o.yg)("br",null),(0,o.yg)("p",null,"Add another function to return the ",(0,o.yg)("inlineCode",{parentName:"p"},"numberOfVisitors"),". Thanks to ",(0,o.yg)("inlineCode",{parentName:"p"},"using"),", this can cleanly call the ",(0,o.yg)("inlineCode",{parentName:"p"},"length")," function:"),(0,o.yg)("details",null,(0,o.yg)("summary",null,"Reveal code"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-solidity"},"function numberOfVisitors() public view returns (uint) {\n    return visitors.length();\n}\n"))),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"In this lesson, you imported a library from ",(0,o.yg)("a",{parentName:"p",href:"https://www.openzeppelin.com/"},"OpenZeppelin")," and implemented some of its functions. You also learned how to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"using")," keyword."),(0,o.yg)("hr",null))}d.isMDXComponent=!0}}]);