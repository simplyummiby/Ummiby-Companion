const STORAGE_KEY = "ummibyMorningProgress";
const cards = [...document.querySelectorAll(".duaa-card")];
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const progressBar = document.getElementById("progressBar");
const progressMessage = document.getElementById("progressMessage");
const completionPanel = document.getElementById("completionPanel");
const resetProgressButton = document.getElementById("resetProgressButton");
const resetDialog = document.getElementById("resetDialog");
const confirmResetButton = document.getElementById("confirmResetButton");

function todayKey(){
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
}

function readState(){
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  if(stored.date !== todayKey()) return {date:todayKey(),completed:[]};
  return stored;
}

function saveState(state){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}

function render(){
  const state = readState();
  const completed = new Set(state.completed);

  cards.forEach(card=>{
    const id = card.dataset.duaaId;
    const checked = completed.has(id);
    const button = card.querySelector(".check-button");
    card.classList.toggle("completed",checked);
    button.setAttribute("aria-pressed",String(checked));
  });

  const count = completed.size;
  const total = cards.length;
  const percent = total ? Math.round((count/total)*100) : 0;

  totalCount.textContent = total;
  completedCount.textContent = count;
  progressBar.style.width = `${percent}%`;
  completionPanel.hidden = count !== total;

  if(count === 0) progressMessage.textContent = "Begin wherever you are ready.";
  else if(count < total) progressMessage.textContent = "Continue gently when you are ready.";
  else progressMessage.textContent = "Collection complete for today.";
}

cards.forEach(card=>{
  card.querySelector(".check-button").addEventListener("click",()=>{
    const state = readState();
    const completed = new Set(state.completed);
    const id = card.dataset.duaaId;

    if(completed.has(id)) completed.delete(id);
    else completed.add(id);

    saveState({date:todayKey(),completed:[...completed]});
    render();
  });
});

resetProgressButton?.addEventListener("click",()=>resetDialog.showModal());

confirmResetButton?.addEventListener("click",()=>{
  localStorage.removeItem(STORAGE_KEY);
  render();
});

render();
