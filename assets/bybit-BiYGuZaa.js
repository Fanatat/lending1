import{t as U}from"./boot-JXMA9PpY.js";const X="/content/demo/bybit.json",T="#FF4D3D",z=7,g=640,x=180,s=10;function Q(t){const e=Math.min(1,Math.max(0,t));return e*e}function W(t,e){const i=[];for(let n=1;n<=z;n++){const o=n/z;i.push(t*(1-e/100*Q(o)))}return i}function Z(t){let e=t[0]??0,i=0;for(const n of t)e=Math.max(e,n),e>0&&(i=Math.max(i,(e-n)/e*100));return Math.round(i*10)/10}function G(t,e,i,n,o){const c=t.length,r=Math.max(1e-6,i-e);return t.map((u,m)=>{const a=s+m/Math.max(1,c-1)*(n-s*2),d=s+(1-(u-e)/r)*(o-s*2);return`${m===0?"M":"L"} ${a.toFixed(2)} ${d.toFixed(2)}`}).join(" ")}function J(t,e,i,n,o){const c=t.length,r=Math.max(1e-6,i-e),u=b=>s+b/Math.max(1,c-1)*(n-s*2),m=b=>s+(1-(b-e)/r)*(o-s*2);let a=t[0]??0;const d=[];for(const b of t)a=Math.max(a,b),d.push(a);const k=d.map((b,y)=>`${y===0?"M":"L"} ${u(y).toFixed(2)} ${m(b).toFixed(2)}`).join(" "),S=t.map((b,y)=>`L ${u(c-1-y).toFixed(2)} ${m(t[c-1-y]??b).toFixed(2)}`).join(" ");return`${k} ${S} Z`}const K=`
.bybit-widget { position: relative; display: grid; grid-template-columns: 1fr; gap: 2rem; margin-top: 1.5rem; }
@media (min-width: 760px) { .bybit-widget { grid-template-columns: 1.4fr 1fr; } }
.bybit-flood {
  position: absolute; inset: -1rem; background: ${T}; opacity: 0;
  pointer-events: none; transition: opacity 400ms ease; border-radius: 4px; z-index: 0;
}
.bybit-widget[data-halted='true'] .bybit-flood { opacity: 0.92; transition: opacity 600ms ease; }
.bybit-widget[data-halted='true'][data-just-halted='true'] .bybit-flood { transition: opacity 400ms ease; }
.bybit-col { position: relative; z-index: 1; }
.bybit-demo-badge {
  display: inline-block; font-size: 11px; letter-spacing: 0.08em; padding: 0.25em 0.6em;
  border: 1px solid var(--c-text-dim); color: var(--c-text-dim); margin-bottom: 0.75rem;
}
.bybit-chart-wrap { filter: none; transition: filter 400ms ease; }
.bybit-widget[data-halted='true'] .bybit-chart-wrap { filter: grayscale(1) contrast(0.7) brightness(0.8); }
.bybit-chart { width: 100%; height: auto; display: block; }
.bybit-line { fill: none; stroke: var(--c-bybit, #F2C14E); stroke-width: 2; }
.bybit-line.is-stress { stroke-dasharray: 4 4; opacity: 0.85; }
.bybit-area { fill: var(--c-bybit, #F2C14E); opacity: 0.18; }
.bybit-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 1.5rem; margin-top: 1rem; }
.bybit-metric-label { display: block; font-family: var(--font-mono); font-size: 11px; color: var(--c-text-dim); text-transform: uppercase; letter-spacing: 0.06em; }
.bybit-metric-value { display: block; font-family: var(--font-mono); font-size: 20px; color: var(--c-text); }
.bybit-slider-row { margin-top: 1.25rem; }
.bybit-slider-row label { display: block; font-size: 14px; margin-bottom: 0.5rem; }
.bybit-slider-row input[type='range'] { width: 100%; height: 44px; touch-action: manipulation; }
.bybit-note { margin-top: 0.75rem; font-size: 12px; }
.bybit-toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.bybit-toggle-label { font-size: 15px; max-width: 16rem; }
.bybit-toggle {
  position: relative; width: 56px; height: 32px; min-width: 44px; min-height: 32px;
  border-radius: 999px; border: 1px solid var(--c-text-dim); background: var(--c-smoke);
  cursor: pointer; flex-shrink: 0; padding: 0;
}
.bybit-toggle-knob {
  position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 50%;
  background: var(--c-text); transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.bybit-toggle[aria-checked='true'] { border-color: ${T}; background: #3a1410; }
.bybit-toggle[aria-checked='true'] .bybit-toggle-knob { transform: translateX(24px); background: ${T}; }
.bybit-status { margin-top: 1rem; font-size: 15px; }
.bybit-widget[data-halted='true'] .bybit-status { color: var(--c-void); font-weight: 600; }
.bybit-log {
  margin-top: 1rem; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em;
  color: var(--c-phosphor); white-space: pre-wrap; min-height: 1.4em;
}
.bybit-widget[data-halted='true'] .bybit-log { color: var(--c-void); }
`;function tt(t){const e=document.createElement("style");e.textContent=K,t.appendChild(e)}function w(t){return`${t.toFixed(1)}%`}function at(t){let e=!1,i=!1,n=10,o=[],c=null;t.classList.add("bybit-branded"),tt(t);const r=document.createElement("div");r.className="bybit-widget",r.dataset.halted="false",t.appendChild(r);const u=document.createElement("div");u.className="bybit-flood",r.appendChild(u);const m=document.createElement("p");m.className="text-dim bybit-note bybit-simulation-note",m.textContent="Демонстрация на синтетических данных. Реальные ключи и счета на сайте не используются.",t.appendChild(m);const a=document.createElement("div");a.className="bybit-col",a.innerHTML=`
    <span class="bybit-demo-badge mono">ДЕМО-ДАННЫЕ</span>
    <div class="bybit-chart-wrap">
      <svg class="bybit-chart" viewBox="0 0 ${g} ${x}" role="img" aria-label="Нормированная кривая портфеля, старт равен 100">
        <path class="bybit-area" data-area d=""></path>
        <path class="bybit-line" data-line-base d=""></path>
        <path class="bybit-line is-stress" data-line-stress d=""></path>
      </svg>
    </div>
    <div class="bybit-metrics">
      <div><span class="bybit-metric-label">Просадка (история)</span><span class="bybit-metric-value" data-metric="dd-hist">—</span></div>
      <div><span class="bybit-metric-label">Просадка при стресс-тесте</span><span class="bybit-metric-value" data-metric="dd-stress">—</span></div>
      <div><span class="bybit-metric-label">Концентрация</span><span class="bybit-metric-value" data-metric="conc">—</span></div>
      <div><span class="bybit-metric-label">Доля стейкинга</span><span class="bybit-metric-value" data-metric="staking">—</span></div>
    </div>
    <div class="bybit-slider-row">
      <label for="bybit-stress">Стресс-тест: обвал рынка на <span data-stress-value>−10%</span> за неделю</label>
      <input type="range" id="bybit-stress" min="10" max="50" step="5" value="10" data-stress-slider aria-describedby="bybit-stress-note">
      <p id="bybit-stress-note" class="text-dim bybit-note">Только последствия. Система не даёт торговых рекомендаций.</p>
    </div>
  `,r.appendChild(a);const d=document.createElement("div");d.className="bybit-col",d.innerHTML=`
    <div class="bybit-toggle-row">
      <label class="bybit-toggle-label" id="bybit-killswitch-label" for="bybit-killswitch">СИМУЛЯЦИЯ: у ключа появились торговые права</label>
      <button type="button" role="switch" aria-checked="false" id="bybit-killswitch" class="bybit-toggle" aria-labelledby="bybit-killswitch-label">
        <span class="bybit-toggle-knob" aria-hidden="true"></span>
      </button>
    </div>
    <p class="bybit-status" data-status aria-live="polite">Сбор данных активен.</p>
    <pre class="bybit-log mono" data-log aria-live="polite"></pre>
  `,r.appendChild(d);const k=a.querySelector("[data-area]"),S=a.querySelector("[data-line-base]"),b=a.querySelector("[data-line-stress]"),y=a.querySelector("[data-stress-value]"),C=a.querySelector("[data-stress-slider]"),H=a.querySelector('[data-metric="dd-hist"]'),R=a.querySelector('[data-metric="dd-stress"]'),N=a.querySelector('[data-metric="conc"]'),O=a.querySelector('[data-metric="staking"]'),$=d.querySelector("#bybit-killswitch"),L=d.querySelector("[data-status]"),f=d.querySelector("[data-log]");function A(){if(!o.length)return;const l=W(o[o.length-1]??100,n),p=o.concat(l),F=p,h=Math.min(...F)*.98,v=Math.max(...F)*1.02;k.setAttribute("d",J(o,h,v,g,x)),S.setAttribute("d",G(o,h,v,g,x));const D=p.length,M=o.length,_=l.map((B,P)=>{const I=M-1+(P+1),q=s+I/Math.max(1,D-1)*(g-s*2),j=s+(1-(B-h)/Math.max(1e-6,v-h))*(x-s*2);if(P===0){const V=s+(M-1)/Math.max(1,D-1)*(g-s*2),Y=s+(1-((o[M-1]??100)-h)/Math.max(1e-6,v-h))*(x-s*2);return`M ${V.toFixed(2)} ${Y.toFixed(2)} L ${q.toFixed(2)} ${j.toFixed(2)}`}return`L ${q.toFixed(2)} ${j.toFixed(2)}`}).join(" ");b.setAttribute("d",_),y.textContent=`−${n}%`,R.textContent=w(Z(p)),c&&(H.textContent=w(c.maxDrawdownPct),N.textContent=w(c.concentrationPct),O.textContent=w(c.stakingSharePct))}C.addEventListener("input",()=>{n=Number(C.value),A()});let E;return $.addEventListener("click",()=>{U("mechanism_interact",{slug:"bybit",kind:"kill-switch"}),i=!i,r.dataset.halted=String(i),$.setAttribute("aria-checked",String(i)),C.disabled=i,clearTimeout(E),i?(r.dataset.justHalted="true",L.textContent="Сбор данных остановлен.",f.textContent+=(f.textContent?`
`:"")+"TRADE PERMISSIONS DETECTED · COLLECTOR HALTED · ALERT SENT",E=setTimeout(()=>{delete r.dataset.justHalted},400)):(L.textContent="Сбор данных активен.",f.textContent+=(f.textContent?`
`:"")+"COLLECTOR RESUMED")}),t.dataset.mechanismStatus="loading",fetch(X).then(l=>{if(!l.ok)throw new Error(`status ${l.status}`);return l.json()}).then(l=>{e||(o=l.curve.map(p=>p.value),c=l.metrics,t.dataset.mechanismStatus="ready",A())}).catch(l=>{var p;e||(t.dataset.mechanismStatus="error",(p=a.querySelector(".bybit-chart-wrap"))==null||p.insertAdjacentHTML("beforeend",'<p class="text-dim">Демо-данные временно недоступны.</p>'),console.error("[trunk] bybit demo data failed to load:",l))}),function(){e=!0,clearTimeout(E),delete t.dataset.mechanismStatus,t.classList.remove("bybit-branded"),t.replaceChildren()}}export{at as default};
