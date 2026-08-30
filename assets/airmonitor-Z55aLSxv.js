const z="/content/demo/airmonitor.json";function K(n){if(!n.synthetic)return n;const i=Date.now()-new Date(n.current.t).getTime(),a=m=>({...m,t:new Date(new Date(m.t).getTime()+i).toISOString()});return{...n,current:a(n.current),day:{...n.day,points:n.day.points.map(a)}}}const C=[{id:"t_rh",label:"T / RH",fields:[{key:"temperature",label:"Температура",unit:"°C",min:15,max:30},{key:"humidity",label:"Влажность",unit:"%",min:20,max:70}]},{id:"pressure",label:"Давление",fields:[{key:"pressure",label:"Давление",unit:"гПа",min:990,max:1030}]},{id:"lux",label:"Освещённость",fields:[],private:!0},{id:"voc_nox",label:"VOC / NOx",fields:[{key:"voc",label:"VOC",unit:"индекс",min:0,max:400},{key:"nox",label:"NOx",unit:"индекс",min:0,max:20}]},{id:"pm",label:"PM1 / 2.5 / 10",fields:[{key:"pm1",label:"PM1",unit:"мкг/м³",min:0,max:50},{key:"pm25",label:"PM2.5",unit:"мкг/м³",min:0,max:50},{key:"pm10",label:"PM10",unit:"мкг/м³",min:0,max:50}]},{id:"co2",label:"CO₂",fields:[{key:"co2",label:"CO₂",unit:"ppm",min:400,max:1500}]},{id:"noise",label:"Шум",fields:[],private:!0}];function R(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function X(n){return Math.min(1,Math.max(0,n))}function J(n,i){if(n.private||!n.fields.length)return 0;let a=0;for(const m of n.fields){const f=i[m.key],g=typeof f=="number"?f:m.min;a+=X((g-m.min)/Math.max(1e-6,m.max-m.min))}return a/n.fields.length}function H(n){const i=new Date(n);return`${String(i.getUTCHours()).padStart(2,"0")}:${String(i.getUTCMinutes()).padStart(2,"0")}`}function Q(n){const i=new Date(n);return`${String(i.getUTCHours()).padStart(2,"0")}:${String(i.getUTCMinutes()).padStart(2,"0")}:${String(i.getUTCSeconds()).padStart(2,"0")}`}function tt(n,i){const a=new Date(n).getTime();return Number.isNaN(a)?!0:i-a>10*6e4}const et=`
.am-widget { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1.5rem; }
@media (min-width: 760px) { .am-widget { grid-template-columns: 380px 1fr; } }
.am-badge-row { display: flex; align-items: center; gap: 0.75rem; min-height: 1.6em; margin-bottom: 0.75rem; }
.am-badge { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; padding: 0.25em 0.6em; border: 1px solid var(--c-text-dim); color: var(--c-text-dim); }
.am-badge.is-offline { color: var(--c-stop, #FF4D3D); border-color: var(--c-stop, #FF4D3D); }
.am-canvas-wrap { position: relative; width: 380px; height: 380px; }
.am-canvas { width: 100%; height: 100%; display: block; cursor: pointer; }
.am-mode-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
.am-mode-row button {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;
  background: none; border: 1px solid var(--c-text-dim); color: var(--c-text);
  min-width: 44px; min-height: 44px; padding: 0.5em 1em; cursor: pointer;
}
.am-mode-row button[aria-pressed='true'] { border-color: var(--c-airmonitor, #6FD3FF); color: var(--c-airmonitor, #6FD3FF); }
.am-scrub-row { margin-top: 0.75rem; }
.am-scrub-row input[type='range'] { width: 100%; height: 44px; touch-action: manipulation; }
.am-scrub-time { font-family: var(--font-mono); font-size: 12px; color: var(--c-text-dim); }
.am-legend { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.am-legend button {
  display: flex; justify-content: space-between; gap: 1rem; width: 100%; text-align: left;
  background: none; border: 1px solid #16202a; color: var(--c-text);
  min-height: 44px; padding: 0.5em 0.8em; cursor: pointer; font-size: 14px;
}
.am-legend button[aria-expanded='true'] { border-color: var(--c-airmonitor, #6FD3FF); }
.am-legend .am-legend-value { font-family: var(--font-mono); color: var(--c-text-dim); }
.am-legend button.is-private .am-legend-value { color: var(--c-text-dim); }
.am-legend-note { font-size: 12px; color: var(--c-text-dim); margin: 0.15rem 0 0; }
.am-detail { margin-top: 1rem; border: 1px solid #16202a; padding: 0.75rem 1rem; min-height: 3em; }
.am-detail svg { width: 100%; height: 80px; display: block; margin-top: 0.5rem; }
.am-detail-line { fill: none; stroke: var(--c-airmonitor, #6FD3FF); stroke-width: 2; }
`;function nt(n){const i=document.createElement("style");i.textContent=et,n.appendChild(i)}function at(n){let i=!1,a=null,m="now",f=0,g=!1,x=null,A=null,P=0,_=0,F=0;n.classList.add("am-branded"),nt(n);const u=document.createElement("div");u.className="am-widget",u.innerHTML=`
    <div>
      <div class="am-badge-row"><span class="am-badge mono" data-badge>ЗАГРУЗКА…</span></div>
      <div class="am-canvas-wrap">
        <canvas class="am-canvas" width="380" height="380" data-canvas
          role="img" aria-label="Семь концентрических колец — датчики воздуха в квартире"></canvas>
      </div>
      <div class="am-mode-row" role="group" aria-label="Режим показа">
        <button type="button" data-mode="now" aria-pressed="true">Сейчас</button>
        <button type="button" data-mode="day" aria-pressed="false">Сутки</button>
      </div>
      <div class="am-scrub-row" data-scrub-row hidden>
        <label for="am-scrub" class="am-scrub-time" data-scrub-time>00:00</label>
        <input type="range" id="am-scrub" min="0" max="1000" value="0" data-scrub>
      </div>
    </div>
    <div>
      <ul class="am-legend" data-legend role="list"></ul>
      <div class="am-detail" data-detail aria-live="polite">Наведите или сфокусируйте кольцо, чтобы увидеть график за сутки.</div>
    </div>
  `,n.appendChild(u);const y=u.querySelector("[data-badge]"),w=u.querySelector("[data-canvas]"),s=w.getContext("2d"),V=Array.from(u.querySelectorAll(".am-mode-row button")),B=u.querySelector("[data-scrub-row]"),k=u.querySelector("[data-scrub]"),D=u.querySelector("[data-scrub-time]"),L=u.querySelector("[data-legend]"),T=u.querySelector("[data-detail]");function E(){if(!a)return null;if(m==="now")return a.current;const t=Math.min(a.day.points.length-1,Math.round(f*(a.day.points.length-1)));return a.day.points[t]??null}function Y(){if(!a)return;tt(a.current.t,Date.now())?(y.textContent=`OFFLINE · ПОСЛЕДНИЕ ДАННЫЕ ${H(a.current.t)}`,y.classList.add("is-offline")):(y.textContent="ДЕМО-ДАННЫЕ",y.classList.remove("is-offline"))}function I(){const t=E();L.replaceChildren();for(const e of C){const r=document.createElement("li"),o=document.createElement("button");o.type="button",o.dataset.ring=e.id,o.setAttribute("aria-expanded",String(x===e.id));const l=document.createElement("span");l.className="am-legend-value",e.private?(o.classList.add("is-private"),l.textContent="PRIVATE"):t&&(l.textContent=e.fields.map(c=>{const p=t.sensors[c.key];return typeof p=="number"?`${p}${c.unit}`:"—"}).join(" / "));const d=document.createElement("span");if(d.textContent=e.label,o.append(d,l),o.addEventListener("pointerenter",()=>S(e.id)),o.addEventListener("focus",()=>S(e.id)),o.addEventListener("click",()=>S(x===e.id?null:e.id)),r.appendChild(o),L.appendChild(r),e.private){const c=document.createElement("p");c.className="am-legend-note",c.textContent="Автор решил не публиковать этот датчик.",r.appendChild(c)}}}function S(t){x=t,N();for(const e of L.querySelectorAll("button"))e.setAttribute("aria-expanded",String(e.dataset.ring===t))}function N(){if(!x||!a){T.textContent="Наведите или сфокусируйте кольцо, чтобы увидеть график за сутки.";return}const t=C.find(h=>h.id===x);if(!t)return;if(t.private){T.textContent=`${t.label}: данных нет — приватно.`;return}const e=t.fields[0];if(!e)return;const r=a.day.points.map(h=>{const v=h.sensors[e.key];return typeof v=="number"?v:e.min}),o=280,l=70,d=Math.min(...r),c=Math.max(...r),p=Math.max(1e-6,c-d),b=r.map((h,v)=>{const $=v/(r.length-1)*o,M=l-(h-d)/p*l;return`${v===0?"M":"L"} ${$.toFixed(1)} ${M.toFixed(1)}`}).join(" ");T.innerHTML=`<span>${t.label} за сутки, ${r[0]}…${r[r.length-1]} ${e.unit}</span><svg viewBox="0 0 ${o} ${l}"><path class="am-detail-line" d="${b}"></path></svg>`}function U(t,e){return t.private?"rgba(108,123,136,0.35)":`rgba(111,211,255,${(.25+e*.65).toFixed(2)})`}function q(t){if(!a)return;const e=E();s.clearRect(0,0,380,380);const r=380/2,o=380/2,l=R();C.forEach((d,c)=>{const p=40+c*20,b=e?J(d,e.sensors):0,h=l?0:1.5+b*3.5,v=.5+b*1.2,$=l?0:Math.sin(t*v*Math.PI*2+c)*h,M=p+$;s.beginPath(),s.lineWidth=9,s.strokeStyle=U(d,b),d.private?s.setLineDash([4,5]):s.setLineDash([]),s.arc(r,o,M,0,Math.PI*2),s.stroke(),x===d.id&&(s.beginPath(),s.lineWidth=1,s.strokeStyle="rgba(230,241,255,0.8)",s.setLineDash([]),s.arc(r,o,M+9,0,Math.PI*2),s.stroke())})}function Z(t,e){const r=w.getBoundingClientRect(),o=380/r.width,l=(t-r.left)*o-380/2,d=(e-r.top)*o-380/2,c=Math.sqrt(l*l+d*d);for(let p=0;p<C.length;p++){const b=40+p*20;if(Math.abs(c-b)<=9)return C[p].id}return null}w.addEventListener("pointermove",t=>{const e=Z(t.clientX,t.clientY);e&&S(e)}),w.addEventListener("pointerleave",()=>S(null)),w.addEventListener("click",t=>{const e=Z(t.clientX,t.clientY);S(e??null)});function W(t){m=t;for(const e of V)e.setAttribute("aria-pressed",String(e.dataset.mode===t));B.hidden=t!=="day",t==="day"?R()||j():O(),I(),N()}function j(){g=!0,_=performance.now(),F=f}function O(){g=!1}k.addEventListener("input",()=>{var t;O(),f=Number(k.value)/1e3,a&&(D.textContent=H(((t=E())==null?void 0:t.t)??a.current.t)),I(),N()});for(const t of V)t.addEventListener("click",()=>W(t.dataset.mode==="day"?"day":"now"));function G(t){var r;if(i)return;const e=t/1e3;if(g){const o=t-_;f=F+o/4e4,f>=1&&(f=0,_=t,F=0),k.value=String(Math.round(f*1e3)),a&&(D.textContent=H(((r=E())==null?void 0:r.t)??a.current.t))}t-P>80||g?(P=t,q(e),g&&I()):R()||q(e),A=requestAnimationFrame(G)}return n.dataset.mechanismStatus="loading",fetch(z).then(t=>{if(!t.ok)throw new Error(`status ${t.status}`);return t.json()}).then(t=>{i||(a=K(t),n.dataset.mechanismStatus="ready",Y(),I(),N(),D.textContent=Q(a.current.t),A=requestAnimationFrame(G))}).catch(t=>{i||(n.dataset.mechanismStatus="error",y.textContent="ДАННЫЕ НЕДОСТУПНЫ",console.error("[trunk] airmonitor demo data failed to load:",t))}),function(){i=!0,A!==null&&cancelAnimationFrame(A),delete n.dataset.mechanismStatus,n.classList.remove("am-branded"),n.replaceChildren()}}export{at as default};
