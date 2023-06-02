import{g as z,i as r,b as f,t as p,s as h,c,q as m,j as g,a as n,v as X}from"./web.b41593b9.js";const Z=p(`<div><div class="mb-1 text-sm font-semibold sec--text"></div><input type="text" readonly class="text-gray-500
      cursor-not-allowed
      appearance-none
      border
      rounded
      w-full
      py-2
      px-3
      leading-tight
      focus:outline-none focus:shadow-outline
    "></div>`,5);function _(e){return(()=>{const s=z(Z),i=s.firstChild,a=i.nextSibling;return r(i,()=>e.title),f(()=>a.value=e.value),s})()}const ee=p(`<div><div class="mb-2 text-sm font-semibold sec--text"></div><input type="number" class="
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
    "></div>`,5);function v(e){return(()=>{const s=z(ee),i=s.firstChild,a=i.nextSibling;return r(i,()=>e.title),a.addEventListener("change",t=>e.onChange(Number(t.currentTarget.value)||0)),f(t=>{const x=e.step||1,d=e.min,$=e.max;return x!==t._v$&&h(a,"step",t._v$=x),d!==t._v$2&&h(a,"min",t._v$2=d),$!==t._v$3&&h(a,"max",t._v$3=$),t},{_v$:void 0,_v$2:void 0,_v$3:void 0}),f(()=>a.value=e.value),s})()}const te=p('<div class="flex flex-col gap-4"><!#><!/><hr class="border-0 bg-gray-300 text-gray-500 h-px"><!#><!/><!#><!/><!#><!/><!#><!/><label><input class="mr-2" id="advanced-settings-checkbox" type="checkbox">Erweitert</label><!#><!/></div>',18);function S(e){return e/100}function u(e){return e.toFixed(2)}function ae(){const[e,s]=c(1),[i,a]=c(140),[t,x]=c(S(65)),[d,$]=c(S(1)),[y,A]=c(S(2.5)),[C,T]=c(!1),b=m(()=>e()*i()),F=m(()=>b()*t()),H=m(()=>b()*y()),L=m(()=>b()*d());return(()=>{const l=z(te),W=l.firstChild,[w,j]=g(W.nextSibling),q=w.nextSibling,D=q.nextSibling,[N,I]=g(D.nextSibling),Y=N.nextSibling,[R,B]=g(Y.nextSibling),G=R.nextSibling,[k,J]=g(G.nextSibling),K=k.nextSibling,[P,O]=g(K.nextSibling),E=P.nextSibling,M=E.firstChild,Q=E.nextSibling,[U,V]=g(Q.nextSibling);return r(l,n(v,{min:1,max:1e3,title:"Pizzen (ganz)",get value(){return e()},onChange:s}),w,j),r(l,n(_,{title:"Mehl (g)",get value(){return u(b())}}),N,I),r(l,n(_,{title:"Wasser (ml)",get value(){return u(F())}}),R,B),r(l,n(_,{title:"Trockenhefe (g)",get value(){return u(L())}}),k,J),r(l,n(_,{title:"Salz (g)",get value(){return u(H())}}),P,O),M.addEventListener("change",o=>T(o.currentTarget.checked)),r(l,n(X,{get when(){return C()},get children(){return[n(v,{min:100,max:200,title:"Mehl pro Pizza",get value(){return i()},onChange:a}),n(v,{min:50,max:80,title:"Hydration (%)",get value(){return t()*100},onChange:o=>x(Number(u(o/100))),step:.5}),n(v,{min:0,max:2,title:"Hefeanteil (%)",get value(){return d()*100},onChange:o=>$(Number(u(o/100))),step:.1}),n(v,{min:0,max:5,title:"Salzanteil (%)",get value(){return y()*100},onChange:o=>A(Number(u(o/100))),step:.1})]}}),U,V),f(()=>M.checked=C()),l})()}export{ae as default};
