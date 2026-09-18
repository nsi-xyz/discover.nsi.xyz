const THEMES = ["flat","material","skeuo","neu","glass","brutal","minimal","maximal","typo"];
const LABELS = {flat:"Flat Design",material:"Material Design",skeuo:"Skeuomorphisme",neu:"Neumorphisme",glass:"Glassmorphisme",brutal:"Brutalisme",minimal:"Minimalisme",maximal:"Maximalisme",typo:"Typographique"};
const root = document.documentElement;
const label = document.getElementById("themeLabel");
const foot = document.getElementById("footTheme");
const toast = document.getElementById("toast");
const buttons = [...document.querySelectorAll("[data-set-theme]")];
let toastT;

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(()=>toast.classList.remove("show"), 2200);
}
function setTheme(name, announce=true){
  if(!THEMES.includes(name)) return;
  const prev = root.dataset.theme;
  root.dataset.theme = name;
  try{ localStorage.setItem("nsi-theme", name); }catch(e){}
  const i = THEMES.indexOf(name);
  buttons.forEach(b=>b.setAttribute("aria-selected", b.dataset.setTheme===name ? "true":"false"));
  label.textContent = `${LABELS[name]} — ${i+1}/9`;
  if(foot) foot.textContent = LABELS[name];
  const url = new URL(location.href);
  url.searchParams.set("theme", name);
  history.replaceState(null,"",url);
  if(announce && prev!==name){
    // micro-transition: fade content
    document.body.animate([{opacity:.35},{opacity:1}],{duration:350,easing:"ease-out"});
    showToast(`Esthétique : ${LABELS[name]}`);
  }
}
buttons.forEach(b=>b.addEventListener("click",()=>setTheme(b.dataset.setTheme)));
document.getElementById("nextTheme").addEventListener("click",()=>{
  setTheme(THEMES[(THEMES.indexOf(root.dataset.theme)+1)%THEMES.length]);
});
document.getElementById("prevTheme").addEventListener("click",()=>{
  setTheme(THEMES[(THEMES.indexOf(root.dataset.theme)+THEMES.length-1)%THEMES.length]);
});
document.getElementById("shuffle").addEventListener("click",()=>{
  let n; do{ n = THEMES[Math.floor(Math.random()*THEMES.length)]; }while(n===root.dataset.theme);
  setTheme(n);
});
document.addEventListener("keydown",e=>{
  const n = parseInt(e.key,10);
  if(n>=1&&n<=9 && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) setTheme(THEMES[n-1]);
  if(e.key==="ArrowRight"&&e.altKey) document.getElementById("nextTheme").click();
});
const burger = document.getElementById("burger");
const nav = document.querySelector(".nav");
burger.addEventListener("click",()=>{
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
// init: URL > localStorage > défaut glass
(function init(){
  const q = new URLSearchParams(location.search).get("theme");
  let saved = null;
  try{ saved = localStorage.getItem("nsi-theme"); }catch(e){}
  setTheme(THEMES.includes(q)?q:(THEMES.includes(saved)?saved:"glass"), false);
  label.textContent = `${LABELS[root.dataset.theme]} — ${THEMES.indexOf(root.dataset.theme)+1}/9`;
  if(foot) foot.textContent = LABELS[root.dataset.theme];
  buttons.forEach(b=>b.setAttribute("aria-selected", b.dataset.setTheme===root.dataset.theme?"true":"false"));
})();
