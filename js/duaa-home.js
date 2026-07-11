const reminderDialog = document.getElementById("reminderDialog");
const openReminderButton = document.getElementById("openReminderButton");
const editReminderButton = document.getElementById("editReminderButton");
const pauseReminderButton = document.getElementById("pauseReminderButton");
const saveReminderButton = document.getElementById("saveReminderButton");
const reminderTimeInput = document.getElementById("reminderTimeInput");
const reminderSummary = document.getElementById("reminderSummary");
const reminderTime = document.getElementById("reminderTime");
const reminderDays = document.getElementById("reminderDays");

function formatTime(value){
  const [hour,minute]=value.split(":").map(Number);
  const date=new Date();
  date.setHours(hour,minute);
  return new Intl.DateTimeFormat([], {hour:"numeric",minute:"2-digit"}).format(date);
}

function getSavedReminder(){
  return JSON.parse(localStorage.getItem("duaaDailyReminder") || "null");
}

function renderReminder(){
  const saved=getSavedReminder();

  if(!saved){
    reminderSummary.hidden=true;
    openReminderButton.hidden=false;
    return;
  }

  reminderSummary.hidden=false;
  openReminderButton.hidden=true;
  reminderTime.textContent=saved.paused ? `${formatTime(saved.time)} · Paused` : formatTime(saved.time);
  reminderDays.textContent=saved.days.length===7 ? "Every day" : saved.days.join(", ");
  pauseReminderButton.textContent=saved.paused ? "Resume" : "Pause";
  reminderTimeInput.value=saved.time;

  document.querySelectorAll('#reminderForm input[type="checkbox"]').forEach(box=>{
    box.checked=saved.days.includes(box.value);
  });
}

function openReminder(){
  reminderDialog.showModal();
}

openReminderButton?.addEventListener("click",openReminder);
editReminderButton?.addEventListener("click",openReminder);

pauseReminderButton?.addEventListener("click",()=>{
  const saved=getSavedReminder();
  if(!saved) return;
  saved.paused=!saved.paused;
  localStorage.setItem("duaaDailyReminder",JSON.stringify(saved));
  renderReminder();
});

saveReminderButton?.addEventListener("click",event=>{
  event.preventDefault();

  const days=[...document.querySelectorAll('#reminderForm input[type="checkbox"]:checked')]
    .map(box=>box.value);

  if(!days.length){
    alert("Choose at least one day.");
    return;
  }

  const previous=getSavedReminder();

  localStorage.setItem("duaaDailyReminder",JSON.stringify({
    time:reminderTimeInput.value,
    days,
    paused:previous?.paused ?? false
  }));

  reminderDialog.close();
  renderReminder();
});

renderReminder();
