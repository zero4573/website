import{H as C,T as b}from"./components.28de6203.js";import{J as p,by as _,u as n,o as a,t as l,s as h,D as y,bx as v,c as S,bl as r,v as t,aW as j,ah as k,az as L,aw as M,bF as $,H as s,aH as V,F as B,G as u}from"./entry.6a68f4da.js";import{_ as m}from"./nuxt-link.15379643.js";const D={key:0,class:"fixed bg-gray-200 w-full min-h-screen flex justify-center items-center opacity-100",style:{"z-index":"2"}},N=y('<div class="bg-white p-10 shadow-md rounded-xl relative"><svg class="w-12 h-12 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>',1),z=[N],H=p({__name:"GlobalLoading",setup(o){const e=_();return(c,d)=>n(e).isLoading?(a(),l("div",D,z)):h("",!0)}}),T=o=>(L("data-v-41cc9a57"),o=o(),M(),o),G={class:"relative"},I={key:0,class:"absolute -top-2 -right-2 bg-indigo-600 text-indigo-100 rounded-full text-xs h-5 w-5 text-center flex justify-center justify-content-center flex-col"},F=T(()=>t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-7 h-7"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"})],-1)),E=p({__name:"CartLink",setup(o){const e=v();return(c,d)=>{const i=m;return a(),S(i,{to:"/custom-shop/checkout",class:k({disabled:n(e).itemCount<1})},{default:r(()=>[t("div",G,[n(e).itemCount>0?(a(),l("div",I,j(n(e).itemCount),1)):h("",!0),F])]),_:1},8,["class"])}}}),J=$(E,[["__scopeId","data-v-41cc9a57"]]),W={class:"flex justify-between w-screen h-16 px-10 items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"},q={class:"p-10 mb-10"},A=t("footer",{class:"fixed bottom-0 text-center w-full p-2 text-xs py-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"}," © Consultant Demo Shop - 2023 ",-1),Q={__name:"shop",setup(o){const e=_();return(c,d)=>{const i=b,x=C,g=H,f=m,w=J;return a(),l(B,null,[s(x,null,{default:r(()=>[s(i,null,{default:r(()=>[u("Consultant Demo Shop")]),_:1})]),_:1}),t("div",{class:k(["min-h-screen",{dark:n(e).isDarkTheme}])},[s(g),t("header",null,[t("div",W,[s(f,{to:"/custom-shop"},{default:r(()=>[u("Consultant Demo Shop")]),_:1}),s(w)])]),t("main",q,[V(c.$slots,"default")]),A],2)],64)}}};export{Q as default};