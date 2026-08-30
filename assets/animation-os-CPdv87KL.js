const M="/content/demo/animation-os.json",j=["en","es","ru"],q=`
.aos-widget { margin-top: 1.5rem; }
.aos-lang-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
.aos-lang-row button {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em;
  background: none; border: 1px solid var(--c-text-dim); color: var(--c-text);
  min-width: 44px; min-height: 44px; padding: 0.5em 1em; cursor: pointer;
}
.aos-lang-row button[aria-pressed='true'] { border-color: var(--c-animation-os, #B18BFF); color: var(--c-animation-os, #B18BFF); }
.aos-chain-scroll { overflow-x: auto; padding-bottom: 0.6rem; }
.aos-chain { display: flex; align-items: center; gap: 0; white-space: nowrap; width: max-content; }
.aos-node {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase;
  background: none; border: 1px solid #2a3a48; color: var(--c-text);
  padding: 0.6em 0.9em; min-height: 44px; cursor: pointer; flex-shrink: 0;
}
.aos-node.is-active { border-color: var(--c-animation-os, #B18BFF); color: var(--c-animation-os, #B18BFF); }
.aos-edge { color: var(--c-text-dim); padding: 0 0.4em; transition: opacity 200ms ease; flex-shrink: 0; }
.aos-chain.has-active .aos-edge { opacity: 0.25; }
.aos-chain.has-active .aos-edge.is-live { opacity: 1; color: var(--c-animation-os, #B18BFF); }
.aos-panel { margin-top: 1.25rem; border: 1px solid #16202a; padding: 1rem; }
.aos-panel[hidden] { display: none; }
.aos-badge { display: inline-block; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
  padding: 0.25em 0.6em; border: 1px solid var(--c-text-dim); color: var(--c-text-dim); margin-bottom: 0.75rem; }
.aos-json { font-family: var(--font-mono); font-size: 12px; line-height: 1.5; white-space: pre-wrap;
  color: var(--c-text); max-height: 280px; overflow: auto; margin: 0; }
.aos-prompt { font-size: 15px; line-height: 1.5; }
.aos-image-frame img { display: block; width: 100%; max-width: 420px; height: auto; }
.aos-caption { margin-top: 0.5rem; font-size: 13px; color: var(--c-text-dim); }
.aos-waveform { width: 100%; max-width: 420px; height: 80px; display: block; }
.aos-waveform rect { fill: var(--c-animation-os, #B18BFF); }
.aos-voice { margin-top: 0.5rem; font-family: var(--font-mono); font-size: 12px; color: var(--c-text-dim); }
`;function H(i){const c=document.createElement("style");c.textContent=q,i.appendChild(c)}function N(i){let c=!1,l=null,m="ru",d=null,g=null;const h=new Map,x=new Map,w=new Map;i.classList.add("aos-branded"),H(i);const f=document.createElement("div");f.className="aos-widget",f.innerHTML=`
    <div class="aos-lang-row" role="group" aria-label="Язык">
      ${j.map(t=>`<button type="button" data-lang="${t}" aria-pressed="${t===m}">${t.toUpperCase()}</button>`).join("")}
    </div>
    <div class="aos-chain-scroll">
      <div class="aos-chain" data-chain></div>
    </div>
    <div class="aos-panel" data-panel hidden aria-live="polite"></div>
  `,i.appendChild(f);const b=Array.from(f.querySelectorAll(".aos-lang-row button")),p=f.querySelector("[data-chain]"),r=f.querySelector("[data-panel]");function C(){return g||(g=document.createElement("img"),g.alt="Заглушка кадра — цветной прямоугольник"),g}function E(){l&&(p.replaceChildren(),l.nodes.forEach((t,e)=>{if(e>0){const o=document.createElement("span");o.className="aos-edge",o.dataset.edgeIndex=String(e),o.setAttribute("aria-hidden","true"),o.textContent="→",p.appendChild(o)}const a=document.createElement("button");a.type="button",a.className="aos-node",a.dataset.nodeId=t.id,a.textContent=t.label,a.setAttribute("aria-expanded","false"),a.addEventListener("click",()=>L(t.id)),p.appendChild(a)}),v())}function v(){if(!l)return;p.classList.toggle("has-active",d!==null);const t=l.nodes.findIndex(e=>e.id===d);for(const e of p.querySelectorAll(".aos-node")){const a=e.dataset.nodeId===d;e.classList.toggle("is-active",a),e.setAttribute("aria-expanded",String(a))}for(const e of p.querySelectorAll(".aos-edge")){const a=Number(e.dataset.edgeIndex);e.classList.toggle("is-live",t!==-1&&(a===t||a===t+1))}}async function B(t){if(h.has(t))return h.get(t);const a=await(await fetch(t)).json();return h.set(t,a),a}async function A(t){if(x.has(t))return x.get(t);const a=await(await fetch(t)).text();return x.set(t,a),a}async function T(t){const e=w.get(t);if(e)return e;const o=await(await fetch(t)).json();return w.set(t,o.samples),o.samples}function k(t){const o=420/t.length;return`<svg class="aos-waveform" viewBox="0 0 420 80" role="img" aria-label="Форма звуковой волны (заглушка)">${t.map((s,u)=>{const S=Math.max(2,s*80);return`<rect x="${(u*o).toFixed(1)}" y="${((80-S)/2).toFixed(1)}" width="${Math.max(1,o-1.5).toFixed(1)}" height="${S.toFixed(1)}"></rect>`}).join("")}</svg>`}async function L(t){var a,o,n;if(!l)return;d=t,v(),r.hidden=!1,r.innerHTML='<p class="text-dim">Загрузка…</p>';const e=l.nodes.find(s=>s.id===t);if(e){if(e.artifactType==="json"||e.artifactType==="model"){const s=e.artifactUrl?await B(e.artifactUrl):null;if(c||d!==t)return;r.innerHTML=`<span class="aos-badge mono">ЗАГЛУШКА</span><pre class="aos-json">${y(JSON.stringify(s,null,2))}</pre>`}else if(e.artifactType==="prompt"){const s=(a=e.artifactUrlByLang)==null?void 0:a[m],u=s?await A(s):"";if(c||d!==t)return;r.innerHTML=`<span class="aos-badge mono">ЗАГЛУШКА</span><p class="aos-prompt" data-prompt-text>${y(u)}</p>`}else if(e.artifactType==="image"){r.innerHTML='<span class="aos-badge mono">ЗАГЛУШКА · инфраструктура готова, качество контента впереди</span><div class="aos-image-frame" data-image-frame></div><p class="aos-caption" data-caption></p>';const s=C();s.src=e.imageUrl??"",r.querySelector("[data-image-frame]").appendChild(s);const u=r.querySelector("[data-caption]");u.textContent=((o=e.captionByLang)==null?void 0:o[m])??""}else if(e.artifactType==="audio"){const s=e.waveformUrl?await T(e.waveformUrl):[];if(c||d!==t)return;r.innerHTML=`<span class="aos-badge mono">ЗАГЛУШКА</span><div data-waveform>${k(s)}</div><p class="aos-voice mono" data-voice>${y(((n=e.voiceByLang)==null?void 0:n[m])??"")}</p>`}}}function F(){d=null,r.hidden=!0,r.replaceChildren(),v()}function $(t){var a,o;m=t;for(const n of b)n.setAttribute("aria-pressed",String(n.dataset.lang===t));if(!d||!l)return;const e=l.nodes.find(n=>n.id===d);if(e){if(e.artifactType==="prompt")L(e.id);else if(e.artifactType==="image"){const n=r.querySelector("[data-caption]");n&&(n.textContent=((a=e.captionByLang)==null?void 0:a[m])??"")}else if(e.artifactType==="audio"){const n=r.querySelector("[data-voice]");n&&(n.textContent=((o=e.voiceByLang)==null?void 0:o[m])??"")}}}for(const t of b)t.addEventListener("click",()=>$(t.dataset.lang??"ru"));return f.addEventListener("keydown",t=>{var e;if(t.key==="ArrowLeft"||t.key==="ArrowRight"){const a=Array.from(p.querySelectorAll(".aos-node")),o=a.indexOf(document.activeElement);if(o===-1)return;t.preventDefault(),t.stopPropagation();const n=t.key==="ArrowRight"?Math.min(a.length-1,o+1):Math.max(0,o-1);(e=a[n])==null||e.focus();return}t.key==="Escape"&&d&&(t.preventDefault(),t.stopPropagation(),F())}),i.dataset.mechanismStatus="loading",fetch(M).then(t=>{if(!t.ok)throw new Error(`status ${t.status}`);return t.json()}).then(t=>{c||(l=t,i.dataset.mechanismStatus="ready",E())}).catch(t=>{c||(i.dataset.mechanismStatus="error",p.innerHTML='<p class="text-dim">Цепь пайплайна временно недоступна.</p>',console.error("[trunk] animation-os demo data failed to load:",t))}),function(){c=!0,delete i.dataset.mechanismStatus,i.classList.remove("aos-branded"),i.replaceChildren()}}function y(i){return i.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c])}export{N as default};
