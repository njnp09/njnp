"use strict";
const VERSION="1.2", STORAGE_KEY="clickset_017_groups";
const EDIT_PASSWORD="45";
let editUnlocked=false,pendingEditAction=null;
const SOUNDS=[
 {id:"classic",emoji:"🔊",name:"ClickSet Original"},
 {id:"cowbell",emoji:"🥁",name:"Cowbell",sample:true,recommended:true},
 {id:"clave",emoji:"🪵",name:"Claves",sample:true},
 {id:"rim",emoji:"🥁",name:"Rimshot",sample:true},
 {id:"clap",emoji:"👏",name:"Clap",sample:true},
 {id:"studio",emoji:"🎧",name:"Studio Click"}
];
const SAMPLE_FILES={
 cowbell:{normal:"cowbell-normal.wav",accent:"cowbell-accent.wav"},
 clave:{normal:"claves-normal.wav",accent:"claves-accent.wav"},
 rim:{normal:"rimshot-normal.wav",accent:"rimshot-accent.wav"},
 clap:{normal:"clap-normal.wav",accent:"clap-accent.wav"}
};

const COUNTDOWN_KEY="clickset_countdown_enabled";
let countdownEnabled=localStorage.getItem(COUNTDOWN_KEY)==="true";
let visualBeatTimers=[];
function clearVisualBeatTimers(){visualBeatTimers.forEach(clearTimeout);visualBeatTimers=[]}
function beatsForSong(song){return Math.max(1,parseInt(String(song?.meter||"4/4").split("/")[0],10)||4)}
function renderBeatDots(){
 const song=flat[current]?.song;if(!song)return;const n=beatsForSong(song);
 [$("beatDots"),$("concertBeatDots")].forEach(box=>{if(!box)return;box.innerHTML="";for(let i=0;i<n;i++){const d=document.createElement("span");d.className="beatDot"+(i===0?" downbeat":"");d.setAttribute("aria-label",`Temps ${i+1}`);box.appendChild(d)}})
}
function lightBeat(index,accented=false){
 [$("beatDots"),$("concertBeatDots")].forEach(box=>{if(!box)return;const dots=[...box.children];dots.forEach((d,i)=>d.classList.toggle("active",i===index));if(dots[index])dots[index].classList.toggle("accented",accented)});
}
function showCountdownLabel(text,time,myRun){const delay=Math.max(0,(time-audioCtx.currentTime)*1000);visualBeatTimers.push(setTimeout(()=>{if(!playing||myRun!==runId)return;const overlay=$("countdownOverlay"),value=$("countdownValue");value.textContent=text;overlay.classList.remove("hidden");overlay.classList.remove("pop");void overlay.offsetWidth;overlay.classList.add("pop");if(text==="GO")visualBeatTimers.push(setTimeout(()=>overlay.classList.add("hidden"),Math.max(180,60000/(Number(flat[current]?.song?.bpm)||120)*.55)),)},delay))}
const defaults=[{name:"4L",color:"#ffd34d",logo:"logo-4l.jpg",setlists:[{name:"Setlist principal",sound:"classic",items:[{name:"XUXA",bpm:148},{name:"EVA MARÍA",bpm:136},{name:"CUÉNTAME",bpm:132},{name:"LIBRE",bpm:118},{name:"MIX MAMMA MIA",children:[{name:"Mamma Mia",bpm:142},{name:"Gloria",bpm:142},{name:"Tengo el corazón contento",bpm:148},{name:"DRUM SOLO",bpm:132},{name:"Lambada",bpm:122}]},{name:"ABANIBÍ ABOEBÉ",bpm:143},{name:"MIX RAINING",children:[{name:"It's Raining Men",bpm:142},{name:"Midnight",bpm:132},{name:"Yo no soy esa",bpm:138}]},{name:"MIX VIVO CANTANDO",children:[{name:"Vivo cantando",bpm:132},{name:"La felicidad",bpm:132},{name:"Camisa negra",bpm:93},{name:"Porque te vas",bpm:196},{name:"Could You Be Loved",bpm:100},{name:"Me gustas tú",bpm:101},{name:"Everybody",bpm:103},{name:"Spice Girls",bpm:116},{name:"Dragostea Din Tei",bpm:141}]},{name:"VIVIR ASÍ ES MORIR DE AMOR",bpm:230},{name:"HELP",bpm:148},{name:"LA PUERTA DE ALCALÁ",bpm:150},{name:"MIX LATINO",children:[{name:"Solamente bésame",bpm:134},{name:"La mordidita",bpm:148},{name:"Felices los 4",bpm:102},{name:"Que levante la mano",bpm:126},{name:"La morocha",bpm:161}]},{name:"MIX OREJA",children:[{name:"20 de enero",bpm:143},{name:"El 28",bpm:126},{name:"Puedes contar conmigo",bpm:152}]},{name:"MIX MECANO",children:[{name:"Chica Yeyé",bpm:165},{name:"Me colé en una fiesta",bpm:155},{name:"Maquillaje",bpm:128},{name:"Bailando",bpm:135}]},{name:"EL SOL NO REGRESA",bpm:138},{name:"BOIG PER TU",bpm:98}]}]},{name:"El Hombre 80",color:"#f4f6f7",logo:"logo-h80.jpeg",setlists:[{name:"Setlist principal",sound:"classic",items:[{name:"HACE CALOR",bpm:146},{name:"LA CHICA DE AYER",bpm:137},{name:"INSURRECCIÓN",bpm:146},{name:"MIL CALLES",bpm:150},{name:"DÉJAME",bpm:111},{name:"LA BAMBA",bpm:160},{name:"BIENVENIDOS",bpm:104},{name:"NO PUEDO VIVIR SIN TI",bpm:140},{name:"SIN DOCUMENTOS",bpm:202},{name:"CUANDO BRILLE EL SOL",bpm:180},{name:"EN ALGÚN LUGAR",bpm:148},{name:"VIAJE CON NOSOTROS",bpm:133},{name:"CAROLINA",bpm:134},{name:"NO DUDARÍA",bpm:150},{name:"7 VIDAS",bpm:146},{name:"CUERPO DE MUJER",bpm:112},{name:"RAYANDO EL SOL",bpm:123},{name:"TENGO UNA BANDA",bpm:140},{name:"PRINCESA",bpm:130},{name:"EL LÍMITE",bpm:130},{name:"MESCALINA",bpm:105},{name:"QUÉ HACE UNA CHICA COMO TÚ",bpm:124},{name:"HORMIGÓN, MUJERES Y ALCOHOL",bpm:130},{name:"LA FLACA",bpm:119},{name:"NADA FUE UN ERROR",bpm:149},{name:"LA PLAZA DEL PUEBLO",bpm:157},{name:"L.A.",bpm:132},{name:"ROCK’N’ROLL STAR",bpm:153},{name:"SOLDADITO MARINERO",bpm:150},{name:"MI GRAN NOCHE",bpm:148},{name:"UN BESO Y UNA FLOR",bpm:179},{name:"LADY MADRID",bpm:125},{name:"EL BIEN",bpm:138}]}]},{name:"Toc i Pam",color:"#32c9ff",logo:"logo-tocipam.jpg",setlists:[{name:"Toc i Pam 2026",sound:"classic",items:[{name:"HOLA AMICS, QUÈ TAL I COM ESTAU?",bpm:120},{name:"ONOMATOPEYA",bpm:120},{name:"PALMERA + BAJO DEL MAR + LA TAZA",bpm:120},{name:"EL TEU BALL",bpm:120},{name:"SOM ANIMETES",bpm:120},{name:"PIRATES",bpm:120},{name:"ESTÀTUES",bpm:120},{name:"LA LLUNA LA PRUNA",bpm:120},{name:"CHOCOLATE",bpm:120},{name:"JOC MEDLEY ESCOLAR",bpm:120},{name:"PIÉ ZI ZA ZU",bpm:120},{name:"JO VOLIA KETXUP + PEDRA, PAPER, TISORES",bpm:120},{name:"TENC ALEGRIA",bpm:120},{name:"TARINGA",bpm:120}]}]},{name:"100 Gaviotas",color:"#ef5c5c",logo:"",setlists:[{name:"100 gavines",sound:"classic",items:[{name:"A TIENTAS (COPS, TOTS JUNTS)",bpm:135},{name:"NO PUEDO EVITAR PENSAR EN TI (GASPAR)",bpm:120},{name:"ESOS OJOS NEGROS",bpm:135},{name:"PALABRAS SIN NOMBRE (JUNTS, PUJADA)",bpm:150},{name:"ROSAS EN AGUA (JUNTS, VALS)",bpm:178},{name:"ENTRE SALITRE Y SUDOR (BATERIA)",bpm:124},{name:"SENTIDO DE TU CANCIÓN (GASPAR)",bpm:120},{name:"JARDÍN DE ROSAS (COMENÇA GASPAR)",bpm:170},{name:"CAPRICORNIO (TOTS JUNTS, SHUFFLE)",bpm:140},{name:"ROSA GRIS (TOTS JUNTS, A CAIXA TOT)",bpm:145},{name:"NADA (4 NEGRES CAIXA)",bpm:140},{name:"PIENSO EN TI (LA FA GASPAR SOL)",bpm:140},{name:"EN ALGÚN LUGAR",bpm:148},{name:"ROZANDO LA ETERNIDAD",bpm:125},{name:"UNA CALLE DE PARÍS (GUITARRA)",bpm:145},{name:"HERIDA (GUITARRA, TOC A DOS TEMPS)",bpm:136},{name:"CASA AZUL (TOTS JUNTS)",bpm:159},{name:"MUNDO DE CRISTAL (GUITARRA)",bpm:125},{name:"CARTAS DE AMOR (GUITARRA)",bpm:128},{name:"A UN MINUTO (GUITARRA)",bpm:151},{name:"100 GAVIOTAS (GUITARRA)",bpm:140},{name:"CASABLANCA BONA (BAIX)",bpm:120}]}]},{name:"PGS",color:"#d4af37",logo:"logo-pgs.png",setlists:[{name:"Setlist 2026",sound:"classic",items:[{name:"I BELIEVE",bpm:100},{name:"JUST A LITTLE MORE JESUS",bpm:100},{name:"BREATH OF HEAVEN",bpm:100},{name:"READY FOR A MIRACLE",bpm:100},{name:"HEAL",bpm:100},{name:"EASY ON ME",bpm:100},{name:"JESUS PROMISED",bpm:100},{name:"DEVIL'S WHISPER",bpm:100},{name:"HIT THE ROAD JACK",bpm:100},{name:"LET IT BE",bpm:100},{name:"JOHN THE REVELATOR",bpm:100},{name:"MORE ABUNDANTLY",bpm:100}]}]}]
const $=id=>document.getElementById(id), clone=x=>JSON.parse(JSON.stringify(x));
const THEME_KEY="clickset_theme";
const RECENTS_KEY="clickset_recent_setlists";
const MAX_RECENTS=5;
function getRecentSetlists(){
 try{const value=JSON.parse(localStorage.getItem(RECENTS_KEY)||"[]");return Array.isArray(value)?value:[]}catch(e){return []}
}
function saveRecentSetlists(items){localStorage.setItem(RECENTS_KEY,JSON.stringify(items.slice(0,MAX_RECENTS)))}
function rememberRecentSetlist(gi,si){
 const group=groups[gi],setlist=group?.setlists?.[si];if(!group||!setlist)return;
 const entry={groupName:group.name,setlistName:setlist.name,openedAt:Date.now()};
 const rest=getRecentSetlists().filter(x=>!(x.groupName===entry.groupName&&x.setlistName===entry.setlistName));
 saveRecentSetlists([entry,...rest]);
}
function resolveRecent(entry){
 const gi=groups.findIndex(g=>g.name===entry.groupName);if(gi<0)return null;
 const si=groups[gi].setlists.findIndex(s=>s.name===entry.setlistName);if(si<0)return null;
 return {gi,si,group:groups[gi],setlist:groups[gi].setlists[si]};
}
function renderRecentSetlists(){
 const section=$("recentSection"),box=$("recentSetlists");if(!section||!box)return;
 const resolved=getRecentSetlists().map(resolveRecent).filter(Boolean).slice(0,MAX_RECENTS);
 if(!resolved.length){section.classList.add("hidden");box.innerHTML="";return}
 section.classList.remove("hidden");box.innerHTML="";
 resolved.forEach(({gi,si,group,setlist})=>{
  const card=document.createElement("button");card.type="button";card.className="recentCard";card.style.setProperty("--card-color",group.color||"#ffd34d");
  const visual=group.logo?`<img src="${group.logo}" alt="">`:`<span class="recentFallback">🎵</span>`;
  card.innerHTML=`${visual}<span class="recentText"><strong>${esc(setlist.name)}</strong><small>${esc(group.name)} · ${countFlat(setlist.items)} parts</small></span><span class="recentArrow">›</span>`;
  card.onclick=()=>{groupIndex=gi;setAccent();openSetlist(si)};box.appendChild(card)
 })
}

