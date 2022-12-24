import{e as p,i as r,j as f,t as y,q as h,c,n as b,f as g,h as n,w as X}from"./chunks/web.f43fe582.js";const Z=y(`<div><div class="mb-1 text-sm font-semibold sec--text"></div><input type="text" readonly class="text-gray-500
      cursor-not-allowed
      appearance-none
      border
      rounded
      w-full
      py-2
      px-3
      leading-tight
      focus:outline-none focus:shadow-outline
    "></div>`);function _(e){return(()=>{const o=p(Z),i=o.firstChild,a=i.nextSibling;return r(i,()=>e.title),f(()=>a.value=e.value),o})()}const ee=y(`<div><div class="mb-2 text-sm font-semibold sec--text"></div><input type="number" class="
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
    "></div>`);function v(e){return(()=>{const o=p(ee),i=o.firstChild,a=i.nextSibling;return r(i,()=>e.title),a.addEventListener("change",t=>e.onChange(Number(t.currentTarget.value)||0)),f(t=>{const x=e.step||1,d=e.min,$=e.max;return x!==t._v$&&h(a,"step",t._v$=x),d!==t._v$2&&h(a,"min",t._v$2=d),$!==t._v$3&&h(a,"max",t._v$3=$),t},{_v$:void 0,_v$2:void 0,_v$3:void 0}),f(()=>a.value=e.value),o})()}const te=y('<div class="flex flex-col gap-4"><!#><!/><hr class="border-0 bg-gray-300 text-gray-500 h-px"><!#><!/><!#><!/><!#><!/><!#><!/><label><input class="mr-2" id="advanced-settings-checkbox" type="checkbox">Erweitert</label><!#><!/></div>');function S(e){return e/100}function u(e){return e.toFixed(2)}function ae(){const[e,o]=c(1),[i,a]=c(140),[t,x]=c(S(65)),[d,$]=c(S(.5)),[z,T]=c(S(2.5)),[C,A]=c(!1),m=b(()=>e()*i()),F=b(()=>m()*t()),H=b(()=>m()*z()),L=b(()=>m()*d());return(()=>{const l=p(te),W=l.firstChild,[w,j]=g(W.nextSibling),q=w.nextSibling,D=q.nextSibling,[N,I]=g(D.nextSibling),Y=N.nextSibling,[R,B]=g(Y.nextSibling),G=R.nextSibling,[k,J]=g(G.nextSibling),K=k.nextSibling,[P,O]=g(K.nextSibling),E=P.nextSibling,M=E.firstChild,Q=E.nextSibling,[U,V]=g(Q.nextSibling);return r(l,n(v,{min:1,max:1e3,title:"Pizzen (ganz)",get value(){return e()},onChange:o}),w,j),r(l,n(_,{title:"Mehl (g)",get value(){return u(m())}}),N,I),r(l,n(_,{title:"Wasser (ml)",get value(){return u(F())}}),R,B),r(l,n(_,{title:"Trockenhefe (g)",get value(){return u(L())}}),k,J),r(l,n(_,{title:"Trockenhefe (g)",get value(){return u(H())}}),P,O),M.addEventListener("change",s=>A(s.currentTarget.checked)),r(l,n(X,{get when(){return C()},get children(){return[n(v,{min:100,max:200,title:"Mehl pro Pizza",get value(){return i()},onChange:a}),n(v,{min:50,max:80,title:"Hydration (%)",get value(){return t()*100},onChange:s=>x(Number(u(s/100))),step:.5}),n(v,{min:0,max:2,title:"Hefeanteil (%)",get value(){return d()*100},onChange:s=>$(Number(u(s/100))),step:.1}),n(v,{min:0,max:5,title:"Salzanteil (%)",get value(){return z()*100},onChange:s=>T(Number(u(s/100))),step:.1})]}}),U,V),f(()=>M.checked=C()),l})()}export{ae as default};
