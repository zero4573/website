import{u as p,H as y,T as C}from"./global.04701745.js";import{M as _,b9 as s,o as a,c as l,y as h,I as S,x as v,w as r,a as t,t as b,ap as k,p as L,e as j,_ as M,b as n,aO as $,F as V,d as u}from"./entry.d1a15316.js";import{_ as m}from"./nuxt-link.c5f39208.js";import{u as B}from"./checkout.0f8fc8f0.js";import"./vue.f36acd1f.b47a3026.js";const N={key:0,class:"fixed bg-gray-200 w-full min-h-screen flex justify-center items-center opacity-100",style:{"z-index":"2"}},D=S('<div class="bg-white p-10 shadow-md rounded-xl relative"><svg class="w-12 h-12 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>',1),I=[D],T=_({__name:"GlobalLoading",setup(o){const e=p();return(c,d)=>s(e).isLoading?(a(),l("div",N,I)):h("",!0)}}),z=o=>(L("data-v-41cc9a57"),o=o(),j(),o),G={class:"relative"},H={key:0,class:"absolute -top-2 -right-2 bg-indigo-600 text-indigo-100 rounded-full text-xs h-5 w-5 text-center flex justify-center justify-content-center flex-col"},F=z(()=>t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-7 h-7"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"})],-1)),E=_({__name:"CartLink",setup(o){const e=B();return(c,d)=>{const i=m;return a(),v(i,{to:"/custom-shop/checkout",class:k({disabled:s(e).itemCount<1})},{default:r(()=>[t("div",G,[s(e).itemCount>0?(a(),l("div",H,b(s(e).itemCount),1)):h("",!0),F])]),_:1},8,["class"])}}});const O=M(E,[["__scopeId","data-v-41cc9a57"]]),q={class:"flex justify-between w-screen h-16 px-10 items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"},A={class:"p-10 mb-10"},J=t("footer",{class:"fixed bottom-0 text-center w-full p-2 text-xs py-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"}," ©Sunny's Sunnies (Consultant Demo Shop) - 2023 ",-1),W={__name:"shop",setup(o){const e=p();return(c,d)=>{const i=C,x=y,g=T,f=m,w=O;return a(),l(V,null,[n(x,null,{default:r(()=>[n(i,null,{default:r(()=>[u("Sunny's Sunnies (Consultant Demo Shop)")]),_:1})]),_:1}),t("div",{class:k(["min-h-screen",{dark:s(e).isDarkTheme}])},[n(g),t("header",null,[t("div",q,[n(f,{to:"/custom-shop"},{default:r(()=>[u("Sunny's Sunnies (Consultant Demo Shop)")]),_:1}),n(w)])]),t("main",A,[$(c.$slots,"default")]),J],2)],64)}}};export{W as default};
