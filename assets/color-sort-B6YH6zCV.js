import{t as Q,g as Z,s as ee}from"./boot-JXMA9PpY.js";const P=6,te=[[2,0,1,2,1,2],[0,0,0,1,1,2],[],[]],T={0:{color:"#FF6B4A",shape:"circle",name:"красный круг"},1:{color:"#4CE0B3",shape:"square",name:"зелёный квадрат"},2:{color:"#B18BFF",shape:"triangle",name:"фиолетовый треугольник"}},se="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0",O="cubic-bezier(0.16, 1, 0.3, 1)",ne=300,oe=35,ae=70,q=2400,F=16,re=1200,ie=`
.cs-widget { position: relative; margin-top: 1.5rem; }
.cs-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.cs-toolbar button {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;
  background: none; border: 1px solid var(--c-text-dim); color: var(--c-text);
  min-width: 44px; min-height: 44px; padding: 0.5em 1em; cursor: pointer;
}
.cs-toolbar button[aria-pressed='true'] { border-color: var(--c-color-sort, #4CE0B3); color: var(--c-color-sort, #4CE0B3); }
.cs-moves { font-family: var(--font-mono); font-size: 13px; color: var(--c-text-dim); margin-left: auto; }
.cs-flasks-area { position: relative; transition: filter 200ms ease; }
.cs-flasks-area.is-deuteranopia { filter: url(#cs-deuteranopia); }
.cs-flasks { display: flex; gap: 1.25rem; flex-wrap: wrap; }
.cs-flask {
  display: flex; flex-direction: column-reverse; align-items: center; justify-content: flex-start;
  gap: 4px; width: 64px; min-height: 220px; min-width: 44px;
  padding: 8px 6px; border: 2px solid #2a3a48; border-radius: 6px 6px 14px 14px;
  background: var(--c-smoke); cursor: pointer;
}
.cs-flask:focus-visible { outline: 2px solid var(--c-color-sort, #4CE0B3); outline-offset: 3px; }
.cs-flask[data-selected='true'] { border-color: var(--c-color-sort, #4CE0B3); }
.cs-item { width: 40px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cs-item-shape { width: 26px; height: 26px; }
.cs-item-shape.shape-circle { border-radius: 50%; }
.cs-item-shape.shape-square { border-radius: 4px; }
.cs-item-shape.shape-triangle {
  width: 0; height: 0; background: none !important;
  border-left: 14px solid transparent; border-right: 14px solid transparent; border-bottom: 24px solid;
}
.cs-hint { margin-top: 0.75rem; min-height: 1.3em; font-size: 13px; color: var(--c-text-dim); }
.cs-widget[data-won='true'] .cs-flasks-area { animation: cs-win-flash 700ms ease; }
@keyframes cs-win-flash {
  0% { filter: brightness(1); }
  30% { filter: brightness(1.6); }
  100% { filter: brightness(1); }
}
.cs-flying-item { position: fixed; z-index: 50; pointer-events: none; will-change: left, top; }
.cs-spiral-layer { position: absolute; inset: 0; pointer-events: none; overflow: visible; z-index: 5; }
.cs-spiral-mote {
  position: absolute; width: 6px; height: 6px; border-radius: 50%;
  background: var(--c-color-sort, #4CE0B3); opacity: 0; will-change: left, top, opacity;
}
`;function le(n){const l=T[n],t=document.createElement("span");t.className="cs-item";const c=document.createElement("span");return c.className=`cs-item-shape shape-${l.shape}`,l.shape==="triangle"?c.style.borderBottomColor=l.color:c.style.background=l.color,t.appendChild(c),t}function z(){return te.map(n=>n.slice())}function ce(n){return n.every(l=>l.length===0||l.every(t=>t===l[0]))}function U(n){if(n.length===0)return 0;const l=n[n.length-1];let t=0;for(let c=n.length-1;c>=0&&n[c]===l;c--)t++;return t}function $(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function pe(n){n.classList.add("cs-branded");const l=document.createElement("style");l.textContent=ie,n.appendChild(l);const t=document.createElement("div");t.className="cs-widget",t.innerHTML=`
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="cs-deuteranopia" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="${se}"></feColorMatrix>
      </filter>
    </svg>
    <div class="cs-toolbar">
      <button type="button" data-reset>Сбросить</button>
      <button type="button" data-cvd-toggle aria-pressed="false">Симуляция дальтонизма</button>
      <span class="cs-moves" data-moves aria-live="polite">Ходов: 0</span>
    </div>
    <div class="cs-flasks-area" data-flasks-area>
      <div class="cs-flasks" data-flasks role="group" aria-label="Колбы для сортировки по цвету и форме"></div>
    </div>
    <p class="cs-hint" data-hint aria-live="polite">Выберите колбу — заберёт верхние одинаковые фигуры. Выберите другую — положит, если цвет и форма совпадают.</p>
  `,n.appendChild(t);const c=t.querySelector("[data-flasks]"),y=t.querySelector("[data-flasks-area]"),_=t.querySelector("[data-moves]"),C=t.querySelector("[data-hint]"),W=t.querySelector("[data-reset]"),m=t.querySelector("[data-cvd-toggle]");let f=z(),h=null,S=0,R=!1,A=!1;const w=new Set;let k=null,M=!1;function D(){Z()||(ee(),!$()&&(M=m.getAttribute("aria-pressed")==="true",m.disabled=!0,m.setAttribute("aria-pressed","true"),y.classList.add("is-deuteranopia"),k=setTimeout(()=>{k=null,m.setAttribute("aria-pressed",String(M)),y.classList.toggle("is-deuteranopia",M),m.disabled=!1},re)))}function B(){k!==null&&(clearTimeout(k),k=null,m.setAttribute("aria-pressed",String(M)),y.classList.toggle("is-deuteranopia",M),m.disabled=!1)}function v(){c.replaceChildren(),f.forEach((e,r)=>{const s=document.createElement("button");s.type="button",s.className="cs-flask",s.dataset.selected=String(h===r),s.disabled=A,s.setAttribute("aria-label",`Колба ${r+1}: ${e.length?e.map(i=>T[i].name).join(", "):"пусто"}`);for(const i of e)s.appendChild(le(i));s.addEventListener("click",()=>j(r)),c.appendChild(s)})}function G(e,r){const s=$(),i=[];return r.forEach((d,g)=>{const o=e[g];if(!o)return;if(d.style.visibility="hidden",s){d.style.visibility="";return}const x=d.getBoundingClientRect(),a=d.cloneNode(!0);a.className="cs-flying-item",a.style.left=`${o.left}px`,a.style.top=`${o.top}px`,a.style.width=`${o.width}px`,a.style.height=`${o.height}px`,document.body.appendChild(a),w.add(a);const E=(o.left+x.left)/2,b=Math.min(o.top,x.top)-ae,p=a.animate([{left:`${o.left}px`,top:`${o.top}px`},{left:`${E}px`,top:`${b}px`},{left:`${x.left}px`,top:`${x.top}px`}],{duration:ne,delay:g*oe,easing:O,fill:"forwards"}).finished.catch(()=>{}).then(()=>{a.remove(),w.delete(a),d.style.visibility=""});i.push(p)}),Promise.all(i).then(()=>{})}function V(){if($())return;const e=y.getBoundingClientRect(),r=e.width/2,s=e.height/2,i=Math.min(e.width,e.height)/2,d=document.createElement("div");d.className="cs-spiral-layer",y.appendChild(d);for(let g=0;g<F;g++){const o=document.createElement("span");o.className="cs-spiral-mote",d.appendChild(o);const x=g/F*Math.PI*2,a=2.2,E=i*(.7+.3*Math.sin(g*1.7)),b=14,I=[];for(let p=0;p<=b;p++){const u=p/b,L=x+u*a*Math.PI*2,N=u<.6?E*(1-u/.6):E*1.2*((u-.6)/.4),H=r+Math.cos(L)*N,J=s+Math.sin(L)*N*.65,K=u<.1?u/.1:u>.7?Math.max(0,1-(u-.7)/.3):1;I.push({left:`${H}px`,top:`${J}px`,opacity:String(K)})}o.animate(I,{duration:q,delay:g%5*60,easing:O,fill:"forwards"})}setTimeout(()=>d.remove(),q+400)}function j(e){if(R||A)return;if(h===null){if(f[e].length===0)return;h=e;const p=U(f[e]),u=T[f[e][f[e].length-1]].name;C.textContent=p>1?`Взято: ${p}× ${u}. Выберите колбу назначения.`:`Взято: ${u}. Выберите колбу назначения.`,v();return}if(h===e){h=null,C.textContent="Отменено.",v();return}const r=h,s=f[r],i=f[e],d=s[s.length-1];if(!(d!==void 0&&i.length<P&&(i.length===0||i[i.length-1]===d))){C.textContent="Нельзя: не совпадают цвет и форма.",h=null,v();return}const o=c.children[r],x=P-i.length,a=Math.min(U(s),x),E=Array.from(o.children).slice(o.children.length-a).map(p=>p.getBoundingClientRect());for(let p=0;p<a;p++)i.push(s.pop());S+=1,Q("mechanism_interact",{slug:"color-sort",kind:"move"}),_.textContent=`Ходов: ${S}`,h=null,A=!0,v();const b=c.children[e],I=Array.from(b.children).slice(b.children.length-a);G(E,I).then(()=>{A=!1,v(),ce(f)?(R=!0,t.dataset.won="true",C.textContent=`Решено за ${S} ${Y(S)}.`,V(),D()):C.textContent="Положено."})}function Y(e){const r=e%10,s=e%100;return r===1&&s!==11?"ход":[2,3,4].includes(r)&&![12,13,14].includes(s)?"хода":"ходов"}function X(){B();for(const e of w)e.remove();w.clear(),f=z(),h=null,S=0,R=!1,A=!1,delete t.dataset.won,_.textContent="Ходов: 0",C.textContent="Сброшено. Выберите колбу — заберёт верхние одинаковые фигуры.",v()}return W.addEventListener("click",X),m.addEventListener("click",()=>{const e=m.getAttribute("aria-pressed")==="true";m.setAttribute("aria-pressed",String(!e)),y.classList.toggle("is-deuteranopia",!e)}),v(),n.dataset.mechanismStatus="ready",function(){B();for(const r of w)r.remove();w.clear(),delete n.dataset.mechanismStatus,n.classList.remove("cs-branded"),n.replaceChildren()}}export{pe as default};
