const u={context:void 0,registry:void 0};function Y(e){u.context=e}function we(){return{...u.context,id:`${u.context.id}${u.context.count++}-`,count:0}}const be=(e,t)=>e===t,v=Symbol("solid-proxy"),me=Symbol("solid-track"),D={equals:be};let ie=fe;const C=1,B=2,le={owned:null,cleanups:null,context:null,owner:null};var g=null;let R=null,y=null,w=null,S=null,F=0;function U(e,t){const n=y,s=g,i=e.length===0,l=i?le:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},o=i?e:()=>e(()=>m(()=>K(l)));g=l,y=null;try{return P(o,!0)}finally{y=n,g=s}}function Ae(e,t){t=t?Object.assign({},D,t):D;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),oe(n,i));return[re.bind(n),s]}function T(e,t,n){const s=Q(e,t,!1,C);M(s)}function xe(e,t,n){ie=Ne;const s=Q(e,t,!1,C),i=J&&ae(g,J.id);i&&(s.suspense=i),(!n||!n.render)&&(s.user=!0),S?S.push(s):M(s)}function E(e,t,n){n=n?Object.assign({},D,n):D;const s=Q(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,M(s),re.bind(s)}function Je(e){return P(e,!1)}function m(e){if(y===null)return e();const t=y;y=null;try{return e()}finally{y=t}}function Ze(e){xe(()=>m(e))}function pe(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function ze(){return y}function Se(e){const t=E(e),n=E(()=>X(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let J;function re(){if(this.sources&&this.state)if(this.state===C)M(this);else{const e=w;w=null,P(()=>_(this),!1),w=e}if(y){const e=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(e)):(y.sources=[this],y.sourceSlots=[e]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return this.value}function oe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&P(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=R&&R.running;o&&R.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?w.push(l):S.push(l),l.observers&&ce(l)),o||(l.state=C)}if(w.length>1e6)throw w=[],new Error},!1)),t}function M(e){if(!e.fn)return;K(e);const t=g,n=y,s=F;y=g=e,Ee(e,e.value,s),y=n,g=t}function Ee(e,t,n){let s;try{s=e.fn(t)}catch(i){return e.pure&&(e.state=C,e.owned&&e.owned.forEach(K),e.owned=null),e.updatedAt=n+1,ue(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?oe(e,s):e.value=s,e.updatedAt=n)}function Q(e,t,n,s=C,i){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==le&&(g.owned?g.owned.push(l):g.owned=[l]),l}function q(e){if(e.state===0)return;if(e.state===B)return _(e);if(e.suspense&&m(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<F);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===C)M(e);else if(e.state===B){const s=w;w=null,P(()=>_(e,t[0]),!1),w=s}}function P(e,t){if(w)return e();let n=!1;t||(w=[]),S?n=!0:S=[],F++;try{const s=e();return Ce(n),s}catch(s){n||(S=null),w=null,ue(s)}}function Ce(e){if(w&&(fe(w),w=null),e)return;const t=S;S=null,t.length&&P(()=>ie(t),!1)}function fe(e){for(let t=0;t<e.length;t++)q(e[t])}function Ne(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:q(s)}for(u.context&&Y(),t=0;t<n;t++)q(e[t])}function _(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const i=s.state;i===C?s!==t&&(!s.updatedAt||s.updatedAt<F)&&q(s):i===B&&_(s,t)}}}function ce(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=B,n.pure?w.push(n):S.push(n),n.observers&&ce(n))}}function K(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),o=n.observerSlots.pop();s<i.length&&(l.sourceSlots[o]=s,i[s]=l,n.observerSlots[s]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)K(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function ue(e){throw e}function ae(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:ae(e.owner,t):void 0}function X(e){if(typeof e=="function"&&!e.length)return X(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=X(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}const $e=Symbol("fallback");function Z(e){for(let t=0;t<e.length;t++)e[t]()}function ke(e,t,n={}){let s=[],i=[],l=[],o=0,r=t.length>1?[]:null;return pe(()=>Z(l)),()=>{let c=e()||[],a,f;return c[me],m(()=>{let h=c.length,b,N,O,j,I,A,x,p,$;if(h===0)o!==0&&(Z(l),l=[],s=[],i=[],o=0,r&&(r=[])),n.fallback&&(s=[$e],i[0]=U(ge=>(l[0]=ge,n.fallback())),o=1);else if(o===0){for(i=new Array(h),f=0;f<h;f++)s[f]=c[f],i[f]=U(d);o=h}else{for(O=new Array(h),j=new Array(h),r&&(I=new Array(h)),A=0,x=Math.min(o,h);A<x&&s[A]===c[A];A++);for(x=o-1,p=h-1;x>=A&&p>=A&&s[x]===c[p];x--,p--)O[p]=i[x],j[p]=l[x],r&&(I[p]=r[x]);for(b=new Map,N=new Array(p+1),f=p;f>=A;f--)$=c[f],a=b.get($),N[f]=a===void 0?-1:a,b.set($,f);for(a=A;a<=x;a++)$=s[a],f=b.get($),f!==void 0&&f!==-1?(O[f]=i[a],j[f]=l[a],r&&(I[f]=r[a]),f=N[f],b.set($,f)):l[a]();for(f=A;f<h;f++)f in O?(i[f]=O[f],l[f]=j[f],r&&(r[f]=I[f],r[f](f))):i[f]=U(d);i=i.slice(0,o=h),s=c.slice(0)}return i});function d(h){if(l[f]=h,r){const[b,N]=Ae(f);return r[f]=N,t(c[f],b)}return t(c[f])}}}let de=!1;function Te(){de=!0}function et(e,t){if(de&&u.context){const n=u.context;Y(we());const s=m(()=>e(t||{}));return Y(n),s}return m(()=>e(t||{}))}function H(){return!0}const Le={get(e,t,n){return t===v?n:e.get(t)},has(e,t){return t===v?!0:e.has(t)},set:H,deleteProperty:H,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:H,deleteProperty:H}},ownKeys(e){return e.keys()}};function V(e){return(e=typeof e=="function"?e():e)?e:{}}function tt(...e){let t=!1;for(let s=0;s<e.length;s++){const i=e[s];t=t||!!i&&v in i,e[s]=typeof i=="function"?(t=!0,E(i)):i}if(t)return new Proxy({get(s){for(let i=e.length-1;i>=0;i--){const l=V(e[i])[s];if(l!==void 0)return l}},has(s){for(let i=e.length-1;i>=0;i--)if(s in V(e[i]))return!0;return!1},keys(){const s=[];for(let i=0;i<e.length;i++)s.push(...Object.keys(V(e[i])));return[...new Set(s)]}},Le);const n={};for(let s=e.length-1;s>=0;s--)if(e[s]){const i=Object.getOwnPropertyDescriptors(e[s]);for(const l in i)l in n||Object.defineProperty(n,l,{enumerable:!0,get(){for(let o=e.length-1;o>=0;o--){const r=(e[o]||{})[l];if(r!==void 0)return r}}})}return n}const he=e=>`Stale read from <${e}>.`;function nt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return E(ke(()=>e.each,e.children,t||void 0))}function st(e){const t=e.keyed,n=E(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return E(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?m(()=>i(t?s:()=>{if(!m(n))throw he("Show");return e.when})):i}return e.fallback},void 0,void 0)}function it(e){let t=!1;const n=(l,o)=>l[0]===o[0]&&(t?l[1]===o[1]:!l[1]==!o[1])&&l[2]===o[2],s=Se(()=>e.children),i=E(()=>{let l=s();Array.isArray(l)||(l=[l]);for(let o=0;o<l.length;o++){const r=l[o].when;if(r)return t=!!l[o].keyed,[o,r,l[o]]}return[-1]},void 0,{equals:n});return E(()=>{const[l,o,r]=i();if(l<0)return e.fallback;const c=r.children;return typeof c=="function"&&c.length>0?m(()=>c(t?o:()=>{if(m(i)[0]!==l)throw he("Match");return r.when})):c},void 0,void 0)}function lt(e){return e}const Pe=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Oe=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Pe]),Me=new Set(["innerHTML","textContent","innerText","children"]),je=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Ie=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function He(e,t){const n=Ie[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Ue=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),De={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Be(e,t,n){let s=n.length,i=t.length,l=s,o=0,r=0,c=t[i-1].nextSibling,a=null;for(;o<i||r<l;){if(t[o]===n[r]){o++,r++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===o){const f=l<s?r?n[r-1].nextSibling:n[l-r]:c;for(;r<l;)e.insertBefore(n[r++],f)}else if(l===r)for(;o<i;)(!a||!a.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[r]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[r++],t[o++].nextSibling),e.insertBefore(n[--l],f),t[i]=n[l]}else{if(!a){a=new Map;let d=r;for(;d<l;)a.set(n[d],d++)}const f=a.get(t[o]);if(f!=null)if(r<f&&f<l){let d=o,h=1,b;for(;++d<i&&d<l&&!((b=a.get(t[d]))==null||b!==f+h);)h++;if(h>f-r){const N=t[o];for(;r<f;)e.insertBefore(n[r++],N)}else e.replaceChild(n[r++],t[o++])}else o++;else t[o++].remove()}}}const z="_$DX_DELEGATE";function qe(e,t,n,s={}){let i;return U(l=>{i=l,t===document?e():ve(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function rt(e,t,n){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>(s||(s=i())).cloneNode(!0):()=>m(()=>document.importNode(s||(s=i()),!0));return l.cloneNode=l,l}function _e(e,t=window.document){const n=t[z]||(t[z]=new Set);for(let s=0,i=e.length;s<i;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,ye))}}function G(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Fe(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function Ke(e,t){t==null?e.removeAttribute("class"):e.className=t}function Re(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n)}function Ve(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let l,o;for(l=0,o=i.length;l<o;l++){const r=i[l];!r||r==="undefined"||t[r]||(ee(e,r,!1),delete n[r])}for(l=0,o=s.length;l<o;l++){const r=s[l],c=!!t[r];!r||r==="undefined"||n[r]===c||!c||(ee(e,r,!0),n[r]=c)}return n}function Ye(e,t,n){if(!t)return n?G(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(s.setProperty(l,i),n[l]=i);return n}function ot(e,t={},n,s){const i={};return s||T(()=>i.children=L(e,t.children,i.children)),T(()=>t.ref&&t.ref(e)),T(()=>Xe(e,t,n,!0,i,!0)),i}function ft(e,t,n){return m(()=>e(t,n))}function ve(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return L(e,t,s,n);T(i=>L(e,t(),i,n),s)}function Xe(e,t,n,s,i={},l=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=te(e,o,null,i[o],n,l)}for(const o in t){if(o==="children"){s||L(e,t.children);continue}const r=t[o];i[o]=te(e,o,r,i[o],n,l)}}function Ge(e,t,n={}){u.completed=globalThis._$HY.completed,u.events=globalThis._$HY.events,u.load=globalThis._$HY.load,u.gather=i=>se(t,i),u.registry=new Map,u.context={id:n.renderId||"",count:0},se(t,n.renderId);const s=qe(e,t,[...t.childNodes],n);return u.context=null,s}function ct(e){let t,n;if(!u.context||!(t=u.registry.get(n=Qe()))){if(u.context&&console.warn("Unable to find DOM nodes for hydration key:",n),!e)throw new Error("Unrecoverable Hydration Mismatch. No template for key: "+n);return e()}return u.completed&&u.completed.add(t),u.registry.delete(n),t}function ut(e){let t=e,n=0,s=[];if(u.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="#")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function at(){u.events&&!u.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=u;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;ye(s),t.shift()}}),u.events.queued=!0)}function We(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function ee(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,l=s.length;i<l;i++)e.classList.toggle(s[i],n)}function te(e,t,n,s,i,l){let o,r,c,a,f;if(t==="style")return Ye(e,n,s);if(t==="classList")return Ve(e,n,s);if(n===s)return s;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const d=t.slice(3);s&&e.removeEventListener(d,s),n&&e.addEventListener(d,n)}else if(t.slice(0,10)==="oncapture:"){const d=t.slice(10);s&&e.removeEventListener(d,s,!0),n&&e.addEventListener(d,n,!0)}else if(t.slice(0,2)==="on"){const d=t.slice(2).toLowerCase(),h=Ue.has(d);if(!h&&s){const b=Array.isArray(s)?s[0]:s;e.removeEventListener(d,b)}(h||n)&&(Re(e,d,n,h),h&&_e([d]))}else if(t.slice(0,5)==="attr:")G(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(c=Me.has(t))||!i&&((a=He(t,e.tagName))||(r=Oe.has(t)))||(o=e.nodeName.includes("-")))f&&(t=t.slice(5),r=!0),t==="class"||t==="className"?Ke(e,n):o&&!r&&!c?e[We(t)]=n:e[a||t]=n;else{const d=i&&t.indexOf(":")>-1&&De[t.split(":")[0]];d?Fe(e,d,t,n):G(e,je[t]||t,n)}return n}function ye(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),u.registry&&!u.done&&(u.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function L(e,t,n,s,i){if(u.context){!n&&(n=[...e.childNodes]);let r=[];for(let c=0;c<n.length;c++){const a=n[c];a.nodeType===8&&a.data.slice(0,2)==="!$"?a.remove():r.push(a)}n=r}for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(u.context)return n;if(l==="number"&&(t=t.toString()),o){let r=n[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),n=k(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(u.context)return n;n=k(e,n,s)}else{if(l==="function")return T(()=>{let r=t();for(;typeof r=="function";)r=r();n=L(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[],c=n&&Array.isArray(n);if(W(r,t,n,i))return T(()=>n=L(e,r,n,s,!0)),()=>n;if(u.context){if(!r.length)return n;for(let a=0;a<r.length;a++)if(r[a].parentNode)return n=r}if(r.length===0){if(n=k(e,n,s),o)return n}else c?n.length===0?ne(e,r,s):Be(e,n,r):(n&&k(e),ne(e,r));n=r}else if(t.nodeType){if(u.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=k(e,n,s,t);k(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function W(e,t,n,s){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],c=n&&n[l],a;if(!(r==null||r===!0||r===!1))if((a=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=W(e,r,c)||i;else if(a==="function")if(s){for(;typeof r=="function";)r=r();i=W(e,Array.isArray(r)?r:[r],Array.isArray(c)?c:[c])||i}else e.push(r),i=!0;else{const f=String(r);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return i}function ne(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function k(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const c=r.parentNode===e;!l&&!o?c?e.replaceChild(i,r):e.insertBefore(i,n):c&&r.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}function se(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],l=i.getAttribute("data-hk");(!t||l.startsWith(t))&&!u.registry.has(l)&&u.registry.set(l,i)}}function Qe(){const e=u.context;return`${e.id}${e.count++}`}const dt=(...e)=>(Te(),Ge(...e));export{v as $,dt as A,u as B,nt as F,lt as M,it as S,et as a,T as b,Ae as c,_e as d,U as e,xe as f,ct as g,pe as h,ve as i,ut as j,Ye as k,Ke as l,tt as m,ot as n,Ze as o,ft as p,E as q,at as r,G as s,rt as t,m as u,st as v,me as w,ze as x,Je as y,qe as z};