"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[1269],{82247:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>m});var a=t(14041);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,s=function(e,n){if(null==e)return{};var t,a,s={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var l=a.createContext({}),u=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=u(e.components);return a.createElement(l.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),d=u(t),g=s,m=d["".concat(l,".").concat(g)]||d[g]||p[g]||o;return t?a.createElement(m,i(i({ref:n},c),{},{components:t})):a.createElement(m,i({ref:n},c))}));function m(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var o=t.length,i=new Array(o);i[0]=g;var r={};for(var l in n)hasOwnProperty.call(n,l)&&(r[l]=n[l]);r.originalType=e,r[d]="string"==typeof e?e:s,i[1]=r;for(var u=2;u<o;u++)i[u]=t[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},16647:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>u});var a=t(89575),s=(t(14041),t(82247));const o={title:"The `useReadContract` Hook",description:"Learn how to call view and pure functions from a smart contract.",hide_table_of_contents:!1},i=void 0,r={unversionedId:"docs/reading-and-displaying-data/useReadContract",id:"docs/reading-and-displaying-data/useReadContract",title:"The `useReadContract` Hook",description:"Learn how to call view and pure functions from a smart contract.",source:"@site/base-camp/docs/reading-and-displaying-data/useReadContract.md",sourceDirName:"docs/reading-and-displaying-data",slug:"/docs/reading-and-displaying-data/useReadContract",permalink:"/base-camp/docs/reading-and-displaying-data/useReadContract",draft:!1,tags:[],version:"current",frontMatter:{title:"The `useReadContract` Hook",description:"Learn how to call view and pure functions from a smart contract.",hide_table_of_contents:!1},sidebar:"docs",previous:{title:"The `useAccount` Hook",permalink:"/base-camp/docs/reading-and-displaying-data/useAccount"},next:{title:"Configuring `useReadContract`",permalink:"/base-camp/docs/reading-and-displaying-data/configuring-useReadContract"}},l={},u=[{value:"Objectives",id:"objectives",level:2},{value:"Contract Setup",id:"contract-setup",level:2},{value:"Create Demo Issues",id:"create-demo-issues",level:3},{value:"Reading from your Smart Contract",id:"reading-from-your-smart-contract",level:2},{value:"Using the <code>useReadContract</code> Hook",id:"using-the-usereadcontract-hook",level:3},{value:"Displaying the Data",id:"displaying-the-data",level:3},{value:"A Caveat with Automatic Getters",id:"a-caveat-with-automatic-getters",level:3},{value:"Conclusion",id:"conclusion",level:2},{value:"Simple DAO Contract Example",id:"simple-dao-contract-example",level:2}],c={toc:u},d="wrapper";function p(e){let{components:n,...o}=e;return(0,s.yg)(d,(0,a.A)({},c,o,{components:n,mdxType:"MDXLayout"}),(0,s.yg)("p",null,"The ",(0,s.yg)("inlineCode",{parentName:"p"},"useReadContract")," hook is ",(0,s.yg)("a",{parentName:"p",href:"https://wagmi.sh/"},"wagmi"),"'s method of calling ",(0,s.yg)("inlineCode",{parentName:"p"},"pure")," and ",(0,s.yg)("inlineCode",{parentName:"p"},"view")," functions from your smart contracts. As with ",(0,s.yg)("inlineCode",{parentName:"p"},"useAccount"),", ",(0,s.yg)("inlineCode",{parentName:"p"},"useReadContract")," contains a number of helpful properties to enable you to manage displaying information to your users."),(0,s.yg)("hr",null),(0,s.yg)("h2",{id:"objectives"},"Objectives"),(0,s.yg)("p",null,"By the end of this guide you should be able to:"),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},"Implement wagmi's ",(0,s.yg)("inlineCode",{parentName:"li"},"useReadContract")," hook to fetch data from a smart contract"),(0,s.yg)("li",{parentName:"ul"},"Convert data fetched from a smart contract to information displayed to the user"),(0,s.yg)("li",{parentName:"ul"},"Identify the caveats of reading data from automatically-generated getters")),(0,s.yg)("hr",null),(0,s.yg)("h2",{id:"contract-setup"},"Contract Setup"),(0,s.yg)("p",null,"For this guide, you'll be continuing from the project you started for the ",(0,s.yg)("a",{parentName:"p",href:"./useAccount"},(0,s.yg)("inlineCode",{parentName:"a"},"useAccount")," hook"),". You'll work with an upgrade to the contract that you may have created if you completed the ",(0,s.yg)("a",{parentName:"p",href:"https://docs.base.org/base-camp/docs/erc-20-token/erc-20-exercise"},"ERC 20 Tokens Exercise"),". See below for an example you can use if you don't already have your own!"),(0,s.yg)("p",null,"The contract creates a very simple DAO, in which users can create issues and vote for them, against them, or abstain. Anyone can ",(0,s.yg)("inlineCode",{parentName:"p"},"claim")," 100 tokens. This is an insecure system for demonstration purposes, since it would be trivial to claim a large number of tokens with multiple wallets, then transfer them to a single address and use that to dominate voting."),(0,s.yg)("p",null,"But it makes it much easier to test!"),(0,s.yg)("admonition",{type:"caution"},(0,s.yg)("p",{parentName:"admonition"},"If you're using your own contract, please redeploy it with the following ",(0,s.yg)("inlineCode",{parentName:"p"},"view")," functions:"),(0,s.yg)("pre",{parentName:"admonition"},(0,s.yg)("code",{parentName:"pre",className:"language-solidity"},"function numberOfIssues() public view returns(uint) {\n    return issues.length;\n}\n\nfunction getAllIssues() public view returns(ReturnableIssue[] memory) {\n    ReturnableIssue[] memory allIssues = new ReturnableIssue[](issues.length);\n\n    for(uint i = 0; i < issues.length; i++) {\n        allIssues[i] = getIssue(i);\n    }\n\n    return allIssues;\n}\n")),(0,s.yg)("p",{parentName:"admonition"},(0,s.yg)("strong",{parentName:"p"},"You also need to make the ",(0,s.yg)("inlineCode",{parentName:"strong"},"getIssue")," function ",(0,s.yg)("inlineCode",{parentName:"strong"},"public"),". The original spec called for it to be ",(0,s.yg)("inlineCode",{parentName:"strong"},"external"),"."))),(0,s.yg)("h3",{id:"create-demo-issues"},"Create Demo Issues"),(0,s.yg)("p",null,"To start, you'll need to put some data into your contract so that you can read it from your frontend. Open ",(0,s.yg)("a",{parentName:"p",href:"https://sepolia.basescan.org/"},"Sepolia BaseScan"),", find your contract, connect with your wallet, and call the ",(0,s.yg)("inlineCode",{parentName:"p"},"claim")," function."),(0,s.yg)("p",null,"Add the following two issues:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"_issueDesc: We should enable light mode by default.\n_quorom: 2\n")),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"_issueDesc: We should make inverted mouse controls the default selection.\n_quorom: 2\n")),(0,s.yg)("p",null,"Switch to a ",(0,s.yg)("strong",{parentName:"p"},"different wallet address"),". Claim your tokens with the new address, and add one more issue:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-text"},"_issueDesc: Two spaces, not four, not tabs!\n_quorom: 2\n")),(0,s.yg)("p",null,"Call the ",(0,s.yg)("inlineCode",{parentName:"p"},"getAllIssues")," function under the ",(0,s.yg)("inlineCode",{parentName:"p"},"Read Contract")," tab to make sure all three are there."),(0,s.yg)("hr",null),(0,s.yg)("h2",{id:"reading-from-your-smart-contract"},"Reading from your Smart Contract"),(0,s.yg)("p",null,"To be able to read from your deployed smart contract, you'll need two pieces of information: the address and ",(0,s.yg)("a",{parentName:"p",href:"https://docs.soliditylang.org/en/latest/abi-spec.html"},"ABI"),". These are used as parameters in the ",(0,s.yg)("inlineCode",{parentName:"p"},"useReadContract")," hook."),(0,s.yg)("p",null,"If you're using ",(0,s.yg)("a",{parentName:"p",href:"https://hardhat.org/"},"Hardhat"),", both of these can be conveniently found in a json file in the ",(0,s.yg)("inlineCode",{parentName:"p"},"deployments/<network>")," folder, named after your contract. For example, our contract is called ",(0,s.yg)("inlineCode",{parentName:"p"},"FEWeightedVoting"),", so the file is ",(0,s.yg)("inlineCode",{parentName:"p"},"deployments/base-sepolia/FEWeightedVoting.json"),"."),(0,s.yg)("p",null,"If you're using something else, it should produce a similar artifact, or separate artifacts with the ",(0,s.yg)("a",{parentName:"p",href:"https://docs.soliditylang.org/en/latest/abi-spec.html"},"ABI")," and address. If this is the case, make the adjustments you need when you import this data."),(0,s.yg)("p",null,"Either way, add a folder called ",(0,s.yg)("inlineCode",{parentName:"p"},"deployments")," and place a copy of the artifact file(s) inside."),(0,s.yg)("h3",{id:"using-the-usereadcontract-hook"},"Using the ",(0,s.yg)("inlineCode",{parentName:"h3"},"useReadContract")," Hook"),(0,s.yg)("p",null,"Add a file for a new component called ",(0,s.yg)("inlineCode",{parentName:"p"},"IssueList.tsx"),". You can start with:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"import { useReadContract } from 'wagmi';\n\nexport function IssueList() {\n  return (\n    <div>\n      <h2>All Issues</h2>\n      <div>{/* TODO: List each issue */}</div>\n    </div>\n  );\n}\n")),(0,s.yg)("p",null,"You'll need to do some prepwork to enable Typescript to more easily interpret the data returned from your contract. Add an ",(0,s.yg)("inlineCode",{parentName:"p"},"interface")," called ",(0,s.yg)("inlineCode",{parentName:"p"},"Issue")," that matches with the ",(0,s.yg)("inlineCode",{parentName:"p"},"ReturnableIssue")," type:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"interface Issue {\n  voters: string[];\n  issueDesc: string;\n  votesFor: bigint;\n  votesAgainst: bigint;\n  votesAbstain: bigint;\n  totalVotes: bigint;\n  quorum: bigint;\n  passed: boolean;\n  closed: boolean;\n}\n")),(0,s.yg)("admonition",{type:"warning"},(0,s.yg)("p",{parentName:"admonition"},"Be very careful here! ",(0,s.yg)("inlineCode",{parentName:"p"},"bigint")," is the name of the type, ",(0,s.yg)("inlineCode",{parentName:"p"},"BigInt")," is the name of the constructor for that type. If you incorrectly use the constructor as the type, much of your code will still work, but other parts will express very confusing bugs.")),(0,s.yg)("p",null,"Now, import ",(0,s.yg)("inlineCode",{parentName:"p"},"useState")," and add a state variable to hold your list of ",(0,s.yg)("inlineCode",{parentName:"p"},"Issue"),"s."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"const [issues, setIssues] = useState<Issue[]>([]);\n")),(0,s.yg)("p",null,"You'll also need to import your contract artifact:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"import contractData from '../deployments/FEWeightedVoting.json';\n")),(0,s.yg)("p",null,"Finally, the moment you've been waiting for: Time to read from your contract! Add an instance of the ",(0,s.yg)("a",{parentName:"p",href:"https://wagmi.sh/react/hooks/useReadContract"},(0,s.yg)("inlineCode",{parentName:"a"},"useReadContract"))," hook. It works similarly to the ",(0,s.yg)("a",{parentName:"p",href:"https://wagmi.sh/react/hooks/useAccount"},(0,s.yg)("inlineCode",{parentName:"a"},"useAccount"))," hook. Configure it with:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"const {\n  data: issuesData,\n  isError: issuesIsError,\n  isPending: issuesIsPending,\n} = useReadContract({\n  address: contractData.address as `0x${string}`,\n  abi: contractData.abi,\n  functionName: 'getAllIssues',\n});\n")),(0,s.yg)("p",null,"You can use ",(0,s.yg)("inlineCode",{parentName:"p"},"useEffect")," to do something when the call completes and the data. For now, just log it to the console:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"useEffect(() => {\n  if (issuesData) {\n    const issuesList = issuesData as Issue[];\n    console.log('issuesList', issuesList);\n    setIssues(issuesList);\n  }\n}, [issuesData]);\n")),(0,s.yg)("p",null,"Add in instance of your new component to ",(0,s.yg)("inlineCode",{parentName:"p"},"index.tsx"),":"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"<main className={styles.main}>\n  <ConnectButton />\n  <ConnectionWindow />\n  <IssueList />\n</main>\n")),(0,s.yg)("p",null,"Run your app, and you should see your list of issues fetched from the blockchain and displayed in the console!"),(0,s.yg)("p",null,(0,s.yg)("img",{alt:"Issues Console Log",src:t(14093).A,width:"512",height:"273"})),(0,s.yg)("p",null,"Breaking down the hook, you've:"),(0,s.yg)("ul",null,(0,s.yg)("li",{parentName:"ul"},"Renamed the properties decomposed from ",(0,s.yg)("inlineCode",{parentName:"li"},"useReadContract")," to be specific for our function. Doing so is helpful if you're going to read from more than one function in a file"),(0,s.yg)("li",{parentName:"ul"},"Configured the hook with the address and ABI for your contract"),(0,s.yg)("li",{parentName:"ul"},"Made use of ",(0,s.yg)("inlineCode",{parentName:"li"},"useEffect")," to wait for the data to be returned from the blockchain, log it to the console, and set the list of ",(0,s.yg)("inlineCode",{parentName:"li"},"Issue"),"s in state.")),(0,s.yg)("h3",{id:"displaying-the-data"},"Displaying the Data"),(0,s.yg)("p",null,"Now that you've got the data in state, you can display it via your component. One strategy to display a list of items is to compile a ",(0,s.yg)("inlineCode",{parentName:"p"},"ReactNode")," array in a render function."),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"function renderIssues() {\n  return issues.map((issue) => (\n    <div key={issue.issueDesc}>\n      <h3>{issue.issueDesc}</h3>\n      <p>{'Voters: ' + issue.voters.toString()}</p>\n      <p>{'Votes For: ' + issue.votesFor.toString()}</p>\n      <p>{'Votes Against: ' + issue.votesAgainst.toString()}</p>\n      <p>{'Votes Abstain: ' + issue.votesAbstain.toString()}</p>\n      <p>{'Quorum: ' + issue.quorum.toString()}</p>\n      <p>{'Passed: ' + issue.passed}</p>\n      <p>{'Closed: ' + issue.closed}</p>\n    </div>\n  ));\n}\n")),(0,s.yg)("p",null,"Then, call the render function in the return for your component:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"return (\n  <div>\n    <h2>All Issues</h2>\n    <div>{renderIssues()}</div>\n  </div>\n);\n")),(0,s.yg)("p",null,"You'll now see your list of issues rendered in the browser! Congrats, you've finally made a meaningful connection between your smart contract and your frontend!"),(0,s.yg)("h3",{id:"a-caveat-with-automatic-getters"},"A Caveat with Automatic Getters"),(0,s.yg)("p",null,"Remember how the Solidity compiler creates automatic getters for all of your public state variables? This feature is very helpful, but it can create bewildering results when you use it for ",(0,s.yg)("inlineCode",{parentName:"p"},"struct"),"s that contain ",(0,s.yg)("inlineCode",{parentName:"p"},"mapping"),"s. Remember, nesting mappings ",(0,s.yg)("strong",{parentName:"p"},"cannot")," be returned outside the blockchain. The ",(0,s.yg)("inlineCode",{parentName:"p"},"enumerableSet")," protects you from this problem, because it has private variables inside it, which prevents setting ",(0,s.yg)("inlineCode",{parentName:"p"},"issues")," as ",(0,s.yg)("inlineCode",{parentName:"p"},"public"),". Had we instead used a mapping, we'd lose this protection:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-solidity"},"  // Code for demo only\n  struct Issue {\n      mapping(address => bool) voters;\n      string issueDesc;\n      uint votesFor;\n      uint votesAgainst;\n      uint votesAbstain;\n      uint totalVotes;\n      uint quorum;\n      bool passed;\n      bool closed;\n  }\n")),(0,s.yg)("p",null,"Redeploy with the above change, and add a second ",(0,s.yg)("inlineCode",{parentName:"p"},"useReadContract")," to fetch an individual issue using the getter:"),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-tsx"},"// Bad code for example, do not use\nconst {\n  data: getOneData,\n  isError: getOneIsError,\n  isPending: getOneIsPending,\n} = useReadContract({\n  address: contractData.address as `0x${string}`,\n  abi: contractData.abi,\n  functionName: 'issues',\n  args: [1],\n});\n\nuseEffect(() => {\n  if (getOneData) {\n    console.log('getOneData', getOneData);\n    const issueOne = getOneData as Issue;\n    console.log('Issue One', issueOne);\n  }\n}, [getOneData]);\n")),(0,s.yg)("p",null,"Everything appears to be working just fine, but how is ",(0,s.yg)("inlineCode",{parentName:"p"},"issueOne.desc")," undefined? You can see it right there in the log!"),(0,s.yg)("p",null,(0,s.yg)("img",{alt:"Missing Data",src:t(47697).A,width:"1024",height:"408"})),(0,s.yg)("p",null,"If you look closely, you'll see that ",(0,s.yg)("inlineCode",{parentName:"p"},"voters")," is missing from the data in the logs. What's happening is that because the nested ",(0,s.yg)("inlineCode",{parentName:"p"},"mapping")," cannot be returned outside the blockchain, it simply isn't. TypeScript then gets the ",(0,s.yg)("inlineCode",{parentName:"p"},"data")," and does the best it can to cast it ",(0,s.yg)("inlineCode",{parentName:"p"},"as")," an ",(0,s.yg)("inlineCode",{parentName:"p"},"Issue"),". Since ",(0,s.yg)("inlineCode",{parentName:"p"},"voters")," is missing, this will fail and it instead does the JavaScript trick of simply tacking on the extra properties onto the object."),(0,s.yg)("p",null,"Take a look at the working example above where you retrieved the list. Notice that the keys in your ",(0,s.yg)("inlineCode",{parentName:"p"},"Issue")," type are in that log, but are missing here. The assignment has failed, and all of the ",(0,s.yg)("inlineCode",{parentName:"p"},"Issue")," properties are ",(0,s.yg)("inlineCode",{parentName:"p"},"null"),"."),(0,s.yg)("hr",null),(0,s.yg)("h2",{id:"conclusion"},"Conclusion"),(0,s.yg)("p",null,"In this guide, you've learned how to use the ",(0,s.yg)("inlineCode",{parentName:"p"},"useReadContract")," hook to call ",(0,s.yg)("inlineCode",{parentName:"p"},"pure")," and ",(0,s.yg)("inlineCode",{parentName:"p"},"view")," functions from your smart contracts. You then converted this data into React state and displayed it to the user. Finally, you explored a tricky edge case in which the presence of a nested ",(0,s.yg)("inlineCode",{parentName:"p"},"mapping")," can cause a confusing bug when using the automatically-generated getter."),(0,s.yg)("hr",null),(0,s.yg)("h2",{id:"simple-dao-contract-example"},"Simple DAO Contract Example"),(0,s.yg)("p",null,"Use this contract if you don't have your own from the ",(0,s.yg)("a",{parentName:"p",href:"https://docs.base.org/base-camp/docs/erc-20-token/erc-20-exercise"},"ERC 20 Tokens Exercise"),". You can also use this if you want to cheat to get that badge. Doing so would be silly though!"),(0,s.yg)("admonition",{type:"caution"},(0,s.yg)("p",{parentName:"admonition"},"If you use your own contract, redeploy it with the ",(0,s.yg)("inlineCode",{parentName:"p"},"numberOfIssues")," and ",(0,s.yg)("inlineCode",{parentName:"p"},"getAllIssues")," functions from the bottom of the contract below. We'll need this for our first pass solution for getting all the ",(0,s.yg)("inlineCode",{parentName:"p"},"Issues")," in the contract."),(0,s.yg)("p",{parentName:"admonition"},(0,s.yg)("strong",{parentName:"p"},"You also need to make the ",(0,s.yg)("inlineCode",{parentName:"strong"},"getIssue")," function ",(0,s.yg)("inlineCode",{parentName:"strong"},"public"),". The original spec called for it to be ",(0,s.yg)("inlineCode",{parentName:"strong"},"external"),"."))),(0,s.yg)("pre",null,(0,s.yg)("code",{parentName:"pre",className:"language-Solidity"},'// SPDX-License-Identifier: MIT\n\npragma solidity ^0.8.17;\n\nimport "@openzeppelin/contracts/token/ERC20/ERC20.sol";\nimport "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";\n\ncontract FEWeightedVoting is ERC20 {\n    using EnumerableSet for EnumerableSet.AddressSet;\n\n    mapping(address => bool) claimed;\n    uint public maxSupply = 1000000;\n    uint totalClaimed;\n\n    uint constant claimAmount = 100;\n\n    error TokensClaimed();\n    error AllTokensClaimed();\n    error NoTokensHeld();\n    error QuorumTooHigh(uint);\n    error AlreadyVoted();\n    error VotingClosed();\n\n    enum Vote {\n        AGAINST,\n        FOR,\n        ABSTAIN\n    }\n\n    struct Issue {\n        EnumerableSet.AddressSet voters;\n        string issueDesc;\n        uint votesFor;\n        uint votesAgainst;\n        uint votesAbstain;\n        uint totalVotes;\n        uint quorum;\n        bool passed;\n        bool closed;\n    }\n\n    // EnumerableSets are mappings and cannot be returned outside a contract\n    struct ReturnableIssue {\n        address[] voters;\n        string issueDesc;\n        uint votesFor;\n        uint votesAgainst;\n        uint votesAbstain;\n        uint totalVotes;\n        uint quorum;\n        bool passed;\n        bool closed;\n    }\n\n    Issue[] issues;\n\n    constructor(\n        string memory _name,\n        string memory _symbol\n    ) ERC20(_name, _symbol) {\n        // Burn Issue 0\n        issues.push();\n    }\n\n    function claim() public {\n        if (claimed[msg.sender] == true) {\n            revert TokensClaimed();\n        }\n\n        if (totalSupply() >= maxSupply) {\n            revert AllTokensClaimed();\n        }\n\n        _mint(msg.sender, claimAmount);\n        claimed[msg.sender] = true;\n    }\n\n    function createIssue(\n        string memory _issueDesc,\n        uint _quorum\n    ) public returns (uint) {\n        if (balanceOf(msg.sender) == 0) {\n            revert NoTokensHeld();\n        }\n\n        if (_quorum > totalSupply()) {\n            revert QuorumTooHigh(_quorum);\n        }\n\n        Issue storage newIssue = issues.push();\n        newIssue.issueDesc = _issueDesc;\n        newIssue.quorum = _quorum;\n        return issues.length - 1;\n    }\n\n    function getIssue(uint _id) public view returns (ReturnableIssue memory) {\n        Issue storage issue = issues[_id];\n        return\n            ReturnableIssue(\n                issue.voters.values(),\n                issue.issueDesc,\n                issue.votesFor,\n                issue.votesAgainst,\n                issue.votesAbstain,\n                issue.totalVotes,\n                issue.quorum,\n                issue.closed,\n                issue.passed\n            );\n    }\n\n    function vote(uint _issueId, Vote _vote) public {\n        Issue storage issue = issues[_issueId];\n        if (issue.voters.contains(msg.sender)) {\n            revert AlreadyVoted();\n        }\n        if (issue.closed) {\n            revert VotingClosed();\n        }\n        issue.voters.add(msg.sender);\n\n        if (_vote == Vote.FOR) {\n            issue.votesFor += balanceOf(msg.sender);\n        } else if (_vote == Vote.AGAINST) {\n            issue.votesAgainst += balanceOf(msg.sender);\n        } else if (_vote == Vote.ABSTAIN) {\n            issue.votesAbstain += balanceOf(msg.sender);\n        } else {\n            revert("Error...");\n        }\n\n        issue.totalVotes += balanceOf(msg.sender);\n\n        if (issue.totalVotes >= issue.quorum) {\n            issue.closed = true;\n            if (issue.votesFor > issue.votesAgainst) {\n                issue.passed = true;\n            }\n        }\n    }\n\n    function numberOfIssues() public view returns(uint) {\n        return issues.length;\n    }\n\n    function getAllIssues() public view returns(ReturnableIssue[] memory) {\n        ReturnableIssue[] memory allIssues = new ReturnableIssue[](issues.length);\n\n        for(uint i = 0; i < issues.length; i++) {\n            allIssues[i] = getIssue(i);\n        }\n\n        return allIssues;\n    }\n}\n')),(0,s.yg)("hr",null))}p.isMDXComponent=!0},14093:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/issues-console-log-84af160828c16897d0e2f2f7adbe97aa.png"},47697:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/missing-data-c7744d9d733981a3035b77a50f4851ae.png"}}]);