function applyTheme(theme){
 const light=theme==="light";
 document.body.classList.toggle("light-theme",light);
 const btn=$("themeToggle");
 if(btn){
  btn.textContent=light?"🌙":"☀️";
  btn.setAttribute("aria-label",light?"Activar mode fosc":"Activar mode clar");
  btn.title=light?"Activar mode fosc":"Activar mode clar";
 }
 const meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.content=light?"#f4f6f8":"#0d1318";
}
function toggleTheme(){
 const next=document.body.classList.contains("light-theme")?"dark":"light";
 localStorage.setItem(THEME_KEY,next);
 applyTheme(next);
}
applyTheme(localStorage.getItem(THEME_KEY)||"dark");

function normalize(data){return data.map(g=>({name:g.name||"Grup",color:g.color||"#ffd34d",logo:g.logo||"",setlists:(g.setlists||[]).map(s=>({name:s.name||"Repertori",sound:({digital:"studio",beep:"studio"}[s.sound]||s.sound||"classic"),items:(s.items||[]).map(i=>i.children?{...i,children:i.children.map(c=>({...c,sound:({digital:"studio",beep:"studio"}[c.sound]||c.sound||"")}))}:{...i,sound:({digital:"studio",beep:"studio"}[i.sound]||i.sound||"")})}))}))}
let stored=null;try{stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||localStorage.getItem("clickset_014_groups")||localStorage.getItem("clickset_010_groups")||"null")}catch(e){}
let groups=normalize(stored||defaults),groupIndex=null,setlistIndex=null,current=0,flat=[],openMixes={},playing=false,editingGroups=null;
let audioCtx=null,classicBuffer=null,schedulerTimer=null,nextBeatTime=0,runId=0,activeNodes=new Set(),beatInBar=0,clickOutputNode=null,trackOutputNode=null;
const sampleBuffers={};let sampleLoading=null;
let trackSource=null,trackBuffer=null,trackGainNode=null,trackLoadToken=0,classicLoading=null;
const TRACK_DB_NAME="clickset_audio_tracks";
const TRACK_DB_VERSION=1;
const TRACK_STORE="tracks";
let trackDbPromise=null;

let bpmTarget=null,bpmDraft="120",bpmTypingFresh=true,tapTimes=[],groupEditIndex=null,groupLogoDraft="",setlistEditIndex=null;
let appVolume=Math.max(0,Math.min(1,Number(localStorage.getItem("clickset_app_volume")||0.9))),previewInterval=null,previewType=null,previewButton=null,previewRepeat=true;
const CLICK_ROUTE_KEY="clickset_click_route", TRACK_ROUTE_KEY="clickset_track_route";
let clickRoute=localStorage.getItem(CLICK_ROUTE_KEY)||"L";
let trackRoute=localStorage.getItem(TRACK_ROUTE_KEY)||"R";
(function apply017Defaults(){
 const gaviotasItems=clone(defaults.find(g=>g.name==="100 Gaviotas").setlists[0].items);
 for(const g of groups){
  if(g.name.trim().toLowerCase()==="4l"){
   if(!g.logo)g.logo="logo-4l.jpg";
   for(const sl of g.setlists)for(const item of sl.items){const arr=item.children||[item];for(const song of arr)if(song.name.trim().toUpperCase()==="EVA MARÍA")song.bpm=136}
  }
  if(g.name.toLowerCase().includes("hombre 80")||g.name.toLowerCase().includes("el hombre 80")){if(!g.logo)g.logo="logo-h80.jpeg";const h80Base=clone(defaults.find(x=>x.name==="El Hombre 80").setlists[0]);if(!Array.isArray(g.setlists)||!g.setlists.length)g.setlists=[h80Base];else{g.setlists[0].name=g.setlists[0].name||"Setlist principal";g.setlists[0].sound=g.setlists[0].sound||"classic";g.setlists[0].items=clone(h80Base.items)}}
 }
 if(!groups.some(g=>g.name.toLowerCase().includes("hombre 80")))groups.push(clone(defaults.find(g=>g.name==="El Hombre 80")));
 if(!groups.some(g=>g.name.trim().toLowerCase()==="toc i pam"))groups.push(clone(defaults.find(g=>g.name==="Toc i Pam")));
 else{const g=groups.find(g=>g.name.trim().toLowerCase()==="toc i pam");if(g){if(!g.logo)g.logo="logo-tocipam.jpg";const base=clone(defaults.find(x=>x.name==="Toc i Pam").setlists[0]);if(Array.isArray(g.setlists))for(const sl of g.setlists){if((sl.name||"").trim().toLowerCase()==="carnaval 2025")sl.name="Toc i Pam 2026";}if(!Array.isArray(g.setlists)||!g.setlists.length)g.setlists=[base];else if(!Array.isArray(g.setlists[0].items)||g.setlists[0].items.length===0){g.setlists[0].name="Toc i Pam 2026";g.setlists[0].sound=g.setlists[0].sound||"classic";g.setlists[0].items=base.items}}}
 let g=groups.find(g=>g.name.trim().toLowerCase()==="100 gaviotas");
 if(!g){g=clone(defaults.find(g=>g.name==="100 Gaviotas"));groups.push(g)}
 else{
  g.color=g.color||"#ef5c5c";
  if(!Array.isArray(g.setlists)||!g.setlists.length)g.setlists=[{name:"100 gavines",sound:"classic",items:gaviotasItems}];
  else{g.setlists[0].name="100 gavines";g.setlists[0].sound=g.setlists[0].sound||"classic";g.setlists[0].items=gaviotasItems}
 }
 let pgs=groups.find(g=>g.name.trim().toLowerCase()==="pgs");
 const pgsBase=clone(defaults.find(g=>g.name==="PGS"));
 if(!pgs){groups.push(pgsBase)}
 else{
  pgs.color=pgs.color||"#d4af37";
  if(!pgs.logo)pgs.logo="logo-pgs.png";
  if(!Array.isArray(pgs.setlists)||!pgs.setlists.length)pgs.setlists=pgsBase.setlists;
  else if(!pgs.setlists.some(s=>(s.name||"").trim().toLowerCase()==="setlist 2026"))pgs.setlists.push(pgsBase.setlists[0]);
 }
 save()
})();
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(groups))}

(function apply103FourLSetlist(){
 const MIGRATION_KEY="clickset_migration_103_4l";
 if(localStorage.getItem(MIGRATION_KEY)==="done")return;

 const normalizeName=value=>String(value||"")
  .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
  .toUpperCase().trim();

 const fourL=groups.find(g=>normalizeName(g.name)==="4L");
 if(!fourL||!Array.isArray(fourL.setlists)||!fourL.setlists.length)return;

 const sl=fourL.setlists[0];
 if(!Array.isArray(sl.items))sl.items=[];

 const bpmMap=new Map([
  ["XUXA",148],
  ["EVA MARIA",136],
  ["CUENTAME",132],
  ["LIBRE",118],
  ["ABANIBI ABOEBE",143],
  ["VIVIR ASI ES MORIR DE AMOR",230],
  ["HELP",148],
  ["LA PUERTA DE ALCALA",150]
 ]);

 const childBpmMap=new Map([
  ["MAMMA MIA",142],
  ["GLORIA",142],
  ["TENGO EL CORAZON CONTENTO",148],
  ["DRUM SOLO",132],
  ["LAMBADA",122],
  ["IT'S RAINING MEN",142],
  ["MIDNIGHT",132],
  ["YO NO SOY ESA",138],
  ["VIVO CANTANDO",132],
  ["LA FELICIDAD",132],
  ["CAMISA NEGRA",93],
  ["PORQUE TE VAS",196],
  ["COULD YOU BE LOVED",100],
  ["ME GUSTAS TU",101],
  ["EVERYBODY",103],
  ["SPICE GIRLS",116],
  ["DRAGOSTEA DIN TEI",141],
  ["SOLAMENTE BESAME",134],
  ["LA MORDIDITA",148],
  ["FELICES LOS 4",102],
  ["QUE LEVANTE LA MANO",126],
  ["LA MOROCHA",161],
  ["20 DE ENERO",143],
  ["EL 28",126],
  ["PUEDES CONTAR CONMIGO",152]
 ]);

 for(const item of sl.items){
  const key=normalizeName(item.name);
  if(bpmMap.has(key))item.bpm=bpmMap.get(key);
  if(Array.isArray(item.children)){
   for(const child of item.children){
    const childKey=normalizeName(child.name);
    if(childBpmMap.has(childKey))child.bpm=childBpmMap.get(childKey);
   }
  }
 }

 // Elimina qualsevol Chica Yeyé antiga, qualsevol MIX MECANO previ
 // i les dues cançons noves per evitar duplicats.
 const removeNames=new Set([
  "CHICA YEYE","CHICA YE-YE","MIX MECANO",
  "EL SOL NO REGRESA","BOIG PER TU"
 ]);
 sl.items=sl.items.filter(item=>!removeNames.has(normalizeName(item.name)));

 // Posició: just després de MIX OREJA.
 const orejaIndex=sl.items.findIndex(item=>normalizeName(item.name)==="MIX OREJA");
 const insertAt=orejaIndex>=0?orejaIndex+1:sl.items.length;

 const additions=[
  {
   name:"MIX MECANO",
   children:[
    {name:"Chica Yeyé",bpm:165},
    {name:"Me colé en una fiesta",bpm:155},
    {name:"Maquillaje",bpm:128},
    {name:"Bailando",bpm:135}
   ]
  },
  {name:"EL SOL NO REGRESA",bpm:138},
  {name:"BOIG PER TU",bpm:98}
 ];

 sl.items.splice(insertAt,0,...additions);
 localStorage.setItem(MIGRATION_KEY,"done");
 save();
})();

