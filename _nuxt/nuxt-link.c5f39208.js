import{bJ as C,M as S,u as b,aK as y,ay as q,bK as R,bL as k,au as A,bM as N,a5 as x,aP as T,bN as L,bO as B,bC as _,bP as E,bQ as w,bR as I,bS as O}from"./entry.d1a15316.js";async function P(t,r=C()){const{path:c,matched:e}=r.resolve(t);if(!e.length||(r._routePreloaded||(r._routePreloaded=new Set),r._routePreloaded.has(c)))return;const l=r._preloadPromises=r._preloadPromises||[];if(l.length>4)return Promise.all(l).then(()=>P(t,r));r._routePreloaded.add(c);const i=e.map(a=>{var s;return(s=a.components)==null?void 0:s.default}).filter(a=>typeof a=="function");for(const a of i){const s=Promise.resolve(a()).catch(()=>{}).finally(()=>l.splice(l.indexOf(s)));l.push(s)}await Promise.all(l)}const U=(...t)=>t.find(r=>r!==void 0),V="noopener noreferrer";/*! @__NO_SIDE_EFFECTS__ */function j(t){const r=t.componentName||"NuxtLink",c=(e,l)=>{if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;const i=t.trailingSlash==="append"?I:O;if(typeof e=="string")return i(e,!0);const a="path"in e?e.path:l(e).path;return{...e,name:void 0,path:i(a,!0)}};return S({name:r,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(e,{slots:l}){const i=C(),a=b(()=>{const n=e.to||e.href||"";return c(n,i.resolve)}),s=b(()=>e.external||e.target&&e.target!=="_self"?!0:typeof a.value=="object"?!1:a.value===""||w(a.value,{acceptRelative:!0})),v=y(!1),f=y(null),p=n=>{var d;f.value=e.custom?(d=n==null?void 0:n.$el)==null?void 0:d.nextElementSibling:n==null?void 0:n.$el};if(e.prefetch!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!z()){const d=_();let h,u=null;q(()=>{const g=M();R(()=>{h=k(()=>{var m;(m=f==null?void 0:f.value)!=null&&m.tagName&&(u=g.observe(f.value,async()=>{u==null||u(),u=null;const o=typeof a.value=="string"?a.value:i.resolve(a.value).fullPath;await Promise.all([d.hooks.callHook("link:prefetch",o).catch(()=>{}),!s.value&&P(a.value,i).catch(()=>{})]),v.value=!0}))})})}),A(()=>{h&&N(h),u==null||u(),u=null})}return()=>{var g,m;if(!s.value){const o={ref:p,to:a.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(v.value&&(o.class=e.prefetchedClass||t.prefetchedClass),o.rel=e.rel),x(T("RouterLink"),o,l.default)}const n=typeof a.value=="object"?((g=i.resolve(a.value))==null?void 0:g.href)??null:a.value||null,d=e.target||null,h=e.noRel?null:U(e.rel,t.externalRelAttribute,n?V:"")||null,u=()=>E(n,{replace:e.replace});return e.custom?l.default?l.default({href:n,navigate:u,get route(){if(!n)return;const o=L(n);return{path:o.pathname,fullPath:o.pathname,get query(){return B(o.search)},hash:o.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:n}},rel:h,target:d,isExternal:s.value,isActive:!1,isExactActive:!1}):null:x("a",{ref:f,href:n,rel:h,target:d},(m=l.default)==null?void 0:m.call(l))}}})}const F=j({componentName:"NuxtLink"});function M(){const t=_();if(t._observer)return t._observer;let r=null;const c=new Map,e=(i,a)=>(r||(r=new IntersectionObserver(s=>{for(const v of s){const f=c.get(v.target);(v.isIntersecting||v.intersectionRatio>0)&&f&&f()}})),c.set(i,a),r.observe(i),()=>{c.delete(i),r.unobserve(i),c.size===0&&(r.disconnect(),r=null)});return t._observer={observe:e}}function z(){const t=navigator.connection;return!!(t&&(t.saveData||/2g/.test(t.effectiveType)))}export{F as _};
