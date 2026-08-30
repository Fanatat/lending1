var M=Object.defineProperty;var $=(a,e,n)=>e in a?M(a,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[e]=n;var u=(a,e,n)=>$(a,typeof e!="symbol"?e+"":e,n);const L="/content/demo/lane-battle.json";function E(a){let e=a>>>0;return function(){e+=1831565813;let i=Math.imul(e^e>>>15,e|1);return i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}}class H{constructor(e,n){u(this,"units",[]);u(this,"food",0);u(this,"elapsedS",0);u(this,"ended",!1);u(this,"rand");u(this,"nextEnemyAt");this.seed=e,this.durationS=n,this.rand=E(e),this.nextEnemyAt=2.2+this.rand()*1.6}spawnPlayer(e,n){return this.ended||this.food<n?!1:(this.food-=n,this.units.push({side:"player",x:18,hp:e.hp,maxHp:e.hp}),!0)}step(e,n){if(this.ended)return;if(this.elapsedS+=e,this.elapsedS>=this.durationS){this.elapsedS=this.durationS,this.ended=!0;return}this.food+=n.economy*e,this.elapsedS>=this.nextEnemyAt&&(this.units.push({side:"enemy",x:542,hp:n.hp,maxHp:n.hp}),this.nextEnemyAt=this.elapsedS+2.2+this.rand()*1.6);for(const o of this.units){const c=o.side==="player"?1:-1;o.x+=c*n.speed*e}const i=this.units.filter(o=>o.side==="player"),p=this.units.filter(o=>o.side==="enemy");for(const o of i)for(const c of p)o.hp<=0||c.hp<=0||Math.abs(o.x-c.x)<=22&&(o.hp-=n.damage*e,c.hp-=n.damage*e);this.units=this.units.filter(o=>o.hp>0)}snapshot(){return{elapsedS:Math.round(this.elapsedS*100)/100,units:this.units.map(e=>({side:e.side,x:Math.round(e.x*10)/10,hp:Math.round(e.hp*10)/10}))}}}const B=[{key:"damage",label:"Урон",min:2,max:25,step:1},{key:"hp",label:"HP",min:10,max:80,step:5},{key:"speed",label:"Скорость",min:10,max:100,step:5},{key:"economy",label:"Экономика",min:1,max:12,step:1}],q=`
.lb-widget { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1.5rem; }
@media (min-width: 760px) { .lb-widget { grid-template-columns: 560px 1fr; } }
.lb-canvas-wrap { position: relative; width: 100%; max-width: 560px; aspect-ratio: 560 / 220; }
.lb-canvas { width: 100%; height: 100%; display: block; background: #0c1218; }
.lb-hud { display: flex; justify-content: space-between; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 12px; color: var(--c-text-dim); }
.lb-controls { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.75rem; }
.lb-controls button {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;
  background: none; border: 1px solid var(--c-text-dim); color: var(--c-text);
  min-width: 44px; min-height: 44px; padding: 0.5em 1em; cursor: pointer;
}
.lb-controls button:disabled { opacity: 0.4; cursor: not-allowed; }
.lb-spawn { border-color: var(--c-lane-battle, #FF6B4A) !important; color: var(--c-lane-battle, #FF6B4A) !important; }
.lb-sliders { display: flex; flex-direction: column; gap: 0.9rem; }
.lb-slider-row label { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 0.3rem; }
.lb-slider-row input[type='range'] { width: 100%; height: 44px; touch-action: manipulation; }
.lb-seed-row { margin-top: 1rem; font-family: var(--font-mono); font-size: 12px; color: var(--c-text-dim); display: flex; align-items: center; gap: 0.6rem; }
`;function U(a){const e=document.createElement("style");e.textContent=q,a.appendChild(e)}function Y(a){let e=!1,n=null,i={damage:8,hp:30,speed:40,economy:4},p=42,o=10,c=20,s=null,f=null,x=0;a.classList.add("lb-branded"),U(a);const r=document.createElement("div");r.className="lb-widget",r.innerHTML=`
    <div>
      <div class="lb-canvas-wrap">
        <canvas class="lb-canvas" width="560" height="220" data-canvas
          role="img" aria-label="Автобой: прямоугольники-юниты сходятся на дорожке"></canvas>
      </div>
      <div class="lb-hud">
        <span data-timer>20.0 с</span>
        <span data-food>Еда: 0</span>
      </div>
      <div class="lb-controls">
        <button type="button" class="lb-spawn" data-spawn>Заспавнить юнита</button>
        <button type="button" data-repeat>Повторить бой</button>
      </div>
      <div class="lb-seed-row">
        <span data-seed>Сид: 42</span>
        <button type="button" data-new-seed style="min-height:32px;min-width:32px;">Новый сид</button>
      </div>
    </div>
    <div>
      <div class="lb-sliders" data-sliders></div>
      <div class="lb-controls">
        <button type="button" data-reset-balance>Сброс к балансу автора</button>
      </div>
    </div>
  `,a.appendChild(r);const d=r.querySelector("[data-canvas]").getContext("2d"),_=r.querySelector("[data-timer]"),g=r.querySelector("[data-food]"),A=r.querySelector("[data-spawn]"),C=r.querySelector("[data-repeat]"),T=r.querySelector("[data-seed]"),W=r.querySelector("[data-new-seed]"),v=r.querySelector("[data-sliders]"),k=r.querySelector("[data-reset-balance]");function N(){v.replaceChildren();for(const t of B){const l=document.createElement("div");l.className="lb-slider-row";const y=`lb-${t.key}`;l.innerHTML=`
        <label for="${y}"><span>${t.label}</span><span data-value>${i[t.key]}</span></label>
        <input type="range" id="${y}" min="${t.min}" max="${t.max}" step="${t.step}" value="${i[t.key]}">
      `;const m=l.querySelector("input"),I=l.querySelector("[data-value]");m.addEventListener("input",()=>{i[t.key]=Number(m.value),I.textContent=m.value}),v.appendChild(l)}}function b(){s=new H(p,c),T.textContent=`Сид: ${p}`}function S(){if(d.clearRect(0,0,560,220),d.strokeStyle="rgba(108,123,136,0.25)",d.beginPath(),d.moveTo(0,110),d.lineTo(560,110),d.stroke(),!!s)for(const t of s.units){const l=Math.max(0,t.hp/t.maxHp);d.fillStyle=t.side==="player"?"#FF6B4A":"#6C7B88",d.fillRect(t.x-18/2,110-26/2,18,26),d.fillStyle="rgba(230,241,255,0.85)",d.fillRect(t.x-18/2,110-26/2-6,18*l,3)}}function h(){s&&(_.textContent=`${Math.max(0,c-s.elapsedS).toFixed(1)} с`,g.textContent=`Еда: ${Math.floor(s.food)}`,A.disabled=s.food<o||s.ended)}A.addEventListener("click",()=>{!s||!n||(s.spawnPlayer(i,o),h())}),C.addEventListener("click",()=>{b(),h(),S()}),W.addEventListener("click",()=>{p=Math.floor(E(p+1+Date.now()%1e3)()*1e6),b(),h(),S()}),k.addEventListener("click",()=>{n&&(i={...n.balance},N())});function w(t){if(e)return;const l=x?Math.min(.05,(t-x)/1e3):0;x=t,s&&!s.ended&&s.step(l,i),S(),h(),f=requestAnimationFrame(w)}return a.dataset.mechanismStatus="loading",fetch(L).then(t=>{if(!t.ok)throw new Error(`status ${t.status}`);return t.json()}).then(t=>{e||(n=t,i={...t.balance},p=t.defaultSeed,o=t.spawnCost,c=t.durationSeconds,a.dataset.mechanismStatus="ready",N(),b(),h(),S(),f=requestAnimationFrame(w),window.__laneBattleDebug={reseed:l=>{p=l,b()},advance:(l,y)=>{if(!s)return null;for(let m=0;m<l;m++)s.step(y,i);return s.snapshot()},snapshot:()=>(s==null?void 0:s.snapshot())??null})}).catch(t=>{e||(a.dataset.mechanismStatus="error",_.textContent="Данные баланса недоступны",console.error("[trunk] lane-battle demo data failed to load:",t))}),function(){e=!0,f!==null&&cancelAnimationFrame(f),delete window.__laneBattleDebug,delete a.dataset.mechanismStatus,a.classList.remove("lb-branded"),a.replaceChildren()}}export{Y as default};
