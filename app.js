const R=window.RESOURCES||[];
const DIR=[
["HOWM","원격 의료","의료·위기","선교사 대상 원격 의료 상담 연결","해외 선교사","https://howmissions.org/","https://howmissions.org/ko/%EB%AC%B8%EC%9D%98/"],
["아시안미션","건강검진","의료·위기","선교사 건강검진 지원 안내 (소속기관 경유)","소속기관을 통한 선교사","https://www.amcareland.com/25-health-checkup"],
["미션펀드","재정·후원","긴급재정","선교 프로젝트 후원 안내","선교사·선교단체","https://missionfund.org/support"],
["KMCN","돌봄·네트워크","선교사 연결","선교사 멤버케어 네트워크","선교사·돌봄 사역자","https://kmcn.or.kr/category/KMCN%20%EB%84%A4%ED%8A%B8%EC%9B%8D"],
["PeopleGroups.org","연구·데이터","미전도종족·전략","IMB 종족 정보","연구자·선교 동원가","https://peoplegroups.org/"],
["Joshua Project 데이터셋","연구·데이터","미전도종족·전략","종족·언어 데이터셋 다운로드","연구자","https://joshuaproject.net/resources/datasets"],
["Operation World","사역지 정보","사역지 정보","국가별 기도 정보","교회·선교사","https://operationworld.org/"],
["Missio Nexus","자료·저널","자료·저널","선교 리서치 자료","선교단체 리더","https://missionexus.org/innovate/research/"],
["KWMA (한국세계선교협의회)","협의회","교단·단체 지원","한국 선교단체 협의회","선교단체·교회","https://kwma.org/"],
["KWMF (한국선교사협의회)","협의회","교단·단체 지원","한국 선교사 협의·지원","한국 선교사","https://kwmf.net/"]];
const HELP=[["의료 접근","진료까지 닿는 경로"],["이동·수송","현장까지, 마지막 구간까지"],["통신·전력","연락과 사역을 이어가는 기반"],["물자·생활 기반","식량·연료·생활의 준비"],["안전·위기 대비","연락망과 대안 경로"],["사역자 돌봄","지속할 수 있는 사역을 위해"]];
const CATS=[...HELP.map(h=>h[0]),"성경·언어 자료","사역지·종족 연구","오프라인 교육"];
const TL={official:"공식 안내",case:"과거 사례",press:"보도·확인필요"};
const DCH=["전체","의료·위기","긴급재정","사역지 정보","교단·단체 지원","자료·저널","선교사 연결","미전도종족·전략"];
let S={cat:"",type:"official",dc:"전체"};const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const host=u=>{try{return new URL(u).hostname.replace(/^www\./,"")}catch{return""}};
$("#helpGrid").innerHTML=HELP.map((h,i)=>`<button type="button" data-cat="${h[0]}"><span class="n">0${i+1}</span><b>${h[0]}</b><span>${h[1]}</span></button>`).join("");
[...new Set(R.map(r=>r.region))].sort().forEach(g=>$("#region").insertAdjacentHTML("beforeend",`<option>${esc(g)}</option>`));
const cnt=t=>R.filter(r=>!t||r.type===t).length;
$("#stats").innerHTML=[["공식 안내",cnt("official")+"건"],["과거 사례",cnt("case")+"건"],["보도·확인필요",cnt("press")+"건"],["자료집 편집",R.map(r=>r.checked).sort().pop()||"-"]].map(s=>`<div><dt>${s[0]}</dt><dd>${s[1]}</dd></div>`).join("");
function card(r){
const scope=r.type==="case"?"당시 현장 경험 · 현재 필요 미확인":r.type==="press"?"보도 내용 · 기관 원문 확인 전":(r.region==="전 세계"?"여러 지역 · 기관 조건별 상이":`${r.region} 현장 · 기관 조건별 상이`);
const notes=r.type==="official"?"공식 안내는 현재 신청이 열려 있다는 뜻이 아니에요.":r.type==="case"?"과거 기록이에요. 같은 지원이 지금도 가능한지 확인하세요.":"보도 기준 정보라 사실 관계를 기관에 확인하세요.";
return `<article class="card"><div class="top"><span class="ty ${r.type}">${TL[r.type]}</span><span>${/\.kr\b|\.or\.kr|kwma|kmcn/.test(r.url||"")?"한국어 원문":"외국어 원문 · 한국어 요약"}</span><span>· ${esc(r.region)}</span>${r.new?"<span>· 최근 추가</span>":""}</div>
<h3>${r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a>`:esc(r.title)}</h3><p>${esc(r.desc)}</p><div class="cc">${r.cat.map(c=>`<span>${esc(c)}</span>`).join("")}</div>
<div class="kv"><b>대상·범위</b> · ${scope}</div><div class="kv"><b>출처</b> · ${esc(host(r.url)||"미기재")} · 게시일 ${esc(r.posted||"원문 미기재")} · 확인일 ${esc(r.checked)}</div>
<div class="kv"><b>참고</b> · ${notes}</div>
${r.next?`<details><summary>다음 단계 보기 +</summary><p>${esc(r.next)}</p></details>`:""}
<div class="cf"><span>현재 자격·비용·수용 여부 별도 확인</span>${r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener">원문 보기 ↗</a>`:""}</div></article>`}
function render(){const q=$("#q").value.trim().toLowerCase(),g=$("#region").value;
const base=R.filter(r=>(!S.cat||r.cat.includes(S.cat))&&(!g||r.region===g)&&(!q||(r.title+r.desc+r.cat.join()+r.region).toLowerCase().includes(q)));
$("#tabs").innerHTML=[["official"],["case"],["press"],[""]].map(([t])=>`<button type="button" role="tab" aria-selected="${S.type===t}" data-t="${t}" class="${S.type===t?"on":""}">${t?TL[t]:"전체"}<small>${base.filter(r=>!t||r.type===t).length}</small></button>`).join("");
$("#chips").innerHTML=["",...CATS].map(c=>`<button type="button" data-c="${c}" aria-pressed="${S.cat===c}" class="${S.cat===c?"on":""}">${c||"전체 분야"}<small>${base.filter(r=>!c||r.cat.includes(c)).length}</small></button>`).join("");
document.querySelectorAll("#helpGrid button").forEach(b=>b.classList.toggle("on",b.dataset.cat===S.cat));
const f=base.filter(r=>!S.type||r.type===S.type);
$("#count").textContent=`${f.length}건 표시 · 전체 ${R.length}건`+(S.cat?` · 분야: ${S.cat}`:"");
$("#list").innerHTML=f.map(card).join("")||`<div class="empty"><p>조건에 맞는 자료가 없어요.</p><button type="button" onclick="document.getElementById('reset').click()">필터 초기화</button></div>`;}
function renderDir(){$("#dchips").innerHTML=DCH.map(c=>`<button type="button" data-d="${c}" class="${S.dc===c?"on":""}">${c}</button>`).join("");
$("#dir").innerHTML=DIR.filter(d=>S.dc==="전체"||d[2]===S.dc).map(d=>`<div class="org"><span class="muted">${d[1]}</span><h3><a href="${d[5]}" target="_blank" rel="noopener">${esc(d[0])} ↗</a></h3><p class="k">${esc(d[3])}</p>
<p>대상 · ${esc(d[4])}</p><p>이용 경로 · ${d[6]?`<a href="${d[6]}" target="_blank" rel="noopener">문의 페이지</a>`:"공식 사이트 안내 확인"}</p><p>공식 안내 확인 · 2026.10.26</p><p>개별 이용 조건과 수용 여부는 기관에 직접 확인하세요.</p></div>`).join("")}
$("#helpGrid").onclick=e=>{const b=e.target.closest("[data-cat]");if(!b)return;S.cat=S.cat===b.dataset.cat?"":b.dataset.cat;S.type="";render();$("#resources").scrollIntoView()};
$("#chips").onclick=e=>{const b=e.target.closest("[data-c]");if(b){S.cat=b.dataset.c;render();const o=$("#chips .on");o&&o.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"})}};
$("#tabs").onclick=e=>{const b=e.target.closest("[data-t]");if(b){S.type=b.dataset.t;render()}};
$("#dchips").onclick=e=>{const b=e.target.closest("[data-d]");if(b){S.dc=b.dataset.d;renderDir()}};
let qt;$("#q").oninput=()=>{clearTimeout(qt);qt=setTimeout(render,150)};$("#region").onchange=render;
$("#reset").onclick=()=>{S.cat="";S.type="official";$("#q").value="";$("#region").value="";render()};
const m=$("#memo");m.value=localStorage.getItem("memo")||"";m.oninput=()=>localStorage.setItem("memo",m.value);
render();renderDir();const on=$("#chips .on");on&&on.scrollIntoView({block:"nearest",inline:"center"});
