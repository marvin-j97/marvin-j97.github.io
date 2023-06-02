import{g as z,i as r,b as h,t as p,s as S,c,q as _,j as g,a as n,v as X}from"./web.b41593b9.js";const Z=p(`<div><div class="mb-1 text-sm font-semibold sec--text"></div><input type="text" readonly class="text-gray-500
      cursor-not-allowed
      appearance-none
      border
      rounded
      w-full
      py-2
      px-3
      leading-tight
      focus:outline-none focus:shadow-outline
    "></div>`,5);function f(e){return(()=>{const s=z(Z),i=s.firstChild,a=i.nextSibling;return r(i,()=>e.title),h(()=>a.value=e.value),s})()}const ee=p(`<div><div class="mb-2 text-sm font-semibold sec--text"></div><input type="number" class="
      shadow
      appearance-none
      border
      focus:border-blue-500
      rounded
      w-full
      py-2
      px-3
      text-gray-700
      leading-tight
      focus:outline-none focus:shadow-outline
    "></div>`,5);function v(e){return(()=>{const s=z(ee),i=s.firstChild,a=i.nextSibling;return r(i,()=>e.title),a.addEventListener("change",t=>e.onChange(Number(t.currentTarget.value)||0)),h(t=>{const $=e.step||1,d=e.min,b=e.max;return $!==t._v$&&S(a,"step",t._v$=$),d!==t._v$2&&S(a,"min",t._v$2=d),b!==t._v$3&&S(a,"max",t._v$3=b),t},{_v$:void 0,_v$2:void 0,_v$3:void 0}),h(()=>a.value=e.value),s})()}const te=p('<div class="flex flex-col gap-4"><!#><!/><hr class="border-0 bg-gray-300 text-gray-500 h-px"><!#><!/><!#><!/><!#><!/><!#><!/><label><input class="mr-2" id="advanced-settings-checkbox" type="checkbox">Erweitert</label><!#><!/></div>',18);function x(e){return e/100}function u(e){return e.toFixed(1)}function ae(){const[e,s]=c(1),[i,a]=c(140),[t,$]=c(x(65)),[d,b]=c(x(1)),[y,A]=c(x(2.5)),[C,T]=c(!1),m=_(()=>e()*i()),F=_(()=>m()*t()),H=_(()=>m()*y()),L=_(()=>m()*d());return(()=>{const l=z(te),W=l.firstChild,[w,j]=g(W.nextSibling),q=w.nextSibling,D=q.nextSibling,[N,I]=g(D.nextSibling),Y=N.nextSibling,[R,B]=g(Y.nextSibling),G=R.nextSibling,[k,J]=g(G.nextSibling),K=k.nextSibling,[P,O]=g(K.nextSibling),E=P.nextSibling,M=E.firstChild,Q=E.nextSibling,[U,V]=g(Q.nextSibling);return r(l,n(v,{min:1,max:1e3,title:"Pizzen (ganz)",get value(){return e()},onChange:s}),w,j),r(l,n(f,{title:"Mehl (g)",get value(){return u(m())}}),N,I),r(l,n(f,{title:"Wasser (ml)",get value(){return u(F())}}),R,B),r(l,n(f,{title:"Trockenhefe (g)",get value(){return u(L())}}),k,J),r(l,n(f,{title:"Salz (g)",get value(){return u(H())}}),P,O),M.addEventListener("change",o=>T(o.currentTarget.checked)),r(l,n(X,{get when(){return C()},get children(){return[n(v,{min:100,max:200,title:"Mehl pro Pizza",get value(){return i()},onChange:a}),n(v,{min:60,max:80,title:"Hydration (%)",get value(){return t()*100},onChange:o=>$(Number(u(o/100))),step:.5}),n(v,{min:0,max:2,title:"Hefeanteil (%)",get value(){return d()*100},onChange:o=>b(x(Number(u(o)))),step:.1}),n(v,{min:0,max:3,title:"Salzanteil (%)",get value(){return y()*100},onChange:o=>A(x(Number(u(o)))),step:.1})]}}),U,V),h(()=>M.checked=C()),l})()}export{ae as default};