function currentSetlist(){return groups[groupIndex].setlists[setlistIndex]}
function currentItems(){return currentSetlist().items}
function flatten(){flat=[];currentItems().forEach((g,gi)=>g.children?g.children.forEach((s,ci)=>flat.push({song:s,parent:g.name,gi,ci})):flat.push({song:g,parent:"",gi,ci:null}));if(current>=flat.length)current=0}
function bpmClass(v){return v<=120?"green":v<=145?"yellow":v<=165?"orange":"red"}
function setAccent(){const c=(groupIndex!==null&&groups[groupIndex])?groups[groupIndex].color:"#ffd34d";document.documentElement.style.setProperty("--accent",c)}
function esc(s){return String(s).replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
function updateEditModeBadge(){const b=$("editModeBadge");if(!b)return;b.textContent=editUnlocked?"🔓 Mode edició":"🔒 Mode lectura";b.classList.toggle("unlocked",editUnlocked);b.classList.toggle("locked",!editUnlocked)}
function closePasswordModal(){pendingEditAction=null;$("passwordModal").classList.remove("open");$("editPassword").value="";$("passwordError").classList.add("hidden")}
function requestEdit(action){if(editUnlocked){action();return}pendingEditAction=action;$("editPassword").value="";$("passwordError").classList.add("hidden");$("passwordModal").classList.add("open");setTimeout(()=>$("editPassword").focus(),40)}
function unlockEditing(){if($("editPassword").value===EDIT_PASSWORD){editUnlocked=true;updateEditModeBadge();const action=pendingEditAction;$("passwordModal").classList.remove("open");$("editPassword").value="";pendingEditAction=null;if(action)action()}else{$("passwordError").classList.remove("hidden");$("editPassword").select()}}

function showFatalStartupError(error){
 console.error("ClickSet startup error",error);
 $("splash")?.classList.add("hidden");
 const chooser=$("chooser");
 if(chooser){
  chooser.classList.remove("hidden");
  chooser.innerHTML=`<div class="chooserCard startupError"><h1>CLICKSET</h1><h2>No s'ha pogut iniciar</h2><p>Recarrega la pàgina. Si continua passant, pots restablir només les dades locals.</p><button class="primary" onclick="location.reload()">RECARREGAR</button><button class="secondary" id="resetClickSetData">RESTABLIR DADES LOCALS</button><pre>${String(error?.message||error||"Error desconegut")}</pre></div>`;
  document.getElementById("resetClickSetData")?.addEventListener("click",async()=>{
   try{
    localStorage.clear();
    if("caches" in window){for(const key of await caches.keys())await caches.delete(key)}
    if("indexedDB" in window)indexedDB.deleteDatabase(TRACK_DB_NAME)
   }finally{location.reload()}
  })
 }
}
setTimeout(()=>{try{$("splash")?.classList.add("hidden");showGroups()}catch(error){showFatalStartupError(error)}},700);
setTimeout(()=>$("splash")?.classList.add("hidden"),2200);

updateEditModeBadge();
function showGroups(){stop();groupIndex=null;setlistIndex=null;setAccent();$("app").classList.add("hidden");$("chooser").classList.remove("hidden");$("chooserBack").classList.add("hidden");$("newGroupBtn").classList.remove("hidden");$("importSetlistBtn").classList.add("hidden");$("homeBrand").classList.remove("hidden");$("chooserTitle").classList.add("hidden");$("chooserTitle").textContent="Grup musical";$("chooserSubtitle").textContent="Selecciona un grup";const grid=$("chooserGrid");grid.innerHTML="";if(!groups.length){grid.innerHTML=`<div class="emptyState"><div class="emptyIcon">🎵</div><h2>Benvingut a ClickSet</h2><p>Crea el teu primer grup o importa un repertori .clickset.</p><button class="primary" id="emptyCreateGroup">+ CREAR PRIMER GRUP</button></div>`;$("emptyCreateGroup").onclick=()=>requestEdit(()=>openGroupEditor(null));renderRecentSetlists();return}groups.forEach((g,i)=>{const c=document.createElement("div");c.className="card";c.style.setProperty("--card-color",g.color);c.innerHTML=`${g.logo?`<img class="cardLogo" src="${g.logo}" alt="">`:""}<h2>${esc(g.name)}</h2><small>${g.setlists.length} repertoris</small><div class="cardActions"><button class="smallBtn openGroup">OBRIR</button><button class="smallBtn editGroup">EDITAR</button></div>`;c.querySelector(".openGroup").onclick=e=>{e.stopPropagation();showSetlists(i)};c.querySelector(".editGroup").onclick=e=>{e.stopPropagation();requestEdit(()=>openGroupEditor(i))};c.onclick=()=>showSetlists(i);grid.appendChild(c)});renderRecentSetlists()}
function renderSetlists(gi){groupIndex=gi;setAccent();$("recentSection")?.classList.add("hidden");$("chooserBack").classList.remove("hidden");$("chooserBack").onclick=showGroups;$("newGroupBtn").classList.add("hidden");$("importSetlistBtn").classList.remove("hidden");$("homeBrand").classList.add("hidden");$("chooserTitle").classList.remove("hidden");$("chooserTitle").textContent=groups[gi].name;$("chooserSubtitle").textContent="Selecciona un repertori";const grid=$("chooserGrid");grid.innerHTML="";groups[gi].setlists.forEach((s,i)=>{const c=document.createElement("div");c.className="card";c.style.setProperty("--card-color",groups[gi].color);c.innerHTML=`<h3>${esc(s.name)}</h3><small>${countFlat(s.items)} parts · ${soundName(s.sound)}</small><div class="cardActions"><button class="smallBtn openSetlistBtn">OBRIR</button><button class="smallBtn exportSetlistBtn">📦 EXPORTAR</button><button class="smallBtn editSetlistBtn">EDITAR NOM</button></div>`;c.querySelector(".openSetlistBtn").onclick=e=>{e.stopPropagation();openSetlist(i)};c.querySelector(".exportSetlistBtn").onclick=e=>{e.stopPropagation();exportClickset(gi,i)};c.querySelector(".editSetlistBtn").onclick=e=>{e.stopPropagation();requestEdit(()=>openSetlistNameEditor(i))};c.onclick=()=>openSetlist(i);grid.appendChild(c)})}
function showSetlists(gi){const g=groups[gi];if(!g.logo){renderSetlists(gi);return}const intro=$("groupIntro"),img=$("groupIntroLogo"),name=$("groupIntroName");img.src=g.logo;name.textContent=g.name;intro.style.setProperty("--intro-color",g.color||"#ffd34d");intro.classList.remove("hidden","closing");requestAnimationFrame(()=>intro.classList.add("visible"));setTimeout(()=>{intro.classList.add("closing");setTimeout(()=>{intro.classList.add("hidden");intro.classList.remove("visible","closing");renderSetlists(gi)},260)},850)}
function countFlat(items){return items.reduce((n,i)=>n+(i.children?i.children.length:1),0)}
function openSetlistNameEditor(i){setlistEditIndex=i;$("setlistName").value=groups[groupIndex].setlists[i].name||"Repertori";$("setlistModal").classList.add("open");setTimeout(()=>$("setlistName").focus(),0)}
function closeSetlistNameEditor(){$("setlistModal").classList.remove("open");setlistEditIndex=null}
function openSetlist(si){setlistIndex=si;current=0;rememberRecentSetlist(groupIndex,si);$("chooser").classList.add("hidden");$("app").classList.remove("hidden");render()}
function renderSetlist(){const box=$("setlist");box.innerHTML="";let idx=0;currentItems().forEach((g,gi)=>{if(g.children){const start=idx,end=idx+g.children.length-1,inside=current>=start&&current<=end;if(inside){Object.keys(openMixes).forEach(k=>openMixes[k]=false);openMixes[gi]=true}const p=document.createElement("div");p.className="songItem parent"+(inside?" active":"");p.innerHTML=`<div>${openMixes[gi]?"▼":"▶"}</div><div>${esc(g.name)}</div><div></div>`;p.onclick=()=>{openMixes[gi]=!openMixes[gi];renderSetlist()};box.appendChild(p);if(openMixes[gi])g.children.forEach((s,ci)=>{const i=idx++;const e=document.createElement("div");e.className="songItem child"+(i===current?" active":"")+(i<current?" passed":"");e.innerHTML=`<div>${ci+1}</div><div>${esc(s.name)}</div><div>${s.bpm}</div>`;e.onclick=()=>jump(i);box.appendChild(e)});else idx+=g.children.length}else{const i=idx++;const e=document.createElement("div");e.className="songItem"+(i===current?" active":"")+(i<current?" passed":"");e.innerHTML=`<div>${gi+1}</div><div>${esc(g.name)}</div><div>${g.bpm}</div>`;e.onclick=()=>jump(i);box.appendChild(e)}});$("songCount").textContent=`${flat.length} parts`}
function renderConcertSetlist(){
 if(!$('concertSetlist')||groupIndex===null||setlistIndex===null)return;
 const box=$('concertSetlist');box.innerHTML='';
 $('concertSetlistName').textContent=currentSetlist().name;
 $('concertGroupName').textContent=groups[groupIndex].name;
 flat.forEach((entry,i)=>{
  const b=document.createElement('button');b.type='button';
  b.className='concertSetItem'+(i===current?' active':'')+(i<current?' passed':'');
  b.innerHTML=`<span class="state">${i<current?'✓':i===current?'▶':'○'}</span><span class="title">${esc(entry.song.name)}</span><span class="tempo">${entry.song.bpm}</span>`;
  b.onclick=()=>{if(i===current)return;jump(i)};
  box.appendChild(b)
 });
 requestAnimationFrame(()=>{const active=box.querySelector('.active');if(active)active.scrollIntoView({block:'center',behavior:'smooth'})})
}
function render(){flatten();if(!flat.length)return;const x=flat[current],n=flat[(current+1)%flat.length],accentOn=Boolean(x.song.accentFirst),activeSound=x.song.sound||currentSetlist().sound||"classic";$("parentLabel").textContent=x.parent;$("song").textContent=x.song.name;$("bpm").textContent=x.song.bpm;$("bpm").className="bpm "+bpmClass(x.song.bpm);$("position").textContent=`${current+1} / ${flat.length}`;$("nextup").textContent=`Després: ${n.song.name} · ${n.song.bpm} BPM`;if($("normalAccent")){$("normalAccent").textContent=`Accent: ${accentOn?"ON":"OFF"}`;$("normalAccent").classList.toggle("active",accentOn)}if($("normalSound"))$("normalSound").textContent=soundName(activeSound);const trackLabel=x.song.trackName?`🎵 ${x.song.trackName}`:"🎵 Carregar pista";if($("normalTrack")){ $("normalTrack").textContent=trackLabel; $("normalTrack").title=x.song.trackName?"Clica per substituir la pista":"Clica per carregar una pista"; }if($("concertTrack")){ $("concertTrack").textContent=trackLabel; $("concertTrack").title=x.song.trackName?"Clica per substituir la pista":"Clica per carregar una pista"; }renderBeatDots();if($("concertParent")){$("concertParent").textContent=x.parent;$("concertSong").textContent=x.song.name;$("concertBpm").textContent=x.song.bpm;$("concertBpm").className="concertBpm "+bpmClass(x.song.bpm);$("concertPosition").textContent=`${current+1} / ${flat.length}`;$("concertNext").textContent=`Després: ${n.song.name} · ${n.song.bpm} BPM`;$("concertMeter").textContent=x.song.meter||"4/4";$("concertAccent").textContent=`Accent: ${accentOn?"ON":"OFF"}`;$("concertAccent").classList.toggle("active",accentOn);$("concertSound").textContent=soundName(activeSound);renderConcertSetlist()}renderSetlist()}
function toggleCurrentAccent(){
 if(!flat.length)return;
 const song=flat[current].song;
 song.accentFirst=!song.accentFirst;
 save();
 if(playing){
  const keepCurrent=current;
  playing=false;cancelScheduledAudio();current=keepCurrent;
  start(true)
 }else{beatInBar=0}
 render()
}
function openQuickSoundMenu(){
 if(!flat.length)return;
 const grid=$("quickSoundGrid"),selected=effectiveSound();grid.innerHTML="";
 SOUNDS.forEach(sound=>{const b=document.createElement("button");b.type="button";b.className="quickSoundOption"+(sound.id===selected?" selected":"");b.innerHTML=`<span class="emoji">${sound.emoji}</span><span class="name">${sound.name}</span>`;b.onclick=async()=>{flat[current].song.sound=sound.id;save();$("quickSoundMenu").classList.add("hidden");render();if(!playing){await ensureAudio();scheduleSound(sound.id,audioCtx.currentTime+.015)}};grid.appendChild(b)});
 $("quickSoundMenu").classList.remove("hidden")
}
function closeQuickSoundMenu(){$("quickSoundMenu").classList.add("hidden")}
function cancelScheduledAudio(){
 runId++;clearTimeout(schedulerTimer);schedulerTimer=null;clearVisualBeatTimers();$("countdownOverlay")?.classList.add("hidden");trackLoadToken++;
 for(const n of activeNodes){try{n.stop(0)}catch(e){}}
 activeNodes.clear();trackSource=null;trackBuffer=null;trackGainNode=null;beatInBar=0;
}
async function switchSongTo(i){
 if(!flat.length)return;
 const wasPlaying=playing;
 if(wasPlaying){playing=false;cancelScheduledAudio()}
 current=(i+flat.length)%flat.length;render();
 if(wasPlaying)await start(true)
}
async function jump(i){await switchSongTo(i)}
async function change(d){if(!flat.length)return;await switchSongTo(current+d)}

function routeToPan(route,node){
 if(route==="L"){const p=audioCtx.createStereoPanner();p.pan.value=-1;node.connect(p).connect(audioCtx.destination);return}
 if(route==="R"){const p=audioCtx.createStereoPanner();p.pan.value=1;node.connect(p).connect(audioCtx.destination);return}
 node.connect(audioCtx.destination)
}
function configureStereoRouting(){
 if(!audioCtx)return;
 try{clickOutputNode?.disconnect()}catch(e){}
 try{trackOutputNode?.disconnect()}catch(e){}
 clickOutputNode=audioCtx.createGain();
 trackOutputNode=audioCtx.createGain();
 routeToPan(clickRoute,clickOutputNode);
 routeToPan(trackRoute,trackOutputNode);
 updateRoutingUi()
}
function clickDestination(){return clickOutputNode||audioCtx?.destination}
function trackDestination(){return trackOutputNode||audioCtx?.destination}
function updateRoutingUi(){
 const clickSel=$("clickRoute"),trackSel=$("trackRoute"),label=$("routingLabel");
 if(clickSel)clickSel.value=clickRoute;
 if(trackSel)trackSel.value=trackRoute;
 if(label){
   const nice=r=>r==="LR"?"L + R":`només ${r}`;
   label.textContent=`Metrònom: ${nice(clickRoute)} · Pista: ${nice(trackRoute)}`
 }
}
function setRoutes(c,t){
 clickRoute=c;trackRoute=t;
 localStorage.setItem(CLICK_ROUTE_KEY,clickRoute);
 localStorage.setItem(TRACK_ROUTE_KEY,trackRoute);
 if(audioCtx)configureStereoRouting(); else updateRoutingUi()
}
async function testPhysicalChannel(side){
 await ensureAudio();
 const pan=audioCtx.createStereoPanner(),gain=audioCtx.createGain(),osc=audioCtx.createOscillator();
 pan.pan.value=side==="L"?-1:1;
 gain.gain.setValueAtTime(.32,audioCtx.currentTime);
 gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.22);
 osc.type="sine";osc.frequency.value=side==="L"?660:880;
 osc.connect(gain).connect(pan).connect(audioCtx.destination);
 osc.start();osc.stop(audioCtx.currentTime+.23)
}
function createAudioContext(){
 if(audioCtx)return audioCtx;
 const AudioContextClass=window.AudioContext||window.webkitAudioContext;
 if(!AudioContextClass)throw new Error("Aquest navegador no admet Web Audio");
 // Safari/iOS antics poden fallar si es passen opcions al constructor.
 try{audioCtx=new AudioContextClass({latencyHint:"interactive"})}catch(e){audioCtx=new AudioContextClass()}
 configureStereoRouting();
 return audioCtx
}
function unlockAudioNow(){
 try{
  const ctx=createAudioContext();
  if(ctx.state!=="running")ctx.resume().catch(()=>{});
  // So silenciós immediat dins el gest de l'usuari: desbloqueja Safari/iPhone/iPad.
  const buffer=ctx.createBuffer(1,1,22050),source=ctx.createBufferSource(),gain=ctx.createGain();
  gain.gain.value=0;source.buffer=buffer;source.connect(gain).connect(ctx.destination);source.start(0)
 }catch(e){console.warn("No s'ha pogut desbloquejar l'àudio",e)}
}
function loadSampleBuffers(){
 if(sampleLoading||!audioCtx)return sampleLoading;
 const jobs=[];
 Object.entries(SAMPLE_FILES).forEach(([id,files])=>Object.entries(files).forEach(([kind,file])=>{
  const key=`${id}:${kind}`;if(sampleBuffers[key])return;
  jobs.push(fetch(`./${file}?v=12`,{cache:"force-cache"}).then(r=>{if(!r.ok)throw new Error(`${file}: ${r.status}`);return r.arrayBuffer()}).then(data=>audioCtx.decodeAudioData(data)).then(buffer=>{sampleBuffers[key]=buffer}).catch(e=>console.warn("Sample",file,e)))
 }));
 sampleLoading=Promise.all(jobs).finally(()=>{sampleLoading=null});return sampleLoading
}
function loadClassicBuffer(){
 if(classicBuffer||classicLoading||!audioCtx)return classicLoading;
 classicLoading=fetch("./click.wav?v=0195",{cache:"no-store"})
  .then(r=>{if(!r.ok)throw new Error(`click.wav: ${r.status}`);return r.arrayBuffer()})
  .then(data=>audioCtx.decodeAudioData(data))
  .then(buffer=>{classicBuffer=buffer;return buffer})
  .catch(e=>{console.warn("No s'ha carregat ClickSet Original; s'usarà Studio Click",e);classicBuffer=null;return null})
  .finally(()=>{classicLoading=null});
 return classicLoading
}
async function ensureAudio(){
 const ctx=createAudioContext();
 if(ctx.state!=="running"){
  try{await ctx.resume()}catch(e){console.warn("AudioContext resume",e)}
 }
 // La reproducció no espera els fitxers: es precarguen en segon pla.
 loadClassicBuffer();loadSampleBuffers();
 return ctx
}

