import{$ as c,w as P,x as j,y as T,c as R}from"./web.b41593b9.js";const b=Symbol("store-raw"),g=Symbol("store-node");function _(e){let n=e[c];if(!n&&(Object.defineProperty(e,c,{value:n=new Proxy(e,M)}),!Array.isArray(e))){const t=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let o=0,f=t.length;o<f;o++){const i=t[o];r[i].get&&Object.defineProperty(e,i,{enumerable:r[i].enumerable,get:r[i].get.bind(n)})}}return n}function u(e){let n;return e!=null&&typeof e=="object"&&(e[c]||!(n=Object.getPrototypeOf(e))||n===Object.prototype||Array.isArray(e))}function a(e,n=new Set){let t,r,o,f;if(t=e!=null&&e[b])return t;if(!u(e)||n.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):n.add(e);for(let i=0,s=e.length;i<s;i++)o=e[i],(r=a(o,n))!==o&&(e[i]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):n.add(e);const i=Object.keys(e),s=Object.getOwnPropertyDescriptors(e);for(let l=0,O=i.length;l<O;l++)f=i[l],!s[f].get&&(o=e[f],(r=a(o,n))!==o&&(e[f]=r))}return e}function A(e){let n=e[g];return n||Object.defineProperty(e,g,{value:n=Object.create(null)}),n}function h(e,n,t){return e[n]||(e[n]=D(t))}function F(e,n){const t=Reflect.getOwnPropertyDescriptor(e,n);return!t||t.get||!t.configurable||n===c||n===g||(delete t.value,delete t.writable,t.get=()=>e[c][n]),t}function $(e){if(j()){const n=A(e);(n._||(n._=D()))()}}function K(e){return $(e),Reflect.ownKeys(e)}function D(e){const[n,t]=R(e,{equals:!1,internal:!0});return n.$=t,n}const M={get(e,n,t){if(n===b)return e;if(n===c)return t;if(n===P)return $(e),t;const r=A(e),o=r[n];let f=o?o():e[n];if(n===g||n==="__proto__")return f;if(!o){const i=Object.getOwnPropertyDescriptor(e,n);j()&&(typeof f!="function"||e.hasOwnProperty(n))&&!(i&&i.get)&&(f=h(r,n,f)())}return u(f)?_(f):f},has(e,n){return n===b||n===c||n===P||n===g||n==="__proto__"?!0:(this.get(e,n,e),n in e)},set(){return!0},deleteProperty(){return!0},ownKeys:K,getOwnPropertyDescriptor:F};function d(e,n,t,r=!1){if(!r&&e[n]===t)return;const o=e[n],f=e.length;t===void 0?delete e[n]:e[n]=t;let i=A(e),s;if((s=h(i,n,o))&&s.$(()=>t),Array.isArray(e)&&e.length!==f){for(let l=e.length;l<f;l++)(s=i[l])&&s.$();(s=h(i,"length",f))&&s.$(e.length)}(s=i._)&&s.$()}function S(e,n){const t=Object.keys(n);for(let r=0;r<t.length;r+=1){const o=t[r];d(e,o,n[o])}}function E(e,n){if(typeof n=="function"&&(n=n(e)),n=a(n),Array.isArray(n)){if(e===n)return;let t=0,r=n.length;for(;t<r;t++){const o=n[t];e[t]!==o&&d(e,t,o)}d(e,"length",r)}else S(e,n)}function y(e,n,t=[]){let r,o=e;if(n.length>1){r=n.shift();const i=typeof r,s=Array.isArray(e);if(Array.isArray(r)){for(let l=0;l<r.length;l++)y(e,[r[l]].concat(n),t);return}else if(s&&i==="function"){for(let l=0;l<e.length;l++)r(e[l],l)&&y(e,[l].concat(n),t);return}else if(s&&i==="object"){const{from:l=0,to:O=e.length-1,by:N=1}=r;for(let w=l;w<=O;w+=N)y(e,[w].concat(n),t);return}else if(n.length>1){y(e[r],n,[r].concat(t));return}o=e[r],t=[r].concat(t)}let f=n[0];typeof f=="function"&&(f=f(o,t),f===o)||r===void 0&&f==null||(f=a(f),r===void 0||u(o)&&u(f)&&!Array.isArray(f)?S(o,f):d(e,r,f))}function z(...[e,n]){const t=a(e||{}),r=Array.isArray(t),o=_(t);function f(...i){T(()=>{r&&i.length===1?E(t,i[0]):y(t,i)})}return[o,f]}const p=new WeakMap,k={get(e,n){if(n===b)return e;const t=e[n];let r;return u(t)?p.get(t)||(p.set(t,r=new Proxy(t,k)),r):t},set(e,n,t){return d(e,n,a(t)),!0},deleteProperty(e,n){return d(e,n,void 0,!0),!0}};function C(e){return n=>{if(u(n)){let t;(t=p.get(n))||p.set(n,t=new Proxy(n,k)),e(t)}return n}}var q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function G(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function L(e){if(e.__esModule)return e;var n=e.default;if(typeof n=="function"){var t=function r(){if(this instanceof r){var o=[null];o.push.apply(o,arguments);var f=Function.bind.apply(n,o);return new f}return n.apply(this,arguments)};t.prototype=n.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),t}export{G as a,z as b,q as c,L as g,C as p};