"use strict";(self.webpackChunk_app_base_docs=self.webpackChunk_app_base_docs||[]).push([[4787],{32162:(e,t,a)=>{a.r(t),a.d(t,{default:()=>j});a(14041);var s=a(9546),l=a(49082);const r=()=>(0,l.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var n=a(21918),c=a(57473),i=a(68300),o=a(52247);const g={tag:"tag_YYDp"};var u=a(31085);function d(e){let{letterEntry:t}=e;return(0,u.jsxs)("article",{children:[(0,u.jsx)("h2",{children:t.letter}),(0,u.jsx)("ul",{className:"padding--none",children:t.tags.map((e=>(0,u.jsx)("li",{className:g.tag,children:(0,u.jsx)(o.A,{...e})},e.permalink)))}),(0,u.jsx)("hr",{})]})}function h(e){let{tags:t}=e;const a=function(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);t[a]??=[],t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[s]=t;return a.localeCompare(s)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}(t);return(0,u.jsx)("section",{className:"margin-vert--lg",children:a.map((e=>(0,u.jsx)(d,{letterEntry:e},e.letter)))})}var p=a(76613);function j(e){let{tags:t}=e;const a=r();return(0,u.jsxs)(n.e3,{className:(0,s.default)(c.G.wrapper.docsPages,c.G.page.docsTagsListPage),children:[(0,u.jsx)(n.be,{title:a}),(0,u.jsx)(p.A,{tag:"doc_tags_list"}),(0,u.jsx)(i.A,{children:(0,u.jsx)("div",{className:"container margin-vert--lg",children:(0,u.jsx)("div",{className:"row",children:(0,u.jsxs)("main",{className:"col col--8 col--offset-2",children:[(0,u.jsx)("h1",{children:a}),(0,u.jsx)(h,{tags:t})]})})})})]})}},52247:(e,t,a)=>{a.d(t,{A:()=>c});a(14041);var s=a(9546),l=a(9631);const r={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};var n=a(31085);function c(e){let{permalink:t,label:a,count:c}=e;return(0,n.jsxs)(l.A,{href:t,className:(0,s.default)(r.tag,c?r.tagWithCount:r.tagRegular),children:[a,c&&(0,n.jsx)("span",{children:c})]})}}}]);