function openTrackDb(){
 if(trackDbPromise)return trackDbPromise;
 trackDbPromise=new Promise((resolve,reject)=>{
  if(!("indexedDB" in window)){reject(new Error("IndexedDB no disponible"));return}
  const request=indexedDB.open(TRACK_DB_NAME,TRACK_DB_VERSION);
  request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(TRACK_STORE))db.createObjectStore(TRACK_STORE)};
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||new Error("No s'ha pogut obrir IndexedDB"))
 });
 return trackDbPromise
}
async function putTrack(id,file){
 const db=await openTrackDb();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(TRACK_STORE,"readwrite");
  tx.objectStore(TRACK_STORE).put(file,id);
  tx.oncomplete=()=>resolve(id);
  tx.onerror=()=>reject(tx.error||new Error("No s'ha pogut guardar la pista"))
 })
}
async function getTrack(id){
 const db=await openTrackDb();
 return new Promise((resolve,reject)=>{
  const request=db.transaction(TRACK_STORE,"readonly").objectStore(TRACK_STORE).get(id);
  request.onsuccess=()=>resolve(request.result||null);
  request.onerror=()=>reject(request.error||new Error("No s'ha pogut llegir la pista"))
 })
}
async function deleteTrack(id){
 if(!id)return;
 const db=await openTrackDb();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(TRACK_STORE,"readwrite");
  tx.objectStore(TRACK_STORE).delete(id);
  tx.oncomplete=()=>resolve();
  tx.onerror=()=>reject(tx.error||new Error("No s'ha pogut eliminar la pista"))
 })
}
function makeTrackId(){return `track_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}
function openQuickTrackPicker(){
 if(!flat.length)return;
 const input=$("quickTrackInput");
 if(!input)return;
 input.value="";
 // Safari/iPhone/iPad: showPicker dins el mateix gest físic és més fiable.
 try{
  if(typeof input.showPicker==="function") input.showPicker();
  else input.click();
 }catch(e){
  try{input.click()}catch(err){console.warn("No s'ha pogut obrir el selector d'àudio",err)}
 }
}
async function handleQuickTrackFile(file){
 if(!file||!flat.length)return;
 const song=flat[current].song;
 const oldId=song.trackId||"";
 const id=makeTrackId();
 try{
  await putTrack(id,file);
  song.trackId=id;song.trackName=file.name;song.trackVolume=song.trackVolume??.85;
  song.countInBars=song.countInBars??1;song.trackOriginalBpm=song.trackOriginalBpm||song.bpm||120;
  if(oldId)deleteTrack(oldId).catch(()=>{});
  save();render();
 }catch(error){console.error(error);alert("No s’ha pogut guardar la pista d’àudio.")}
}
async function loadCurrentTrackBuffer(){
 const song=flat[current]?.song;
 if(!song?.trackId){trackBuffer=null;return null}
 const token=++trackLoadToken;
 const file=await getTrack(song.trackId);
 if(token!==trackLoadToken||!file){trackBuffer=null;return null}
 const bytes=file instanceof Blob?await file.arrayBuffer():file;
 const decoded=await audioCtx.decodeAudioData(bytes.slice?bytes.slice(0):bytes);
 if(token!==trackLoadToken)return null;
 trackBuffer=decoded;
 return decoded
}

function track(node){activeNodes.add(node);node.onended=()=>activeNodes.delete(node);return node}
function noiseBuffer(duration=.04){const len=Math.max(1,Math.floor(audioCtx.sampleRate*duration)),b=audioCtx.createBuffer(1,len,audioCtx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);return b}
function tone(freq,type,time,duration,level,destination=clickDestination()){
 const osc=track(audioCtx.createOscillator()),gain=audioCtx.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,time);gain.gain.setValueAtTime(Math.max(.0001,level),time);gain.gain.exponentialRampToValueAtTime(.001,time+duration);osc.connect(gain).connect(destination);osc.start(time);osc.stop(time+duration);return {osc,gain}
}
function playBuffer(buffer,time,level=1){
 if(!buffer)return false;
 const src=track(audioCtx.createBufferSource()),gain=audioCtx.createGain();src.buffer=buffer;
 gain.gain.setValueAtTime(Math.max(.0001,Math.min(1.15,level*appVolume)),time);
 src.connect(gain).connect(clickDestination());src.start(time);return true
}
function scheduleSound(type,time,volume=1,accented=false){
 const level=Math.max(0,Math.min(1.15,volume));
 const sampled=sampleBuffers[`${type}:${accented?"accent":"normal"}`]||sampleBuffers[`${type}:normal`];
 if(sampled&&playBuffer(sampled,time,level))return;
 if(type==="classic"&&classicBuffer){playBuffer(classicBuffer,time,level);return}
 // Fallbacks immediats mentre els WAV es carreguen.
 if(type==="classic")type="studio";
 if(type==="cowbell"){tone(accented?1250:980,"square",time,.055,level*.72);tone(accented?830:650,"triangle",time,.08,level*.38);return}
 if(type==="clave"){tone(accented?2850:2350,"sine",time,.035,level*.9);tone(accented?3700:3100,"sine",time,.024,level*.35);return}
 if(type==="rim"){const src=track(audioCtx.createBufferSource()),hp=audioCtx.createBiquadFilter(),gain=audioCtx.createGain();src.buffer=noiseBuffer(.014);hp.type="highpass";hp.frequency.value=accented?3100:2500;gain.gain.setValueAtTime(level*appVolume,time);gain.gain.exponentialRampToValueAtTime(.001,time+.035);src.connect(hp).connect(gain).connect(clickDestination());src.start(time);return}
 if(type==="clap"){const src=track(audioCtx.createBufferSource()),bp=audioCtx.createBiquadFilter(),gain=audioCtx.createGain();src.buffer=noiseBuffer(accented?.05:.04);bp.type="bandpass";bp.frequency.value=accented?1900:1500;bp.Q.value=.8;gain.gain.setValueAtTime(level*appVolume,time);gain.gain.exponentialRampToValueAtTime(.001,time+.08);src.connect(bp).connect(gain).connect(clickDestination());src.start(time);return}
 if(type==="wood"){const src=track(audioCtx.createBufferSource()),filter=audioCtx.createBiquadFilter(),gain=audioCtx.createGain();src.buffer=noiseBuffer(.028);filter.type="bandpass";filter.frequency.value=1120;filter.Q.value=5.5;gain.gain.setValueAtTime(level*appVolume,time);gain.gain.exponentialRampToValueAtTime(.001,time+.055);src.connect(filter).connect(gain).connect(clickDestination());src.start(time);return}
 tone(accented?2400:1850,"triangle",time,.045,level*.9);tone(accented?1200:950,"sine",time,.055,level*.35)
}
function effectiveSound(){const s=flat[current]?.song;return s?.sound||currentSetlist()?.sound||"classic"}
function effectiveAccentSound(){const s=flat[current]?.song,sl=currentSetlist();return s?.accentSound||sl?.accentSound||effectiveSound()}
function scheduleBeatSound(time,accented=false){
 scheduleSound(accented?effectiveAccentSound():effectiveSound(),time,1,accented);
}
function pulseAt(time,myRun,beatIndex=0,accented=false){const delay=Math.max(0,(time-audioCtx.currentTime)*1000);visualBeatTimers.push(setTimeout(()=>{if(!playing||myRun!==runId)return;lightBeat(beatIndex,accented);$("pulse").classList.add("on");if($("concertPulse"))$("concertPulse").classList.add("on");visualBeatTimers.push(setTimeout(()=>{$("pulse").classList.remove("on");if($("concertPulse"))$("concertPulse").classList.remove("on")},70))},delay))}
function scheduler(myRun){
 if(!playing||myRun!==runId)return;
 const song=flat[current].song,sec=60/Math.max(20,Math.min(400,Number(song.bpm)||120));
 while(nextBeatTime<audioCtx.currentTime+.045){
  const accented=Boolean(song.accentFirst)&&beatInBar===0;
  const beatIndex=beatInBar;
  scheduleBeatSound(nextBeatTime,accented);
  pulseAt(nextBeatTime,myRun,beatIndex,accented);
  const beatsPerBar=Math.max(1,parseInt(String(song.meter||"4/4").split("/")[0],10)||4);
  beatInBar=(beatInBar+1)%beatsPerBar;
  nextBeatTime+=sec
 }
 schedulerTimer=setTimeout(()=>scheduler(myRun),10)
}
async function start(immediateFirstBeat=true){
 if(playing||!flat.length)return;
 await ensureAudio();
 const song=flat[current].song;
 playing=true;runId++;const myRun=runId;beatInBar=0;trackBuffer=null;clearVisualBeatTimers();
 const sec=60/Math.max(20,Math.min(400,Number(song.bpm)||120));
 const beatsPerBar=beatsForSong(song);
 const countInBars=Math.max(0,Math.min(2,Number(song.countInBars??1)));
 const pressTime=audioCtx.currentTime+(immediateFirstBeat?.004:.018);
 let firstBeatTime=pressTime;
 if(countdownEnabled){
  const labels=["3","2","1"];
  labels.forEach((label,i)=>{const t=pressTime+i*sec;scheduleBeatSound(t,i===0);pulseAt(t,myRun,i%beatsPerBar,i===0);showCountdownLabel(label,t,myRun)});
  firstBeatTime=pressTime+3*sec;
  showCountdownLabel("GO",firstBeatTime,myRun);
 }
 const accented=Boolean(song.accentFirst);
 scheduleBeatSound(firstBeatTime,accented);
 pulseAt(firstBeatTime,myRun,0,accented);
 beatInBar=1%beatsPerBar;
 nextBeatTime=firstBeatTime+sec;
 $("play").textContent="■ STOP";$("play").classList.add("stop");
 if($("concertPlay")){ $("concertPlay").textContent="■ STOP";$("concertPlay").classList.add("stop") }
 scheduler(myRun);
 if(song.trackId){
  try{
   const buffer=await loadCurrentTrackBuffer();
   if(!buffer||!playing||myRun!==runId||flat[current]?.song!==song)return;
   trackSource=track(audioCtx.createBufferSource());trackGainNode=audioCtx.createGain();trackSource.buffer=buffer;
   trackGainNode.gain.setValueAtTime(Math.max(0,Math.min(1,Number(song.trackVolume??0.85))),audioCtx.currentTime);
   const originalBpm=Math.max(20,Math.min(400,Number(song.trackOriginalBpm||song.bpm)||song.bpm));
   trackSource.playbackRate.setValueAtTime(song.timeStretch?Math.max(.5,Math.min(2,(Number(song.bpm)||120)/originalBpm)):1,audioCtx.currentTime);
   trackSource.connect(trackGainNode).connect(trackDestination());
   const planned=firstBeatTime+(countInBars*beatsPerBar*sec);
   const trackStart=Math.max(audioCtx.currentTime+.01,planned);
   trackSource.start(trackStart);
   trackSource.onended=()=>{activeNodes.delete(trackSource);trackSource=null}
  }catch(e){console.warn("No s’ha pogut carregar la pista",e)}
 }
}
function stop(){playing=false;cancelScheduledAudio();$("play").textContent="▶ PLAY";$("play").classList.remove("stop");if($("concertPlay")){ $("concertPlay").textContent="▶ PLAY";$("concertPlay").classList.remove("stop");$("concertPulse").classList.remove("on") }$("pulse").classList.remove("on");lightBeat(-1)}
async function restart(){stop();await start(true)}
async function playPreviewSample(type){
 await ensureAudio();const t=audioCtx.currentTime+.02;scheduleSound(type,t,1,true);scheduleSound(type,t+.22);scheduleSound(type,t+.44);
 if(previewButton){previewButton.classList.remove("previewing");void previewButton.offsetWidth;previewButton.classList.add("previewing");setTimeout(()=>previewButton&&previewButton.classList.remove("previewing"),520)}
}
async function previewSound(type,button=null){previewType=type;previewButton=button;await playPreviewSample(type);startRepeatingPreview(type)}
function stopRepeatingPreview(){clearInterval(previewInterval);previewInterval=null;previewType=null;if(previewButton)previewButton.classList.remove("previewing");previewButton=null}
function startRepeatingPreview(type){clearInterval(previewInterval);previewInterval=null;if(!previewRepeat)return;previewInterval=setInterval(async()=>{if(!$("editor").classList.contains("open")||previewType!==type||!previewRepeat){clearInterval(previewInterval);previewInterval=null;return}await playPreviewSample(type)},3000)}
function soundName(id){const x=SOUNDS.find(s=>s.id===id);return x?`${x.emoji} ${x.name}`:"So del repertori"}
function soundPicker(selected,onSelect,allowDefault=false){
 const wrap=document.createElement('div');wrap.className='soundGrid';
 const choices=allowDefault?[{id:'',emoji:'↩️',name:'So del repertori',inherit:true},...SOUNDS]:SOUNDS;
 choices.forEach(sound=>{const b=document.createElement('button');b.type='button';b.className='soundChoice'+(sound.id===selected?' selected':'')+(sound.inherit?' inherit':'');b.innerHTML=`<span class="emoji">${sound.emoji}</span><span class="soundLabel">${sound.name}${sound.recommended?' (recomanat)':''}</span>`;b.onclick=()=>{wrap.querySelectorAll('.soundChoice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');onSelect(sound.id);if(sound.id)previewSound(sound.id,b);else stopRepeatingPreview()};wrap.appendChild(b)});return wrap
}


function safeFileName(name){return String(name||"repertori").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9_-]+/gi,"_").replace(/^_+|_+$/g,"")||"repertori"}
function blobToDataUrl(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(blob)})}
function dataUrlToBlob(dataUrl){const [head,data]=String(dataUrl).split(",");const mime=(head.match(/data:([^;]+)/)||[])[1]||"application/octet-stream";const bin=atob(data),bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return new Blob([bytes],{type:mime})}
async function exportClickset(gi,si){
 const group=groups[gi],setlist=group?.setlists?.[si];if(!group||!setlist)return;
 const copy=clone(setlist),tracks={};const songs=[];for(const item of copy.items||[])songs.push(...(item.children||[item]));
 for(const song of songs){if(!song.trackId)continue;try{const file=await getTrack(song.trackId);if(file){tracks[song.trackId]={name:song.trackName||file.name||"pista",type:file.type||"audio/*",data:await blobToDataUrl(file)}}}catch(e){console.warn("Pista no exportada",song.trackName,e)}}
 const pack={format:"clickset",formatVersion:1,exportedAt:new Date().toISOString(),appVersion:VERSION,group:{name:group.name,color:group.color,logo:group.logo||""},setlist:copy,tracks};
 const blob=new Blob([JSON.stringify(pack)],{type:"application/x-clickset+json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`${safeFileName(group.name)}_${safeFileName(setlist.name)}.clickset`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
async function importClicksetFile(file){
 try{const pack=JSON.parse(await file.text());if(pack?.format!=="clickset"||!pack.setlist)throw new Error("Format no vàlid");
  let gi=groupIndex;
  if(gi===null){const target=String(pack.group?.name||"Grup importat");gi=groups.findIndex(g=>g.name===target);if(gi<0){groups.push({name:target,color:pack.group?.color||"#ffd34d",logo:pack.group?.logo||"",setlists:[]});gi=groups.length-1}}
  const sl=normalize([{name:"tmp",setlists:[pack.setlist]}])[0].setlists[0];
  const songs=[];for(const item of sl.items||[])songs.push(...(item.children||[item]));
  for(const song of songs){const tr=pack.tracks?.[song.trackId];if(tr?.data){const newId=makeTrackId();await putTrack(newId,new File([dataUrlToBlob(tr.data)],tr.name||"pista",{type:tr.type||"audio/*"}));song.trackId=newId;song.trackName=tr.name||song.trackName}else if(song.trackId){song.trackId="";song.trackName=""}}
  groups[gi].setlists.push(sl);save();alert(`Repertori “${sl.name}” importat correctament.`);groupIndex=gi;renderSetlists(gi)
 }catch(e){console.error(e);alert("Aquest fitxer no és un repertori .clickset vàlid o està danyat.")}
}

let importSongs=[];
function setImportStatus(text,type=""){const el=$("importStatus");el.textContent=text;el.className="importStatus"+(type?" "+type:"")}
function loadScriptOnce(src,globalName){return new Promise((resolve,reject)=>{if(globalName&&window[globalName])return resolve(window[globalName]);const old=[...document.scripts].find(s=>s.src===src);if(old){old.addEventListener("load",()=>resolve(globalName?window[globalName]:true),{once:true});old.addEventListener("error",reject,{once:true});return}const sc=document.createElement("script");sc.src=src;sc.onload=()=>resolve(globalName?window[globalName]:true);sc.onerror=()=>reject(new Error("No s'ha pogut carregar el lector"));document.head.appendChild(sc)})}
function cleanImportedLine(line){return line.replace(/^\s*(?:[-•●▪︎*]|\d{1,3}[.)-])\s*/,"").replace(/\s+/g," ").trim()}
function parseImportedSongs(text){const out=[];for(const raw of String(text||"").split(/\r?\n/)){let line=cleanImportedLine(raw);if(!line||line.length<2)continue;if(/^(repertori|setlist|llista|horari|hora|prova de so|obertura|inici concert)\b/i.test(line))continue;let bpm=120;let m=line.match(/(?:[-–—:]\s*)?(\d{2,3})\s*(?:bpm)?\s*$/i);if(m){const n=Number(m[1]);if(n>=30&&n<=300){bpm=n;line=line.slice(0,m.index).replace(/[-–—:|]+\s*$/,"").trim()}}line=line.replace(/\s*\bBPM\b.*$/i,"").trim();if(line&&line.length>1&&!/^\d+$/.test(line))out.push({name:line,bpm})}const seen=new Set();return out.filter(x=>{const k=x.name.toLowerCase();if(seen.has(k))return false;seen.add(k);return true})}
function refreshImportPreview(){importSongs=parseImportedSongs($("importText").value);$("importCount").textContent=`${importSongs.length} cançons`;const box=$("importPreview");box.innerHTML="";importSongs.forEach((s,i)=>{const r=document.createElement("div");r.className="importPreviewRow";r.innerHTML=`<span>${i+1}</span><span>${esc(s.name)}</span><span>${s.bpm} BPM</span>`;box.appendChild(r)})}
function openImportModal(){if(groupIndex===null)return;$("importSetlistName").value=`Repertori ${new Date().getFullYear()}`;$("importText").value="";importSongs=[];refreshImportPreview();setImportStatus("Cap fitxer seleccionat.");$("cameraInput").value="";$("imageInput").value="";$("fileInput").value="";$("importModal").classList.add("open")}
function closeImportModal(){$("importModal").classList.remove("open")}
async function recognizeImage(file){setImportStatus("Preparant lector OCR…","working");await loadScriptOnce("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js","Tesseract");setImportStatus("Llegint la imatge… pot tardar uns segons.","working");const result=await Tesseract.recognize(file,"spa+cat+eng",{logger:m=>{if(m.status==="recognizing text")setImportStatus(`Llegint la imatge… ${Math.round((m.progress||0)*100)}%`,"working")}});return result.data.text||""}
async function extractPdf(file){setImportStatus("Preparant lector PDF…","working");await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs");if(!window.pdfjsLib){await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","pdfjsLib")}if(window.pdfjsLib?.GlobalWorkerOptions)window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";const data=await file.arrayBuffer();const pdf=await window.pdfjsLib.getDocument({data}).promise;let text="";for(let i=1;i<=pdf.numPages;i++){setImportStatus(`Llegint PDF… pàgina ${i} de ${pdf.numPages}`,"working");const page=await pdf.getPage(i);const tc=await page.getTextContent();text+=tc.items.map(x=>x.str).join(" ")+"\n"}if(text.trim().length>20)return text;setImportStatus("El PDF és una imatge. Aplicant OCR…","working");await loadScriptOnce("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js","Tesseract");for(let i=1;i<=Math.min(pdf.numPages,20);i++){const page=await pdf.getPage(i);const viewport=page.getViewport({scale:1.8});const canvas=document.createElement("canvas");canvas.width=viewport.width;canvas.height=viewport.height;await page.render({canvasContext:canvas.getContext("2d"),viewport}).promise;const r=await Tesseract.recognize(canvas,"spa+cat+eng");text+=(r.data.text||"")+"\n"}return text}
async function handleImportFile(file){if(!file)return;try{let text="";if(file.type.startsWith("image/"))text=await recognizeImage(file);else if(file.type==="application/pdf"||/\.pdf$/i.test(file.name))text=await extractPdf(file);else{text=await file.text();if(/\.json$/i.test(file.name)){try{const j=JSON.parse(text);if(Array.isArray(j))text=j.map(x=>typeof x==="string"?x:`${x.name||x.title||""}${x.bpm?" - "+x.bpm:""}`).join("\n")}catch(e){}}}$("importText").value=text.trim();refreshImportPreview();setImportStatus(`Lectura acabada: ${importSongs.length} cançons detectades. Revisa-les abans de crear.`,"ok")}catch(err){console.error(err);setImportStatus("No s'ha pogut llegir el fitxer. Pots copiar o escriure el text manualment.","error")}}
function moveSong(list,from,to){
 if(to<0||to>=list.length||from===to)return;
 const [item]=list.splice(from,1);list.splice(to,0,item)
}
function renderEditorItems(sl){
 const box=$('editorContent');box.innerHTML='';let dragInfo=null;
 sl.items.forEach((g,gi)=>{
  const grp=document.createElement('div');grp.className='editorGroup';
  const arr=g.children||[g];
  grp.innerHTML=`<div class="editorGroupTitle"><strong>${esc(g.name)}</strong>${g.children?'<small class="note">Pots ordenar les parts dins aquest mix</small>':''}</div>`;
  arr.forEach((song,si)=>{
   const list=g.children||sl.items;
   const listIndex=g.children?si:gi;
   const row=document.createElement('div');row.className='editorRow';row.draggable=true;
   row.innerHTML=`<span class="dragHandle" title="Arrossega per reordenar">☰</span><input class="songName" value="${esc(song.name)}"><button class="bpmEditBtn">${song.bpm}</button><button type="button" class="soundBtn">${soundName(song.sound||'')}</button><label class="accentToggle"><input class="accentFirst" type="checkbox" ${song.accentFirst?'checked':''}> Accentuar 1r temps</label><div class="trackEditor"><label class="trackFileLabel">🎵 ${song.trackName?esc(song.trackName):'Afegir MP3/WAV'}<input class="trackFile" type="file" accept="audio/mpeg,audio/wav,audio/x-wav,audio/mp4,audio/aac"></label><label>Volum pista <input class="trackVolume" type="range" min="0" max="100" value="${Math.round((song.trackVolume??0.85)*100)}"></label><label>Compte enrere <select class="countInBars"><option value="0" ${Number(song.countInBars??1)===0?'selected':''}>0 compassos</option><option value="1" ${Number(song.countInBars??1)===1?'selected':''}>1 compàs</option><option value="2" ${Number(song.countInBars??1)===2?'selected':''}>2 compassos</option></select></label><label>BPM original pista <input class="trackOriginalBpm" type="number" min="20" max="400" inputmode="numeric" value="${Number(song.trackOriginalBpm||song.bpm||120)}"></label><label class="timeStretchToggle"><input class="timeStretch" type="checkbox" ${song.timeStretch?'checked':''}> Time-stretch</label><small class="stretchHint">${song.timeStretch?'Adapta la pista al BPM actual. Pot variar lleugerament el to.':'Pista a velocitat original.'}</small><button type="button" class="removeTrackBtn ${song.trackId?'':'hidden'}">Eliminar pista</button><small class="trackHint">${song.trackId?'La pista començarà sincronitzada després del compte enrere.':'Sense pista associada.'}</small></div><div class="songActions"><button type="button" class="moveBtn moveUp" title="Pujar cançó" aria-label="Pujar cançó">▲</button><button type="button" class="moveBtn moveDown" title="Baixar cançó" aria-label="Baixar cançó">▼</button><button type="button" class="deleteSongBtn" title="Eliminar cançó" aria-label="Eliminar cançó">🗑️</button></div><div class="songSoundPicker hidden"></div>`;
   row.querySelector('.songName').oninput=e=>song.name=e.target.value;row.querySelector('.accentFirst').onchange=e=>song.accentFirst=e.target.checked;
   const trackInput=row.querySelector('.trackFile'),trackLabel=row.querySelector('.trackFileLabel'),removeTrackBtn=row.querySelector('.removeTrackBtn'),trackHint=row.querySelector('.trackHint');
   row.querySelector('.trackVolume').oninput=e=>song.trackVolume=Number(e.target.value)/100;
   row.querySelector('.countInBars').onchange=e=>song.countInBars=Number(e.target.value);
   const originalBpmInput=row.querySelector('.trackOriginalBpm'),stretchToggle=row.querySelector('.timeStretch'),stretchHint=row.querySelector('.stretchHint');
   originalBpmInput.oninput=e=>song.trackOriginalBpm=Math.max(20,Math.min(400,Number(e.target.value)||Number(song.bpm)||120));
   stretchToggle.onchange=e=>{song.timeStretch=e.target.checked;stretchHint.textContent=song.timeStretch?'Adapta la pista al BPM actual. Pot variar lleugerament el to.':'Pista a velocitat original.'};
   trackInput.onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size>150*1024*1024){alert('La pista és massa gran. Màxim recomanat: 150 MB.');trackInput.value='';return}try{if(song.trackId)await deleteTrack(song.trackId);const id=makeTrackId();await putTrack(id,file);song.trackId=id;song.trackName=file.name;song.trackVolume=song.trackVolume??0.85;song.countInBars=song.countInBars??1;song.trackOriginalBpm=song.trackOriginalBpm||song.bpm;song.timeStretch=Boolean(song.timeStretch);trackLabel.childNodes[0].nodeValue=`🎵 ${file.name}`;removeTrackBtn.classList.remove('hidden');trackHint.textContent='Pista guardada al dispositiu i disponible offline.'}catch(err){console.error(err);alert('No s’ha pogut guardar la pista en aquest dispositiu.')}};
   removeTrackBtn.onclick=async()=>{if(!song.trackId)return;if(!confirm(`Eliminar la pista “${song.trackName||''}” d’aquesta cançó?`))return;await deleteTrack(song.trackId);delete song.trackId;delete song.trackName;removeTrackBtn.classList.add('hidden');trackLabel.childNodes[0].nodeValue='🎵 Afegir MP3/WAV';trackHint.textContent='Sense pista associada.'};
   row.querySelector('.bpmEditBtn').onclick=()=>openBpmEditor(song,row.querySelector('.bpmEditBtn'));
   const soundButton=row.querySelector('.soundBtn'),pickerBox=row.querySelector('.songSoundPicker');
   soundButton.onclick=()=>{pickerBox.classList.toggle('hidden');if(!pickerBox.childNodes.length)pickerBox.appendChild(soundPicker(song.sound||'',id=>{song.sound=id;soundButton.textContent=soundName(id)},true))};
   row.querySelector('.moveUp').disabled=listIndex===0;
   row.querySelector('.moveDown').disabled=listIndex===list.length-1;
   row.querySelector('.moveUp').onclick=()=>{moveSong(list,listIndex,listIndex-1);renderEditorItems(sl)};
   row.querySelector('.moveDown').onclick=()=>{moveSong(list,listIndex,listIndex+1);renderEditorItems(sl)};
   row.querySelector('.deleteSongBtn').onclick=()=>{
    if(!confirm(`Eliminar la cançó “${song.name}” del repertori?`))return;
    list.splice(listIndex,1);
    if(g.children&&g.children.length===0)sl.items.splice(gi,1);
    renderEditorItems(sl)
   };
   row.addEventListener('dragstart',e=>{dragInfo={list,index:listIndex};row.classList.add('dragging');e.dataTransfer.effectAllowed='move'});
   row.addEventListener('dragend',()=>{row.classList.remove('dragging');dragInfo=null});
   row.addEventListener('dragover',e=>{if(dragInfo&&dragInfo.list===list){e.preventDefault();e.dataTransfer.dropEffect='move';row.classList.add('dragOver')}});
   row.addEventListener('dragleave',()=>row.classList.remove('dragOver'));
   row.addEventListener('drop',e=>{row.classList.remove('dragOver');if(!dragInfo||dragInfo.list!==list)return;e.preventDefault();moveSong(list,dragInfo.index,listIndex);dragInfo=null;renderEditorItems(sl)});
   grp.appendChild(row)
  });
  box.appendChild(grp)
 })
}
function renderEditor(){editingGroups=clone(groups);const sl=editingGroups[groupIndex].setlists[setlistIndex];$('editorSubtitle').textContent=`${editingGroups[groupIndex].name} · ${sl.name}`;
 $('repeatPreview').checked=previewRepeat;$('repeatPreview').onchange=e=>{previewRepeat=e.target.checked;if(previewType){if(previewRepeat)startRepeatingPreview(previewType);else{clearInterval(previewInterval);previewInterval=null}}};
 updateRoutingUi();
 if($('clickRoute'))$('clickRoute').onchange=e=>setRoutes(e.target.value,trackRoute);
 if($('trackRoute'))$('trackRoute').onchange=e=>setRoutes(clickRoute,e.target.value);
 if($('presetSplit'))$('presetSplit').onclick=()=>setRoutes('L','R');
 if($('presetBoth'))$('presetBoth').onclick=()=>setRoutes('LR','LR');
 if($('presetSwap'))$('presetSwap').onclick=()=>setRoutes(clickRoute==='L'?'R':clickRoute==='R'?'L':'LR',trackRoute==='L'?'R':trackRoute==='R'?'L':'LR');
 if($('testLeftChannel'))$('testLeftChannel').onclick=()=>testPhysicalChannel('L');
 if($('testRightChannel'))$('testRightChannel').onclick=()=>testPhysicalChannel('R');
 $('countdownEnabled').checked=countdownEnabled;$('countdownEnabled').onchange=e=>{countdownEnabled=e.target.checked;localStorage.setItem(COUNTDOWN_KEY,String(countdownEnabled))};$('appVolume').value=Math.round(appVolume*100);$('volumeValue').textContent=`${Math.round(appVolume*100)}%`;$('appVolume').oninput=e=>{appVolume=Number(e.target.value)/100;$('volumeValue').textContent=`${e.target.value}%`;localStorage.setItem('clickset_app_volume',String(appVolume));if(previewType)playPreviewSample(previewType)};
 const rep=$('repertoireSoundPicker');rep.innerHTML='';rep.appendChild(soundPicker(sl.sound||'wood',id=>sl.sound=id));
 const accentRep=$('repertoireAccentSoundPicker');if(accentRep){accentRep.innerHTML='';const choices=[{id:'',emoji:'✨',name:'Automàtic'},...SOUNDS];const wrap=document.createElement('div');wrap.className='soundGrid';choices.forEach(sound=>{const b=document.createElement('button');b.type='button';b.className='soundChoice'+(sound.id===(sl.accentSound||'')?' selected':'');b.innerHTML=`<span class="emoji">${sound.emoji}</span><span class="soundLabel">${sound.name}</span>`;b.onclick=()=>{sl.accentSound=sound.id;save();renderEditor();if(sound.id)previewSound(sound.id,b)};wrap.appendChild(b)});accentRep.appendChild(wrap)}
 if($('addSongBtn'))$('addSongBtn').onclick=addSongToCurrentEditor;
 renderEditorItems(sl)
}

function addSongToCurrentEditor(){
 const sl=editingGroups?.[groupIndex]?.setlists?.[setlistIndex];
 if(!sl)return;
 const rawName=prompt("Nom de la cançó:");
 if(rawName===null)return;
 const name=rawName.trim();
 if(!name){alert("Has d’escriure un nom per a la cançó.");return}
 const rawBpm=prompt(`BPM de “${name}”:`, "120");
 if(rawBpm===null)return;
 const bpm=Math.max(20,Math.min(400,parseInt(rawBpm,10)||120));
 sl.items.push({
  name,
  bpm,
  meter:"4/4",
  accentFirst:false,
  countInBars:1,
  trackVolume:0.85
 });
 renderEditorItems(sl);
 const rows=$("editorContent")?.querySelectorAll(".editorRow");
 rows?.[rows.length-1]?.scrollIntoView({behavior:"smooth",block:"center"});
}

function openBpmEditor(song,button){bpmTarget={song,button};bpmDraft=String(song.bpm||120);bpmTypingFresh=true;tapTimes=[];updateKeyDisplay();$("bpmModalTitle").textContent=`BPM · ${song.name}`;$("bpmModal").classList.add("open")}
function updateKeyDisplay(){let n=Math.max(20,Math.min(400,Number(bpmDraft)||0));$("keyDisplay").textContent=bpmDraft||"0";return n}
function enterBpmDigit(v){
 if(bpmTypingFresh){bpmDraft="";bpmTypingFresh=false}
 if(bpmDraft.length<3)bpmDraft+=v;
 updateKeyDisplay()
}
document.querySelectorAll("[data-num]").forEach(b=>b.onclick=()=>{const v=b.dataset.num;if(v==="clear"){bpmDraft="";bpmTypingFresh=false}else if(v==="back"){if(bpmTypingFresh){bpmDraft="";bpmTypingFresh=false}else bpmDraft=bpmDraft.slice(0,-1)}else enterBpmDigit(v);updateKeyDisplay()});
document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{bpmDraft=String(Math.max(20,Math.min(400,(Number(bpmDraft)||120)+Number(b.dataset.step))));bpmTypingFresh=true;updateKeyDisplay()});
$("tapTempo").onclick=()=>{const now=performance.now();tapTimes.push(now);tapTimes=tapTimes.filter(t=>now-t<3000).slice(-8);if(tapTimes.length>=2){const intervals=tapTimes.slice(1).map((t,i)=>t-tapTimes[i]);bpmDraft=String(Math.round(60000/(intervals.reduce((a,b)=>a+b,0)/intervals.length)));updateKeyDisplay()}};
$("cancelBpm").onclick=()=>$("bpmModal").classList.remove("open");$("saveBpm").onclick=()=>{const n=updateKeyDisplay();bpmTarget.song.bpm=n;bpmTarget.button.textContent=n;$("bpmModal").classList.remove("open")};
$("bpmModal").addEventListener("keydown",e=>{
 if(!$("bpmModal").classList.contains("open"))return;
 if(/^\d$/.test(e.key)){e.preventDefault();enterBpmDigit(e.key)}
 else if(e.key==="Backspace"){e.preventDefault();if(bpmTypingFresh){bpmDraft="";bpmTypingFresh=false}else bpmDraft=bpmDraft.slice(0,-1);updateKeyDisplay()}
 else if(e.key==="Enter"){e.preventDefault();$("saveBpm").click()}
 else if(e.key==="Escape"){e.preventDefault();$("cancelBpm").click()}
});

function adjustCurrentBpm(delta){
 if(!flat.length)return;
 const song=flat[current].song;
 song.bpm=Math.max(20,Math.min(400,(Number(song.bpm)||120)+Number(delta)));
 save();
 if(playing){
  runId++;clearTimeout(schedulerTimer);
  const sec=60/song.bpm;
  nextBeatTime=Math.max(audioCtx.currentTime+.006,Math.min(nextBeatTime,audioCtx.currentTime+sec));
  scheduler(runId)
 }
 render()
}
document.querySelectorAll("[data-live-bpm]").forEach(button=>{
 button.addEventListener("click",()=>adjustCurrentBpm(Number(button.dataset.liveBpm)))
});

function openGroupEditor(i){groupEditIndex=i;const isNew=i===null,g=isNew?{name:"Nou grup",color:"#ffd34d",logo:"",setlists:[{name:"Setlist principal",sound:"wood",items:[]}]}:groups[i];groupLogoDraft=g.logo||"";$("groupModalTitle").textContent=isNew?"Crear grup":"Editar grup";$("groupName").value=g.name;$("groupColor").value=g.color;$("logoPreview").src=groupLogoDraft||"cover.png";$("deleteGroup").classList.toggle("hidden",isNew);$("groupLogo").value="";$("groupModal").classList.add("open")}
$("groupLogo").onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>2_500_000){alert("El logo és massa gran. Prova una imatge de menys de 2,5 MB.");return}const r=new FileReader();r.onload=()=>{groupLogoDraft=r.result;$("logoPreview").src=groupLogoDraft};r.readAsDataURL(f)};
$("cancelGroup").onclick=()=>$("groupModal").classList.remove("open");$("saveGroup").onclick=()=>{const name=$("groupName").value.trim()||"Grup";const data={name,color:$("groupColor").value,logo:groupLogoDraft};if(groupEditIndex===null)groups.push({...data,setlists:[{name:"Setlist principal",sound:"wood",items:[]}]});else Object.assign(groups[groupEditIndex],data);save();$("groupModal").classList.remove("open");showGroups()};$("deleteGroup").onclick=()=>{if(groupEditIndex===null)return;if(confirm(`Eliminar el grup “${groups[groupEditIndex].name}” i tots els seus repertoris?`)){groups.splice(groupEditIndex,1);save();$("groupModal").classList.remove("open");showGroups()}};
$("cancelSetlistName").onclick=closeSetlistNameEditor;$("saveSetlistName").onclick=()=>{if(setlistEditIndex===null)return;const name=$("setlistName").value.trim()||"Repertori";groups[groupIndex].setlists[setlistEditIndex].name=name;save();closeSetlistNameEditor();renderSetlists(groupIndex)};$("setlistName").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("saveSetlistName").click()}else if(e.key==="Escape")closeSetlistNameEditor()});
function openConcertMode(){$("concertMode").classList.remove("hidden");render()}function closeConcertMode(){$("concertMode").classList.add("hidden")}$("concertModeBtn").onclick=openConcertMode;$("closeConcertMode").onclick=closeConcertMode;$("concertPrev").onclick=()=>change(-1);$("concertNextBtn").onclick=()=>change(1);$("concertPlay").onclick=()=>playing?stop():start(true);

$("importClicksetBtn").onclick=()=>{$("clicksetImportInput").value="";try{$("clicksetImportInput").showPicker?.()||$("clicksetImportInput").click()}catch(e){$("clicksetImportInput").click()}};$("clicksetImportInput").onchange=e=>{const file=e.target.files?.[0];if(file)importClicksetFile(file)};
$("importSetlistBtn").onclick=()=>requestEdit(openImportModal);$("cancelImport").onclick=closeImportModal;$("cameraInput").onchange=e=>handleImportFile(e.target.files[0]);$("imageInput").onchange=e=>handleImportFile(e.target.files[0]);$("fileInput").onchange=e=>handleImportFile(e.target.files[0]);$("importText").addEventListener("input",refreshImportPreview);$("createImportedSetlist").onclick=()=>{refreshImportPreview();if(!importSongs.length){alert("No s'ha detectat cap cançó. Revisa el text.");return}const name=$("importSetlistName").value.trim()||"Repertori importat";groups[groupIndex].setlists.push({name,sound:"classic",items:importSongs.map(s=>({name:s.name,bpm:s.bpm}))});save();closeImportModal();renderSetlists(groupIndex)};
$("newGroupBtn").onclick=()=>requestEdit(()=>openGroupEditor(null));$("homeBtn").onclick=()=>{closeConcertMode();stopRepeatingPreview();showGroups()};$("prev").onclick=()=>change(-1);$("next").onclick=()=>change(1);$("play").onclick=async()=>{try{playing?stop():await start(true)}catch(error){console.error(error);alert("No s’ha pogut iniciar el metrònom. Recarrega la pàgina i torna-ho a provar.")}};$("editBtn").onclick=()=>requestEdit(()=>{stop();renderEditor();$("editor").classList.add("open")});$("closeEditor").onclick=()=>{stopRepeatingPreview();groups=editingGroups;save();$("editor").classList.remove("open");render()};
$("submitPassword").onclick=unlockEditing;$("cancelPassword").onclick=closePasswordModal;$("editModeBadge").onclick=()=>{if(editUnlocked){editUnlocked=false;updateEditModeBadge()}else requestEdit(()=>{})};$("editPassword").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();unlockEditing()}else if(e.key==="Escape")closePasswordModal()});
$("themeToggle").onclick=toggleTheme;
$("normalAccent").onclick=toggleCurrentAccent;
$("concertAccent").onclick=toggleCurrentAccent;
$("normalSound").onclick=openQuickSoundMenu;
$("concertSound").onclick=openQuickSoundMenu;
$("normalTrack").onclick=openQuickTrackPicker;
$("concertTrack").onclick=openQuickTrackPicker;
$("quickTrackInput").onchange=async e=>{
 const file=e.target.files?.[0];
 if(!file)return;
 await handleQuickTrackFile(file);
 e.target.value="";
};
$("closeQuickSound").onclick=closeQuickSoundMenu;
$("quickSoundMenu").onclick=e=>{if(e.target===$("quickSoundMenu"))closeQuickSoundMenu()};
// Safari mòbil exigeix inicialitzar l'àudio exactament durant un gest físic.
["pointerdown","touchstart","mousedown"].forEach(eventName=>document.addEventListener(eventName,unlockAudioNow,{capture:true,passive:true,once:false}));
document.addEventListener("keydown",e=>{const appVisible=!$("app").classList.contains("hidden");const modalOpen=$("bpmModal").classList.contains("open")||$("groupModal").classList.contains("open")||$("setlistModal").classList.contains("open")||$("passwordModal").classList.contains("open")||$("importModal").classList.contains("open")||$("editor").classList.contains("open");const target=e.target instanceof Element?e.target:null;if(!appVisible||modalOpen||(target&&target.matches("input,select,textarea,[contenteditable='true']")))return;if((e.code==="Space"||e.key===" "||e.key.toLowerCase()==="r")&&e.repeat)return;if(e.key==="ArrowLeft"){e.preventDefault();change(-1)}else if(e.key==="ArrowRight"){e.preventDefault();change(1)}else if(e.code==="Space"||e.key===" "){e.preventDefault();playing?stop():start(true)}else if(e.key.toLowerCase()==="r"){e.preventDefault();restart()}},true);
document.addEventListener("visibilitychange",()=>{if(document.hidden&&playing)stop()});
if("serviceWorker" in navigator)window.addEventListener("load",async()=>{try{const registration=await navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"});await registration.update()}catch(error){console.warn("Service worker",error)}});
