"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[882],{82247:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>h});var a=n(14041);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=u(n),g=o,h=c["".concat(l,".").concat(g)]||c[g]||p[g]||i;return n?a.createElement(h,r(r({ref:t},d),{},{components:n})):a.createElement(h,r({ref:t},d))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:o,r[1]=s;for(var u=2;u<i;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},82025:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var a=n(89575),o=(n(14041),n(82247));const i={title:"Configuring `useReadContract`",description:"Configure the properties of the `useReadContract` hook.",hide_table_of_contents:!1},r=void 0,s={unversionedId:"docs/reading-and-displaying-data/configuring-useReadContract",id:"docs/reading-and-displaying-data/configuring-useReadContract",title:"Configuring `useReadContract`",description:"Configure the properties of the `useReadContract` hook.",source:"@site/base-camp/docs/reading-and-displaying-data/configuring-useReadContract.md",sourceDirName:"docs/reading-and-displaying-data",slug:"/docs/reading-and-displaying-data/configuring-useReadContract",permalink:"/base-camp/docs/reading-and-displaying-data/configuring-useReadContract",draft:!1,tags:[],version:"current",frontMatter:{title:"Configuring `useReadContract`",description:"Configure the properties of the `useReadContract` hook.",hide_table_of_contents:!1},sidebar:"docs",previous:{title:"The `useReadContract` Hook",permalink:"/base-camp/docs/reading-and-displaying-data/useReadContract"},next:{title:"The `useWriteContract` hook",permalink:"/base-camp/docs/writing-to-contracts/useWriteContract"}},l={},u=[{value:"Objectives",id:"objectives",level:2},{value:"Fetching Updates from the Blockchain",id:"fetching-updates-from-the-blockchain",level:2},{value:"The Watch Feature",id:"the-watch-feature",level:3},{value:"Pausing On Blur",id:"pausing-on-blur",level:3},{value:"Adjusting the Polling Rate",id:"adjusting-the-polling-rate",level:3},{value:"Updating on Demand",id:"updating-on-demand",level:3},{value:"Setting UI Elements",id:"setting-ui-elements",level:2},{value:"Passing Arguments",id:"passing-arguments",level:2},{value:"Conclusion",id:"conclusion",level:2}],d={toc:u},c="wrapper";function p(e){let{components:t,...n}=e;return(0,o.yg)(c,(0,a.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"The ",(0,o.yg)("a",{parentName:"p",href:"https://wagmi.sh/react/hooks/useReadContract"},(0,o.yg)("inlineCode",{parentName:"a"},"useReadContract"))," hook has a number of configurable properties that will allow you to adapt it to your needs. You can combine the functionality of TanStack queries with ","[",(0,o.yg)("inlineCode",{parentName:"p"},"useBlockNumber"),"]"," to watch the blockchain for changes, although doing so will consume a number of API calls."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"objectives"},"Objectives"),(0,o.yg)("p",null,"By the end of this guide you should be able to:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Use ",(0,o.yg)("inlineCode",{parentName:"li"},"useBlockNumber")," and the ",(0,o.yg)("inlineCode",{parentName:"li"},"queryClient")," to automatically fetch updates from the blockchain"),(0,o.yg)("li",{parentName:"ul"},"Describe the costs of using the above, and methods to reduce those costs"),(0,o.yg)("li",{parentName:"ul"},"Configure arguments to be passed with a call to a ",(0,o.yg)("inlineCode",{parentName:"li"},"pure")," or ",(0,o.yg)("inlineCode",{parentName:"li"},"view")," smart contract function"),(0,o.yg)("li",{parentName:"ul"},"Call an instance of ",(0,o.yg)("inlineCode",{parentName:"li"},"useReadContract")," on demand"),(0,o.yg)("li",{parentName:"ul"},"Utilize ",(0,o.yg)("inlineCode",{parentName:"li"},"isLoading")," and ",(0,o.yg)("inlineCode",{parentName:"li"},"isFetching")," to improve user experience")),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"fetching-updates-from-the-blockchain"},"Fetching Updates from the Blockchain"),(0,o.yg)("p",null,"You'll continue with the project you've been building and last updated while learning about the ",(0,o.yg)("a",{parentName:"p",href:"./useReadContract"},(0,o.yg)("inlineCode",{parentName:"a"},"useReadContract")," hook"),"."),(0,o.yg)("p",null,"Once the excitement of your accomplishment of finally reading from your own contract subsides, try using BaseScan to add another issue, or vote on an existing issue. You'll notice that your frontend does ",(0,o.yg)("strong",{parentName:"p"},"not")," update. There are a few ways to handle this."),(0,o.yg)("h3",{id:"the-watch-feature"},"The Watch Feature"),(0,o.yg)("p",null,"The easiest is to use ",(0,o.yg)("inlineCode",{parentName:"p"},"useBlockNumber")," with the ",(0,o.yg)("inlineCode",{parentName:"p"},"watch")," feature to automatically keep track of the block number, then use the ",(0,o.yg)("inlineCode",{parentName:"p"},"queryClient")," to update when that changes. ",(0,o.yg)("strong",{parentName:"p"},"Make sure")," you decompose the ",(0,o.yg)("inlineCode",{parentName:"p"},"queryKey")," from the return of ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"import { useEffect, useState } from 'react';\nimport { useReadContract, useBlockNumber } from 'wagmi';\nimport { useQueryClient } from '@tanstack/react-query';\n\n// Other Code\n\nexport function IssueList() {\n  // Other Code\n\n  const queryClient = useQueryClient();\n  const { data: blockNumber } = useBlockNumber({ watch: true });\n\n  const {\n    data: issuesData,\n    isError: issuesIsError,\n    isPending: issuesIsPending,\n    queryKey: issuesQueryKey,\n  } = useReadContract({\n    address: contractData.address as `0x${string}`,\n    abi: contractData.abi,\n    functionName: 'getAllIssues',\n  });\n\n  // Note that this is a separate `useEffect` from the one that handles the\n  // update after the list of issues is returned\n  useEffect(() => {\n    queryClient.invalidateQueries({ queryKey: issuesQueryKey });\n  }, [blockNumber, queryClient, issuesQueryKey]);\n\n  // Return code\n}\n")),(0,o.yg)("p",null,"Try adding a new issue and it will automatically appear on the list, although it may take more time than you are used to. Blockchain is still slower than the web."),(0,o.yg)("p",null,"It works! Unfortunately, you can't really stop here, unless you're working on a hackathon prototype or a very early stage demo. The catch is that ",(0,o.yg)("inlineCode",{parentName:"p"},"wagmi")," has a default ",(0,o.yg)("a",{parentName:"p",href:"https://wagmi.sh/react/api/createConfig#pollinginterval"},(0,o.yg)("inlineCode",{parentName:"a"},"pollingInterval"))," of 4 seconds, so having this ",(0,o.yg)("inlineCode",{parentName:"p"},"watch")," causes it to call ",(0,o.yg)("inlineCode",{parentName:"p"},"eth_blocknumber")," constantly, which then triggers an ",(0,o.yg)("inlineCode",{parentName:"p"},"eth_call"),", both of which use api credits."),(0,o.yg)("p",null,"If you were to take the obvious approach of adding a ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract")," for every function you wanted data from, and set it to ",(0,o.yg)("inlineCode",{parentName:"p"},"watch"),", things would quickly get out of hand. A single open web page with 15 functions watched in this way will hit rate-limiting in as short as an hour."),(0,o.yg)("admonition",{type:"info"},(0,o.yg)("p",{parentName:"admonition"},"Don't do this, either use multi-call via ",(0,o.yg)("a",{parentName:"p",href:"https://wagmi.sh/react/hooks/useReadContracts"},(0,o.yg)("inlineCode",{parentName:"a"},"useReadContracts")),", or consolidate your ",(0,o.yg)("inlineCode",{parentName:"p"},"view"),"s into a single function that fetches all the data you need in one call.")),(0,o.yg)("p",null,"Luckily, you have options to control these calls a little better."),(0,o.yg)("h3",{id:"pausing-on-blur"},"Pausing On Blur"),(0,o.yg)("p",null,"Once quick improvement is to simply stop watching the blockchain if the website doesn't have focus. To see this in action, add a state variable to count how many times the function has settled, and one for if the page is focused. You'll also need to set up event listeners to set the state of the latter when the page is focused or blurred."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const [timesCalled, setTimesCalled] = useState(0);\nconst [pageIsFocused, setPageIsFocused] = useState(true);\n\nuseEffect(() => {\n  const onFocus = () => setPageIsFocused(true);\n  const onBlur = () => setPageIsFocused(false);\n\n  window.addEventListener('focus', onFocus);\n  window.addEventListener('blur', onBlur);\n\n  return () => {\n    window.removeEventListener('focus', onFocus);\n    window.removeEventListener('blur', onBlur);\n  };\n}, []);\n")),(0,o.yg)("p",null,"Then, update the ",(0,o.yg)("inlineCode",{parentName:"p"},"watch")," for ",(0,o.yg)("inlineCode",{parentName:"p"},"useBlockNumber")," so that it only does so if ",(0,o.yg)("inlineCode",{parentName:"p"},"pageIsFocused"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const { data: blockNumber } = useBlockNumber({ watch: pageIsFocused });\n")),(0,o.yg)("p",null,"Add a line to the ",(0,o.yg)("inlineCode",{parentName:"p"},"useEffect")," for ",(0,o.yg)("inlineCode",{parentName:"p"},"blockNumber")," increment your counter as well."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"useEffect(() => {\n  setTimesCalled((prev) => prev + 1);\n  queryClient.invalidateQueries({ queryKey: issuesQueryKey });\n}, [blockNumber, queryClient]);\n")),(0,o.yg)("p",null,"Finally, surface your counter in the component."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"return (\n  <div>\n    <h2>Number of times called</h2>\n    <p>{timesCalled.toString()}</p>\n    <p>{'Has focus: ' + pageIsFocused}</p>\n    <h2>All Issues</h2>\n    <div>{renderIssues()}</div>\n  </div>\n);\n")),(0,o.yg)("p",null,"Now, when you watch the page, the count will go up every four seconds. When you switch to another tab or window, the counter will pause until you switch back."),(0,o.yg)("h3",{id:"adjusting-the-polling-rate"},"Adjusting the Polling Rate"),(0,o.yg)("p",null,"You likely need to share timely updates with your users, but how timely do those updates need to be to meet the requirements of your app? If you're doing instant messaging, 4 seconds may even be too long (though any faster is running into the speed blocks are added in most L2s)."),(0,o.yg)("p",null,"A more robust DAO is going to have a voting period of at least a day or two, so those users probably don't need to see that there is a new issue within 4 seconds of it hitting the chain."),(0,o.yg)("p",null,"Adjust your ",(0,o.yg)("a",{parentName:"p",href:"https://wagmi.sh/react/api/createConfig#pollinginterval"},(0,o.yg)("inlineCode",{parentName:"a"},"pollingInterval"))," by setting it in ",(0,o.yg)("inlineCode",{parentName:"p"},"getDefaultConfig")," in ",(0,o.yg)("inlineCode",{parentName:"p"},"_app.tsx"),":"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const config = getDefaultConfig({\n  appName: 'RainbowKit App',\n  projectId: 'YOUR_PROJECT_ID',\n  chains: [baseSepolia],\n  ssr: true,\n  pollingInterval: 30_000,\n});\n")),(0,o.yg)("p",null,"Setting it to 30 seconds, or 30,000 milliseconds, will reduce your API calls dramatically, without negatively impacting members of the DAO."),(0,o.yg)("p",null,"You can also set ",(0,o.yg)("inlineCode",{parentName:"p"},"pollingInterval")," if you're using ",(0,o.yg)("inlineCode",{parentName:"p"},"createConfig")," instead of the default."),(0,o.yg)("h3",{id:"updating-on-demand"},"Updating on Demand"),(0,o.yg)("p",null,"You can use a similar system to call your update function on demand. First, add a button, a handler for that button, and a state variable for it to set:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const [triggerRead, setTriggerRead] = useState(false);\n\nconst handleTriggerRead = () => {\n  setTriggerRead(true);\n};\n")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"return (\n  <div>\n    <button onClick={handleTriggerRead}>Read Now</button>\n    <h2>Number of times called</h2>\n    <p>{timesCalled.toString()}</p>\n    <p>{'Has focus: ' + pageIsFocused}</p>\n    <h2>All Issues</h2>\n    <div>{renderIssues()}</div>\n  </div>\n);\n")),(0,o.yg)("p",null,"Finally, set ",(0,o.yg)("inlineCode",{parentName:"p"},"watch")," to equal ",(0,o.yg)("inlineCode",{parentName:"p"},"triggerRead"),", instead of ",(0,o.yg)("inlineCode",{parentName:"p"},"pageIsFocused"),", and reset ",(0,o.yg)("inlineCode",{parentName:"p"},"triggerRead")," in the ",(0,o.yg)("inlineCode",{parentName:"p"},"useEffect"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"const { data: blockNumber } = useBlockNumber({ watch: triggerRead });\n\n// Other code...\n\nuseEffect(() => {\n  setTriggerRead(false);\n  queryClient.invalidateQueries({ queryKey: issuesQueryKey });\n}, [blockNumber, queryClient]);\n")),(0,o.yg)("p",null,"Now, when the user clicks the button, the hook will call the read function a single time, then set ",(0,o.yg)("inlineCode",{parentName:"p"},"watch")," back to false."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"setting-ui-elements"},"Setting UI Elements"),(0,o.yg)("p",null,'You can use the "is" return values to set UI elements depending on the status of the hook as it attempts to call a function on the blockchain.'),(0,o.yg)("p",null,"Try to modify your button to provide feedback to the user that the function has been called."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"// Bad code example, do not use\n<button disabled={issuesIsLoading} onClick={handleTriggerRead}>\n  {issuesIsLoading ? 'Loading' : 'Read Now'}\n</button>\n")),(0,o.yg)("p",null,"The above code won't break anything, but nothing will appear to happen. This happens because ",(0,o.yg)("inlineCode",{parentName:"p"},"isLoading")," is only ",(0,o.yg)("inlineCode",{parentName:"p"},"true")," in circumstances where data is loading for the first time, but no data is present. You could use this to show a spinning wheel in place of the list of issues."),(0,o.yg)("p",null,"Instead, try decomposing ",(0,o.yg)("inlineCode",{parentName:"p"},"isFetching")," in your ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract"),". This property is true while data is being fetched, even if data has already been loaded once."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"// Imperfect code example, do not use\n<button disabled={issuesIsFetching} onClick={handleTriggerRead}>\n  {issuesIsFetching ? 'Loading' : 'Read Now'}\n</button>\n")),(0,o.yg)("p",null,"You'll probably see the button flicker very quickly since the call doesn't take very long. For a production app, you'd need to add additional handling to smooth out the experience."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"passing-arguments"},"Passing Arguments"),(0,o.yg)("p",null,"Arguments are passed into a ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract")," hook by adding an array of arguments, in order, to the ",(0,o.yg)("inlineCode",{parentName:"p"},"args")," property. Common practice is to use React state variables set by UI elements to enable the arguments to be set and modified. For example, you might create a drop-down to set ",(0,o.yg)("inlineCode",{parentName:"p"},"issueNumber"),", then fetch that issue with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"// Incomplete code stub\nconst [issueNumber, setIssueNumber] = useState(0);\n\nconst { isLoading: getIssueIsLoading } = useReadContract({\n  address: contractData.address as `0x${string}`,\n  abi: contractData.abi,\n  functionName: 'getIssue',\n  args: [issueNumber],\n});\n")),(0,o.yg)("p",null,"Depending on your design needs, you can use the techniques above to either watch constantly for updates, or fetch them on user action."),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"In this guide, you've learned how to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"watch")," feature of ",(0,o.yg)("inlineCode",{parentName:"p"},"useBlockNumber")," combined with ",(0,o.yg)("inlineCode",{parentName:"p"},"useEffect")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"queryClient.invalidateQueries")," to enable your frontend to see updates to your smart contract. You've also learned the costs of doing so, and some strategies for mitigation. You've learned how to pass arguments to your functions. Finally, you've learned how to use the properties returned by ",(0,o.yg)("inlineCode",{parentName:"p"},"useReadContract")," to adjust your UI to improve the experience for your users."),(0,o.yg)("hr",null))}p.isMDXComponent=!0}}]);