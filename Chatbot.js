// Chatbot with simple intent detection + calendar link
const aiFab = document.getElementById('aiFab');
const aiPanel = document.getElementById('aiPanel');
const aiClose = document.getElementById('aiClose');
const aiBody = document.getElementById('aiBody');
const aiForm = document.getElementById('aiForm');
const aiText = document.getElementById('aiText');
const CALENDAR_LINK = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3rWvNCTg1hHspz7UBH-oTiNbycH9UVI2s2F0N_la6v9X8CSXRky4GhK98iD0y_UOkqcSIB7kVn";

function addMsg(role, text, link){
  const row = document.createElement('div');
  row.className = 'msg ' + role;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  if(link){
    const a = document.createElement('a');
    a.href = link; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = text;
    bubble.appendChild(a);
  }else{
    bubble.textContent = text;
  }
  row.appendChild(bubble);
  aiBody.appendChild(row);
  aiBody.scrollTop = aiBody.scrollHeight;
}
function botSay(t, link){ addMsg('bot', t, link); }
function userSay(t){ addMsg('user', t); }
function typing(show=true){
  let t = document.querySelector('.typing');
  if(show){ if(!t){ t = document.createElement('div'); t.className='typing'; t.textContent='Assistent tippt…'; aiBody.appendChild(t); } }
  else{ if(t){ t.remove(); } }
  aiBody.scrollTop = aiBody.scrollHeight;
}

function handleIntent(q){
  const t = q.toLowerCase();
  if(/termin|meeting|call|beratung|kalender|slot/.test(t)){ return {reply:'Hier geht’s zu unserem Kalender – wähle deinen Termin:', link: CALENDAR_LINK}; }
  if(/preis|kosten|gebühr|invest/.test(t)){ return {reply:'Das Coaching startet ab 25.000 €. Im Erstgespräch klären wir dein passendes Paket.'}; }
  if(/programm|inhalt|ablauf|modul/.test(t)){ return {reply:'Kurzüberblick: Positionierung • Funnel & Creatives • KPI‑Dashboard • Closing • Wochen‑Sprints'}; }
  return {reply:'Wie kann ich helfen? Schreib z. B.: „Ich möchte einen Termin“, „Was kostet das?“ oder „Was sind die Inhalte?“'};
}

aiFab.addEventListener('click', ()=>{
  aiPanel.classList.add('open');
  aiPanel.setAttribute('aria-hidden','false');
  if(!aiBody.dataset.greet){ botSay('Hallo! Ich bin der JLVision Assistant. Wie kann ich dir helfen?'); aiBody.dataset.greet='1'; }
});
aiClose.addEventListener('click', ()=>{ aiPanel.classList.remove('open'); aiPanel.setAttribute('aria-hidden','true'); });
aiForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = aiText.value.trim();
  if(!q) return;
  userSay(q);
  aiText.value='';
  typing(true);
  setTimeout(()=>{ typing(false); const r = handleIntent(q); if(r.link) botSay(r.reply, r.link); else botSay(r.reply); }, 500);
});
