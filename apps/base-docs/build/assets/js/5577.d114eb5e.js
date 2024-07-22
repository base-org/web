"use strict";
exports.id = 5577;
exports.ids = [5577];
exports.modules = {

/***/ 9550:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  mb: () => (/* binding */ dist_y),
  Ao: () => (/* binding */ dist_a),
  vZ: () => (/* binding */ R),
  pV: () => (/* binding */ te),
  D8: () => (/* binding */ se),
  IN: () => (/* binding */ dist_p),
  jL: () => (/* binding */ T),
  lH: () => (/* binding */ ne),
  dC: () => (/* binding */ oe)
});

;// CONCATENATED MODULE: ../../node_modules/proxy-compare/dist/index.modern.js
const e=Symbol(),t=Symbol(),r="a",n="w";let o=(e,t)=>new Proxy(e,t);const s=Object.getPrototypeOf,c=new WeakMap,l=e=>e&&(c.has(e)?c.get(e):s(e)===Object.prototype||s(e)===Array.prototype),f=e=>"object"==typeof e&&null!==e,i=e=>{if(Array.isArray(e))return Array.from(e);const t=Object.getOwnPropertyDescriptors(e);return Object.values(t).forEach(e=>{e.configurable=!0}),Object.create(s(e),t)},u=e=>e[t]||e,a=(s,c,f,p)=>{if(!l(s))return s;let g=p&&p.get(s);if(!g){const e=u(s);g=(e=>Object.values(Object.getOwnPropertyDescriptors(e)).some(e=>!e.configurable&&!e.writable))(e)?[e,i(e)]:[e],null==p||p.set(s,g)}const[y,h]=g;let w=f&&f.get(y);return w&&w[1].f===!!h||(w=((o,s)=>{const c={f:s};let l=!1;const f=(e,t)=>{if(!l){let s=c[r].get(o);if(s||(s={},c[r].set(o,s)),e===n)s[n]=!0;else{let r=s[e];r||(r=new Set,s[e]=r),r.add(t)}}},i={get:(e,n)=>n===t?o:(f("k",n),a(Reflect.get(e,n),c[r],c.c,c.t)),has:(t,n)=>n===e?(l=!0,c[r].delete(o),!0):(f("h",n),Reflect.has(t,n)),getOwnPropertyDescriptor:(e,t)=>(f("o",t),Reflect.getOwnPropertyDescriptor(e,t)),ownKeys:e=>(f(n),Reflect.ownKeys(e))};return s&&(i.set=i.deleteProperty=()=>!1),[i,c]})(y,!!h),w[1].p=o(h||y,w[0]),f&&f.set(y,w)),w[1][r]=c,w[1].c=f,w[1].t=p,w[1].p},p=(e,t,r,o)=>{if(Object.is(e,t))return!1;if(!f(e)||!f(t))return!0;const s=r.get(u(e));if(!s)return!0;if(o){const r=o.get(e);if(r&&r.n===t)return r.g;o.set(e,{n:t,g:!1})}let c=null;try{for(const r of s.h||[])if(c=Reflect.has(e,r)!==Reflect.has(t,r),c)return c;if(!0===s[n]){if(c=((e,t)=>{const r=Reflect.ownKeys(e),n=Reflect.ownKeys(t);return r.length!==n.length||r.some((e,t)=>e!==n[t])})(e,t),c)return c}else for(const r of s.o||[])if(c=!!Reflect.getOwnPropertyDescriptor(e,r)!=!!Reflect.getOwnPropertyDescriptor(t,r),c)return c;for(const n of s.k||[])if(c=p(e[n],t[n],r,o),c)return c;return null===c&&(c=!0),c}finally{o&&o.set(e,{n:t,g:c})}},g=t=>!!l(t)&&e in t,y=e=>l(e)&&e[t]||null,h=(e,t=!0)=>{c.set(e,t)},w=(e,t,r)=>{const o=[],s=new WeakSet,c=(e,l)=>{if(s.has(e))return;f(e)&&s.add(e);const i=f(e)&&t.get(u(e));if(i){var a,p;if(null==(a=i.h)||a.forEach(e=>{const t=`:has(${String(e)})`;o.push(l?[...l,t]:[t])}),!0===i[n]){const e=":ownKeys";o.push(l?[...l,e]:[e])}else{var g;null==(g=i.o)||g.forEach(e=>{const t=`:hasOwn(${String(e)})`;o.push(l?[...l,t]:[t])})}null==(p=i.k)||p.forEach(t=>{r&&!("value"in(Object.getOwnPropertyDescriptor(e,t)||{}))||c(e[t],l?[...l,t]:[t])})}else l&&o.push(l)};return c(e),o},O=e=>{o=e};
//# sourceMappingURL=index.modern.mjs.map

;// CONCATENATED MODULE: ../../node_modules/valtio/esm/vanilla.mjs
/* provided dependency */ var console = __webpack_require__(4364);


