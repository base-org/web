"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[8834],{82247:(e,n,t)=>{t.d(n,{xA:()=>l,yg:()=>p});var r=t(14041);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},l=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},h=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,c=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=u(t),h=a,p=d["".concat(s,".").concat(h)]||d[h]||f[h]||c;return t?r.createElement(p,o(o({ref:n},l),{},{components:t})):r.createElement(p,o({ref:n},l))}));function p(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var c=t.length,o=new Array(c);o[0]=h;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var u=2;u<c;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}h.displayName="MDXCreateElement"},18479:(e,n,t)=>{t.d(n,{y:()=>y});var r=t(93402),a=t(10114),c=t(15271);var o=t(43029);function i(e,n={}){return{gcTime:0,async queryFn({queryKey:n}){const{scopeKey:t,...r}=n[1],o=await function(e,n={}){const{chainId:t,...r}=n,o=e.getClient({chainId:t});return(0,c.T)(o,a.G,"getBlockNumber")(r)}(e,r);return o??null},queryKey:s(n)}}function s(e={}){return["blockNumber",(0,o.xO)(e)]}var u=t(14278),l=t(55961),d=t(27799),f=t(97686);var h=t(14041);function p(e={}){const{enabled:n=!0,onBlockNumber:t,config:r,...a}=e,o=(0,d.U)(e),i=(0,l.i)({config:o}),s=e.chainId??i;(0,h.useEffect)((()=>{if(n&&t)return function(e,n){const{syncConnectedChain:t=e._internal.syncConnectedChain,...r}=n;let a;const o=n=>{a&&a();const t=e.getClient({chainId:n}),o=(0,c.T)(t,f.q,"watchBlockNumber");return a=o(r),a},i=o(n.chainId);let s;return t&&!n.chainId&&(s=e.subscribe((({chainId:e})=>e),(async e=>o(e)))),()=>{i?.(),s?.()}}(o,{...a,chainId:s,onBlockNumber:t})}),[s,o,n,t,a.onError,a.emitMissed,a.emitOnBegin,a.poll,a.pollingInterval,a.syncConnectedChain])}function y(e={}){const{query:n={},watch:t}=e,a=(0,d.U)(e),c=(0,r.jE)(),o=(0,l.i)({config:a}),s=e.chainId??o,f=i(a,{...e,chainId:s});return p({...{config:e.config,chainId:e.chainId,..."object"==typeof t?t:{}},enabled:Boolean((n.enabled??!0)&&("object"==typeof t?t.enabled:t)),onBlockNumber(e){c.setQueryData(f.queryKey,e)}}),(0,u.IT)({...n,...f})}},29645:(e,n,t)=>{t.d(n,{Q:()=>u});var r=t(43221),a=t(43029);function c(e={}){const{abi:n,...t}=e;return["readContract",(0,a.xO)(t)]}var o=t(14278),i=t(55961),s=t(27799);function u(e={}){const{abi:n,address:t,functionName:u,query:l={}}=e,d=(0,s.U)(e),f=(0,i.i)({config:d}),h=function(e,n={}){return{async queryFn({queryKey:t}){const a=n.abi;if(!a)throw new Error("abi is required");const{address:c,functionName:o,scopeKey:i,...s}=t[1];if(!c)throw new Error("address is required");if(!o)throw new Error("functionName is required");const u=s.args;return(0,r.J)(e,{abi:a,address:c,functionName:o,args:u,...s})},queryKey:c(n)}}(d,{...e,chainId:e.chainId??f}),p=Boolean(t&&n&&u&&(l.enabled??!0));return(0,o.IT)({...l,...h,enabled:p,structuralSharing:l.structuralSharing??a.I_})}},95825:(e,n,t)=>{t.d(n,{g:()=>p});var r=t(79756),a=t(64295),c=t(55211),o=t(21390),i=t(15271);var s=t(43029);function u(e,n={}){return{async queryFn({queryKey:t}){const{hash:s,...u}=t[1];if(!s)throw new Error("hash is required");return async function(e,n){const{chainId:t,timeout:s=0,...u}=n,l=e.getClient({chainId:t}),d=(0,i.T)(l,a.n,"waitForTransactionReceipt"),f=await d({...u,timeout:s});if("reverted"===f.status){const e=(0,i.T)(l,c.x,"getTransaction"),n=await e({hash:f.transactionHash}),t=(0,i.T)(l,o.T,"call"),a=await t({...n,gasPrice:"eip1559"!==n.type?n.gasPrice:void 0,maxFeePerGas:"eip1559"===n.type?n.maxFeePerGas:void 0,maxPriorityFeePerGas:"eip1559"===n.type?n.maxPriorityFeePerGas:void 0}),s=a?.data?(0,r.IQ)(`0x${a.data.substring(138)}`):"unknown reason";throw new Error(s)}return{...f,chainId:l.chain.id}}(e,{...u,onReplaced:n.onReplaced,hash:s})},queryKey:l(n)}}function l(e={}){const{onReplaced:n,...t}=e;return["waitForTransactionReceipt",(0,s.xO)(t)]}var d=t(14278),f=t(55961),h=t(27799);function p(e={}){const{hash:n,query:t={}}=e,r=(0,h.U)(e),a=(0,f.i)({config:r}),c=u(r,{...e,chainId:e.chainId??a}),o=Boolean(n&&(t.enabled??!0));return(0,d.IT)({...t,...c,enabled:o})}},19593:(e,n,t)=>{t.d(n,{x:()=>O});var r=t(68256),a=t(46559),c=t(58501),o=t(34820),i=t(94102),s=t(77468);var u=t(88681),l=t(50761),d=t(37237);var f=t(16406),h=t(16590),p=t(70823),y=t(50327),b=t(26533),m=t(24935);async function g(e,n){const{account:t=e.account,chain:r=e.chain,accessList:a,blobs:g,data:w,gas:v,gasPrice:I,maxFeePerBlobGas:P,maxFeePerGas:x,maxPriorityFeePerGas:T,nonce:C,to:O,value:E,...F}=n;if(!t)throw new i.T({docsPath:"/docs/actions/wallet/sendTransaction"});const q=(0,o.J)(t);try{let t;if((0,p.c)(n),null!==r&&(t=await(0,c.T)(e,y.T,"getChainId")({}),function({chain:e,currentChainId:n}){if(!e)throw new s.jF;if(n!==e.id)throw new s.EH({chain:e,currentChainId:n})}({currentChainId:t,chain:r})),"local"===q.type){const n=await(0,c.T)(e,b.f,"prepareTransactionRequest")({account:q,accessList:a,blobs:g,chain:r,chainId:t,data:w,gas:v,gasPrice:I,maxFeePerBlobGas:P,maxFeePerGas:x,maxPriorityFeePerGas:T,nonce:C,parameters:[...b.M,"sidecars"],to:O,value:E,...F}),o=r?.serializers?.transaction,i=await q.signTransaction(n,{serializer:o});return await(0,c.T)(e,m.L,"sendRawTransaction")({serializedTransaction:i})}const o=e.chain?.formatters?.transactionRequest?.format,i=(o||h.Bv)({...(0,f.o)(F,{format:o}),accessList:a,blobs:g,chainId:t,data:w,from:q.address,gas:v,gasPrice:I,maxFeePerBlobGas:P,maxFeePerGas:x,maxPriorityFeePerGas:T,nonce:C,to:O,value:E});return await e.request({method:"eth_sendTransaction",params:[i]},{retryCount:0})}catch(j){throw function(e,{docsPath:n,...t}){const r=(()=>{const n=(0,d.l)(e,t);return n instanceof u.RM?e:n})();return new l.$s(r,{docsPath:n,...t})}(j,{...n,account:q,chain:n.chain||void 0})}}async function w(e,n){const{abi:t,address:r,args:o,dataSuffix:i,functionName:s,...u}=n,l=(0,a.p)({abi:t,args:o,functionName:s});return(0,c.T)(e,g,"sendTransaction")({data:`${l}${i?i.replace("0x",""):""}`,to:r,...u})}var v=t(15271),I=t(78412),P=t(4260),x=t(19455);async function T(e,n){const{account:t,chainId:r,connector:a,__mode:c,...o}=n;let i;i="object"==typeof t&&"local"===t.type?e.getClient({chainId:r}):await(0,P.r)(e,{account:t,chainId:r,connector:a});const{connector:s}=(0,I.s)(e);let u;if("prepared"===c||s?.supportsSimulation)u=o;else{const{request:n}=await async function(e,n){const{abi:t,chainId:r,connector:a,...c}=n;let o;o=n.account?n.account:(await(0,P.r)(e,{chainId:r,connector:a})).account;const i=e.getClient({chainId:r}),s=(0,v.T)(i,x.v,"simulateContract"),{result:u,request:l}=await s({...c,abi:t,account:o});return{chainId:i.chain.id,result:u,request:{__mode:"prepared",...l,chainId:r}}}(e,{...o,account:t,chainId:r});u=n}const l=(0,v.T)(i,w,"writeContract");return await l({...u,...t?{account:t}:{},chain:r?{id:r}:null})}var C=t(27799);function O(e={}){const{mutation:n}=e,t=function(e){return{mutationFn:n=>T(e,n),mutationKey:["writeContract"]}}((0,C.U)(e)),{mutate:a,mutateAsync:c,...o}=(0,r.n)({...n,...t});return{...o,writeContract:a,writeContractAsync:c}}},37198:(e,n,t)=>{t.d(n,{C:()=>c});var r=t(23165);const a=5,c=(0,t(34389).x)({...r.o,id:84531,name:"Base Goerli",nativeCurrency:{name:"Goerli Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://goerli.base.org"]}},blockExplorers:{default:{name:"Basescan",url:"https://goerli.basescan.org",apiUrl:"https://goerli.basescan.org/api"}},contracts:{...r.o.contracts,l2OutputOracle:{[a]:{address:"0x2A35891ff30313CcFa6CE88dcf3858bb075A2298"}},multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:1376988},portal:{[a]:{address:"0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA"}},l1StandardBridge:{[a]:{address:"0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a"}}},testnet:!0,sourceId:5})}}]);