"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[3615],{82247:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>y});var a=t(14041);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(t),g=o,y=u["".concat(p,".").concat(g)]||u[g]||d[g]||i;return t?a.createElement(y,r(r({ref:n},c),{},{components:t})):a.createElement(y,r({ref:n},c))}));function y(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,r=new Array(i);r[0]=g;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[u]="string"==typeof e?e:o,r[1]=l;for(var s=2;s<i;s++)r[s]=t[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},54847:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=t(89575),o=(t(14041),t(82247));const i={title:"Building an Onchain App",description:"Learn step-by-step how to turn a regular template app into an onchain app with a wallet connection.",hide_table_of_contents:!1},r=void 0,l={unversionedId:"docs/frontend-setup/building-an-onchain-app",id:"docs/frontend-setup/building-an-onchain-app",title:"Building an Onchain App",description:"Learn step-by-step how to turn a regular template app into an onchain app with a wallet connection.",source:"@site/base-camp/docs/frontend-setup/building-an-onchain-app.md",sourceDirName:"docs/frontend-setup",slug:"/docs/frontend-setup/building-an-onchain-app",permalink:"/base-camp/docs/frontend-setup/building-an-onchain-app",draft:!1,tags:[],version:"current",frontMatter:{title:"Building an Onchain App",description:"Learn step-by-step how to turn a regular template app into an onchain app with a wallet connection.",hide_table_of_contents:!1},sidebar:"docs",previous:{title:"Wallet Connectors",permalink:"/base-camp/docs/frontend-setup/wallet-connectors"},next:{title:"The `useAccount` Hook",permalink:"/base-camp/docs/reading-and-displaying-data/useAccount"}},p={},s=[{value:"Objectives",id:"objectives",level:2},{value:"Creating the Traditional App",id:"creating-the-traditional-app",level:2},{value:"Manually Installing RainbowKit, Wagmi, and Viem",id:"manually-installing-rainbowkit-wagmi-and-viem",level:3},{value:"Adding Imports, Connectors, Config",id:"adding-imports-connectors-config",level:2},{value:"Imports",id:"imports",level:3},{value:"Config",id:"config",level:3},{value:"Returning the Context Providers",id:"returning-the-context-providers",level:3},{value:"Using Your new Providers",id:"using-your-new-providers",level:2},{value:"Adding the Connect Button",id:"adding-the-connect-button",level:2},{value:"Conclusion",id:"conclusion",level:2}],c={toc:s},u="wrapper";function d(e){let{components:n,...t}=e;return(0,o.yg)(u,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"While it's convenient and fast to start from a template, the template may not fit your needs. Whether you prefer a different stack, or have already started building the traditional web components of your app, it's common to need to manually add onchain libraries to get your app working."),(0,o.yg)("p",null,"In this guide, we'll build the beginnings of an app similar to the one created by the ",(0,o.yg)("a",{parentName:"p",href:"https://www.rainbowkit.com/"},"RainbowKit")," quick start, but we'll do it piece by piece. You can follow along, and swap out any of our library choices with the ones you prefer."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"objectives"},"Objectives"),(0,o.yg)("p",null,"By the end of this guide you should be able to:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Identify the role of a wallet aggregator in an onchain app"),(0,o.yg)("li",{parentName:"ul"},"Debate the pros and cons of using a template"),(0,o.yg)("li",{parentName:"ul"},"Add a wallet connection to a standard template app")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"creating-the-traditional-app"},"Creating the Traditional App"),(0,o.yg)("p",null,"Start by running the ",(0,o.yg)("a",{parentName:"p",href:"https://nextjs.org/"},"Next.js")," script to create a Next.js 13 app:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"npx create-next-app@latest --use-yarn\n")),(0,o.yg)("p",null,"This script will accept ",(0,o.yg)("inlineCode",{parentName:"p"},"."),", if you want to add the project to the root of a folder you've already created. Otherwise, name your project. Select each option in the generation script as you see fit. We recommend the following selections:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Use Typescript?: Yes"),(0,o.yg)("li",{parentName:"ul"},"Use ESLint?: Yes"),(0,o.yg)("li",{parentName:"ul"},"Use Tailwind?: Your preference"),(0,o.yg)("li",{parentName:"ul"},"Use ",(0,o.yg)("inlineCode",{parentName:"li"},"src/")," directory?: Yes"),(0,o.yg)("li",{parentName:"ul"},"Use App Router?: Yes"),(0,o.yg)("li",{parentName:"ul"},"Customize the default import alias?: No")),(0,o.yg)("admonition",{type:"info"},(0,o.yg)("p",{parentName:"admonition"},"The default Next.js script installs ",(0,o.yg)("a",{parentName:"p",href:"https://tailwindcss.com/"},"Tailwind"),". ",(0,o.yg)("a",{parentName:"p",href:"https://www.rainbowkit.com/"},"RainbowKit"),"'s does not.")),(0,o.yg)("p",null,"Run your app with ",(0,o.yg)("inlineCode",{parentName:"p"},"yarn dev")," to make sure it generated correctly."),(0,o.yg)("h3",{id:"manually-installing-rainbowkit-wagmi-and-viem"},"Manually Installing RainbowKit, Wagmi, and Viem"),(0,o.yg)("p",null,"The ",(0,o.yg)("a",{parentName:"p",href:"https://www.rainbowkit.com/docs/installation"},"quick start")," guide for RainbowKit also contains step-by-step instructions for manual install. We'll be following an adjusted version here. Most of the setup is actually for configuring ",(0,o.yg)("a",{parentName:"p",href:"https://wagmi.sh/"},"wagmi"),", which sits on top of ",(0,o.yg)("a",{parentName:"p",href:"https://viem.sh/"},"viem")," and makes it much easier to write React that interacts with the blockchain."),(0,o.yg)("p",null,"Start by installing the dependencies:"),(0,o.yg)("p",null,":::bash"),(0,o.yg)("p",null,"npm install @rainbow-me/rainbowkit wagmi ",(0,o.yg)("a",{parentName:"p",href:"mailto:viem@2.x"},"viem@2.x")," @tanstack/react-query"),(0,o.yg)("p",null,":::"),(0,o.yg)("admonition",{type:"info"},(0,o.yg)("p",{parentName:"admonition"},"Onchain libraries and packages tend to require very current versions of Node. If you're not already using it, you may want to install ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/nvm-sh/nvm"},"nvm"),".")),(0,o.yg)("h2",{id:"adding-imports-connectors-config"},"Adding Imports, Connectors, Config"),(0,o.yg)("p",null,"In Next.js 14 with the app router, the root of your app is found in ",(0,o.yg)("inlineCode",{parentName:"p"},"app/layout.tsx"),", if you followed the recommended setup options. As we want the blockchain provider context to be available for the entire app, we'll add it here."),(0,o.yg)("p",null,"You'll need to set up your providers in a second file, so that you can add ",(0,o.yg)("inlineCode",{parentName:"p"},'"use client":')," to the top. Doing so forces this code to be run client side, which is necessary since your server won't have access to your users' wallet information."),(0,o.yg)("admonition",{type:"caution"},(0,o.yg)("p",{parentName:"admonition"},"You must configure these wrappers in a separate file. It will not work if you try to add them and ",(0,o.yg)("inlineCode",{parentName:"p"},'"use client":')," directly in ",(0,o.yg)("inlineCode",{parentName:"p"},"layout.tsx"),"!")),(0,o.yg)("p",null,"Add a new file in the ",(0,o.yg)("inlineCode",{parentName:"p"},"app")," folder called ",(0,o.yg)("inlineCode",{parentName:"p"},"providers.tsx"),"."),(0,o.yg)("h3",{id:"imports"},"Imports"),(0,o.yg)("p",null,"As discussed above, add ",(0,o.yg)("inlineCode",{parentName:"p"},'"use client":')," to the top of the file."),(0,o.yg)("p",null,"Continue with the imports:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import '@rainbow-me/rainbowkit/styles.css';\nimport { useState, type ReactNode } from 'react';\nimport { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';\nimport { WagmiProvider } from 'wagmi';\nimport { base, baseSepolia } from 'wagmi/chains';\nimport { QueryClientProvider, QueryClient } from '@tanstack/react-query';\n")),(0,o.yg)("admonition",{type:"caution"},(0,o.yg)("p",{parentName:"admonition"},"If you're adapting this guide to a different set of libraries or platforms, you may need to import ",(0,o.yg)("inlineCode",{parentName:"p"},"styles.css")," differently. You'll know this is the case if you get ugly text at the bottom of the page instead of a nice modal when you click the connect button.")),(0,o.yg)("h3",{id:"config"},"Config"),(0,o.yg)("p",null,"Now, we'll configure the chains, wallet connectors, and providers for your app. We'll use ",(0,o.yg)("inlineCode",{parentName:"p"},"getDefaultConfig")," for now, to get started. See our guide on ",(0,o.yg)("a",{parentName:"p",href:"https://docs.base.org/connecting-to-the-blockchain/overview"},"Connecting to the Blockchain")," for more information on blockchain providers."),(0,o.yg)("p",null,"You'll need a ",(0,o.yg)("inlineCode",{parentName:"p"},"projectId")," from ",(0,o.yg)("a",{parentName:"p",href:"https://cloud.walletconnect.com/"},"Wallet Connect Cloud"),", which you can get for free on their site. Make sure to insert it in the appropriate place."),(0,o.yg)("admonition",{type:"danger"},(0,o.yg)("p",{parentName:"admonition"},"Remember, everything on the frontend is public! Be sure to configure the allowlist for your WalletConnect id!")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const config = getDefaultConfig({\n  appName: 'Cool Onchain App',\n  projectId: 'YOUR_PROJECT_ID',\n  chains: [base, baseSepolia],\n  ssr: true, // If your dApp uses server side rendering (SSR)\n});\n")),(0,o.yg)("h3",{id:"returning-the-context-providers"},"Returning the Context Providers"),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://tanstack.com/query/latest"},"TanStack Query")," is now a required dependency for wagmi, and you need to add it as a React context provider. The short version is that it helps with state management. Read the docs for the long version!"),(0,o.yg)("p",null,"Add an exported function for the providers. This sets up the ",(0,o.yg)("inlineCode",{parentName:"p"},"QueryClient")," and returns ",(0,o.yg)("inlineCode",{parentName:"p"},"props.children")," wrapped in all of your providers."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"export function Providers(props: { children: ReactNode }) {\n  const [queryClient] = useState(() => new QueryClient());\n\n  return (\n    <WagmiProvider config={config}>\n      <QueryClientProvider client={queryClient}>\n        <RainbowKitProvider>{props.children}</RainbowKitProvider>\n      </QueryClientProvider>\n    </WagmiProvider>\n  );\n}\n")),(0,o.yg)("h2",{id:"using-your-new-providers"},"Using Your new Providers"),(0,o.yg)("p",null,"Open ",(0,o.yg)("inlineCode",{parentName:"p"},"layout.tsx"),". Import your ",(0,o.yg)("inlineCode",{parentName:"p"},"Providers"),", being careful if you use auto-import as there are many other things with similar names in the list. Wrap the ",(0,o.yg)("inlineCode",{parentName:"p"},"children")," in your ",(0,o.yg)("inlineCode",{parentName:"p"},"return")," with the new ",(0,o.yg)("inlineCode",{parentName:"p"},"Providers"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'return (\n  <html lang="en">\n    <body className={inter.className}>\n      <Providers>{children}</Providers>\n    </body>\n  </html>\n);\n')),(0,o.yg)("h2",{id:"adding-the-connect-button"},"Adding the Connect Button"),(0,o.yg)("p",null,"You're now ready to add your connect button. You can do this anywhere in your app, thanks to the ",(0,o.yg)("inlineCode",{parentName:"p"},"RainbowKitProvider"),". Common practice would be to place the button in your app's header. Since the Next.js template doesn't have one, we'll just add it to the top of the automatically generated page, rather than spending time implementing React components."),(0,o.yg)("p",null,"Open up ",(0,o.yg)("inlineCode",{parentName:"p"},"page.tsx"),", and import the ",(0,o.yg)("inlineCode",{parentName:"p"},"ConnectButton"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import { ConnectButton } from '@rainbow-me/rainbowkit';\n")),(0,o.yg)("p",null,"Then, simply add the ",(0,o.yg)("inlineCode",{parentName:"p"},"ConnectButton")," component at the top of the first ",(0,o.yg)("inlineCode",{parentName:"p"},"<div>"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'// This function has been simplified to save space.\nexport default function Home() {\n  return (\n    <main className="flex min-h-screen flex-col items-center justify-between p-24">\n      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">\n        <ConnectButton />\n\n        {/* Other Code...*/}\n        </p>\n      </div>\n    </main>\n  );\n}\n')),(0,o.yg)("p",null,"Run your app with ",(0,o.yg)("inlineCode",{parentName:"p"},"yarn dev"),", and you should be able to use the RainbowKit connect button to connect with your wallet and switch between networks."),(0,o.yg)("p",null,"You use the ",(0,o.yg)("a",{parentName:"p",href:"https://www.rainbowkit.com/docs/connect-button"},"Connect Button")," props to modify its properties, or you can ",(0,o.yg)("a",{parentName:"p",href:"https://www.rainbowkit.com/docs/custom-connect-button"},"customize the connect button")," extensively. Some users dislike having the connect button display their token balance. Try disabling it with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"<ConnectButton showBalance={false} />\n")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"In this guide, you've learned how to assemble your onchain app from several pieces. You can use this knowledge to integrate a wallet connection with an existing site, or adjust the stack to meet your preferences. Finally, you've learned how to insert and customize the connect button."),(0,o.yg)("p",null,"If you're looking to quickly bootstrap a simple app, you can always use a script, such as the RainbowKit ","[quit start]",". If you're looking for a robust start for a consumer application, check out our ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/coinbase/build-onchain-apps"},"Build Onchain Apps")," template!"),(0,o.yg)("hr",null))}d.isMDXComponent=!0}}]);