const isObject = (x) => typeof x === "object" && x !== null;
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const desc = {
      value,
      enumerable: true,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (( false ? 0 : void 0) !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (( false ? 0 : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e) => {
          value.status = "rejected";
          value.reason = e;
          notifyUpdate(["reject", [prop], e]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
const [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function getVersion(proxyObject) {
  const proxyState = proxyStateMap.get(proxyObject);
  return proxyState == null ? void 0 : proxyState[1]();
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (( false ? 0 : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (( false ? 0 : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
const unstable_buildProxyFunction = (/* unused pure expression or super */ null && (buildProxyFunction));



;// CONCATENATED MODULE: ../../node_modules/@walletconnect/modal-core/dist/index.js
/* provided dependency */ var dist_console = __webpack_require__(4364);
const dist_o=proxy({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),T={state:dist_o,subscribe(e){return subscribe(dist_o,()=>e(dist_o))},push(e,t){e!==dist_o.view&&(dist_o.view=e,t&&(dist_o.data=t),dist_o.history.push(e))},reset(e){dist_o.view=e,dist_o.history=[e]},replace(e){dist_o.history.length>1&&(dist_o.history[dist_o.history.length-1]=e,dist_o.view=e)},goBack(){if(dist_o.history.length>1){dist_o.history.pop();const[e]=dist_o.history.slice(-1);dist_o.view=e}},setData(e){dist_o.data=e}},dist_a={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return dist_a.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return dist_a.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,s){if(dist_a.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let n=e;n.includes("://")||(n=e.replaceAll("/","").replaceAll(":",""),n=`${n}://`),n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,s);const i=encodeURIComponent(t);return`${n}wc?uri=${i}`},formatUniversalUrl(e,t,s){if(!dist_a.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let n=e;n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,s);const i=encodeURIComponent(t);return`${n}wc?uri=${i}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(dist_a.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{dist_console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(dist_a.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{dist_console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(dist_a.WALLETCONNECT_DEEPLINK_CHOICE)}catch{dist_console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(dist_a.WCM_VERSION,"2.6.2")}catch{dist_console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=T.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},_=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),dist_r=proxy({enabled:_,userSessionId:"",events:[],connectedWalletId:void 0}),R={state:dist_r,subscribe(e){return subscribe(dist_r.events,()=>e(snapshot(dist_r.events[dist_r.events.length-1])))},initialize(){dist_r.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(dist_r.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){dist_r.connectedWalletId=e},click(e){if(dist_r.enabled){const t={type:"CLICK",name:e.name,userSessionId:dist_r.userSessionId,timestamp:Date.now(),data:e};dist_r.events.push(t)}},track(e){if(dist_r.enabled){const t={type:"TRACK",name:e.name,userSessionId:dist_r.userSessionId,timestamp:Date.now(),data:e};dist_r.events.push(t)}},view(e){if(dist_r.enabled){const t={type:"VIEW",name:e.name,userSessionId:dist_r.userSessionId,timestamp:Date.now(),data:e};dist_r.events.push(t)}}},dist_c=proxy({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),dist_p={state:dist_c,subscribe(e){return subscribe(dist_c,()=>e(dist_c))},setChains(e){dist_c.chains=e},setWalletConnectUri(e){dist_c.walletConnectUri=e},setIsCustomDesktop(e){dist_c.isCustomDesktop=e},setIsCustomMobile(e){dist_c.isCustomMobile=e},setIsDataLoaded(e){dist_c.isDataLoaded=e},setIsUiLoaded(e){dist_c.isUiLoaded=e},setIsAuth(e){dist_c.isAuth=e}},W=proxy({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),dist_y={state:W,subscribe(e){return subscribe(W,()=>e(W))},setConfig(e){var t,s;R.initialize(),dist_p.setChains(e.chains),dist_p.setIsAuth(Boolean(e.enableAuthMode)),dist_p.setIsCustomMobile(Boolean((t=e.mobileWallets)==null?void 0:t.length)),dist_p.setIsCustomDesktop(Boolean((s=e.desktopWallets)==null?void 0:s.length)),dist_a.setModalVersionInStorage(),Object.assign(W,e)}};var V=Object.defineProperty,D=Object.getOwnPropertySymbols,H=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,M=(e,t,s)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,K=(e,t)=>{for(var s in t||(t={}))H.call(t,s)&&M(e,s,t[s]);if(D)for(var s of D(t))B.call(t,s)&&M(e,s,t[s]);return e};const L="https://explorer-api.walletconnect.com",E="wcm",dist_O="js-2.6.2";async function dist_w(e,t){const s=K({sdkType:E,sdkVersion:dist_O},t),n=new URL(e,L);return n.searchParams.append("projectId",dist_y.state.projectId),Object.entries(s).forEach(([i,l])=>{l&&n.searchParams.append(i,String(l))}),(await fetch(n)).json()}const m={async getDesktopListings(e){return dist_w("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return dist_w("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return dist_w("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return dist_w("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${L}/w3m/v1/getWalletImage/${e}?projectId=${dist_y.state.projectId}&sdkType=${E}&sdkVersion=${dist_O}`},getAssetImageUrl(e){return`${L}/w3m/v1/getAssetImage/${e}?projectId=${dist_y.state.projectId}&sdkType=${E}&sdkVersion=${dist_O}`}};var z=Object.defineProperty,j=Object.getOwnPropertySymbols,J=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable,k=(e,t,s)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,F=(e,t)=>{for(var s in t||(t={}))J.call(t,s)&&k(e,s,t[s]);if(j)for(var s of j(t))q.call(t,s)&&k(e,s,t[s]);return e};const N=dist_a.isMobile(),d=proxy({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),te={state:d,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=dist_y.state;if(e==="NONE"||t==="ALL"&&!e)return d.recomendedWallets;if(dist_a.isArray(e)){const s={recommendedIds:e.join(",")},{listings:n}=await m.getAllListings(s),i=Object.values(n);i.sort((l,v)=>{const b=e.indexOf(l.id),f=e.indexOf(v.id);return b-f}),d.recomendedWallets=i}else{const{chains:s,isAuth:n}=dist_p.state,i=s?.join(","),l=dist_a.isArray(t),v={page:1,sdks:n?"auth_v1":void 0,entries:dist_a.RECOMMENDED_WALLET_AMOUNT,chains:i,version:2,excludedIds:l?t.join(","):void 0},{listings:b}=N?await m.getMobileListings(v):await m.getDesktopListings(v);d.recomendedWallets=Object.values(b)}return d.recomendedWallets},async getWallets(e){const t=F({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:n}=dist_y.state,{recomendedWallets:i}=d;if(n==="ALL")return d.wallets;i.length?t.excludedIds=i.map(x=>x.id).join(","):dist_a.isArray(s)&&(t.excludedIds=s.join(",")),dist_a.isArray(n)&&(t.excludedIds=[t.excludedIds,n].filter(Boolean).join(",")),dist_p.state.isAuth&&(t.sdks="auth_v1");const{page:l,search:v}=e,{listings:b,total:f}=N?await m.getMobileListings(t):await m.getDesktopListings(t),A=Object.values(b),U=v?"search":"wallets";return d[U]={listings:[...d[U].listings,...A],total:f,page:l??1},{listings:A,total:f}},getWalletImageUrl(e){return m.getWalletImageUrl(e)},getAssetImageUrl(e){return m.getAssetImageUrl(e)},resetSearch(){d.search={listings:[],total:0,page:1}}},I=proxy({open:!1}),se={state:I,subscribe(e){return subscribe(I,()=>e(I))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:n}=dist_p.state;if(dist_a.removeWalletConnectDeepLink(),dist_p.setWalletConnectUri(e?.uri),dist_p.setChains(e?.chains),T.reset("ConnectWallet"),s&&n)I.open=!0,t();else{const i=setInterval(()=>{const l=dist_p.state;l.isUiLoaded&&l.isDataLoaded&&(clearInterval(i),I.open=!0,t())},200)}})},close(){I.open=!1}};var G=Object.defineProperty,$=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable,S=(e,t,s)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Y=(e,t)=>{for(var s in t||(t={}))Q.call(t,s)&&S(e,s,t[s]);if($)for(var s of $(t))X.call(t,s)&&S(e,s,t[s]);return e};function Z(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const C=proxy({themeMode:Z()?"dark":"light"}),ne={state:C,subscribe(e){return subscribe(C,()=>e(C))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(C.themeMode=t),s&&(C.themeVariables=Y({},s))}},dist_g=proxy({open:!1,message:"",variant:"success"}),oe={state:dist_g,subscribe(e){return subscribe(dist_g,()=>e(dist_g))},openToast(e,t){dist_g.open=!0,dist_g.message=e,dist_g.variant=t},closeToast(){dist_g.open=!1}};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 85577:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletConnectModal: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var _walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9550);
class d{constructor(e){this.openModal=_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .ModalCtrl */ .D8.open,this.closeModal=_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .ModalCtrl */ .D8.close,this.subscribeModal=_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .ModalCtrl */ .D8.subscribe,this.setTheme=_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .ThemeCtrl */ .lH.setThemeConfig,_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .ThemeCtrl */ .lH.setThemeConfig(e),_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .ConfigCtrl */ .mb.setConfig(e),this.initUi()}async initUi(){if(typeof window<"u"){await __webpack_require__.e(/* import() */ 7686).then(__webpack_require__.bind(__webpack_require__, 27686));const e=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",e),_walletconnect_modal_core__WEBPACK_IMPORTED_MODULE_0__/* .OptionsCtrl */ .IN.setIsUiLoaded(!0)}}}
//# sourceMappingURL=index.js.map


/***/ })

};
;