(() => {
  "use strict";
  const readingState=window.RAMADAN_STATE.read();
  const fastRecord=window.RAMADAN_FAST_RECORD;
  const currentFastDay=fastRecord.todayRamadanDay();
  const day=Math.max(1,Math.min(30,currentFastDay && currentFastDay<=30 ? currentFastDay : (readingState.currentDay||1)));

  function longGregorian(date){ return new Intl.DateTimeFormat([], {weekday:"long",month:"long",day:"numeric",year:"numeric"}).format(date); }
  function shortGregorian(date){ return new Intl.DateTimeFormat([], {month:"short",day:"numeric"}).format(date); }
  function dateInputToday(){ return fastRecord.toInputDate(new Date()); }
  function renderOrientation(){
    const state=fastRecord.read();
    const heading=document.getElementById("ramadanDayHeading");
    const hijri=document.getElementById("hijriDate");
    const gregorian=document.getElementById("gregorianDate");
    const current=fastRecord.todayRamadanDay();
    if(!state.firstFastDay){ heading.textContent="Set your First Fast Day"; hijri.textContent="Ramadan day and Hijri date will appear here."; gregorian.textContent=longGregorian(new Date()); return; }
    if(current && current>=1 && current<=30){ heading.textContent=`Ramadan Day ${current}`; hijri.textContent=`${current} Ramadan ${state.hijriYear||""} AH`.replace("  "," "); gregorian.textContent=longGregorian(new Date()); }
    else if(current<1){ heading.textContent="Ramadan is approaching"; hijri.textContent=`First Fast Day: 1 Ramadan ${state.hijriYear||""} AH`.replace("  "," "); gregorian.textContent=longGregorian(fastRecord.dayDate(1)); }
    else { heading.textContent=`Ramadan ${state.hijriYear||""} Fast Record`.trim(); hijri.textContent="Your Ramadan Fast Record remains available after Ramadan."; gregorian.textContent=longGregorian(new Date()); }
  }
  function renderReadings(){
    const data=window.RAMADAN_JOURNEY_DATA.getDay(day); const summary=window.RAMADAN_STATE.daySummary(day); const next=window.RAMADAN_STATE.nextPortion(day);
    document.getElementById("dayTitle").textContent=`Ramadan Day ${day} · Juz ${data.juz}`;
    document.getElementById("daySummary").textContent=`${summary.completed} of 5 prayer portions completed`;
    document.getElementById("dayProgress").style.width=`${summary.completed*20}%`;
    const continueButton=document.getElementById("continueButton"); continueButton.href=`ramadan-reader.html?day=${day}&portion=${next.id}`; continueButton.textContent=summary.completed?(summary.isComplete?"Review Day":"Continue Reading"):"Begin Reading";
    document.getElementById("portionList").innerHTML=data.portions.map(portion=>{ const saved=window.RAMADAN_STATE.getPortion(day,portion.id); const status=saved.completed?"✓ Complete":saved.lastVerse?"Continue →":"Start →"; return `<a class="portion-row ${saved.completed?"complete":""}" href="ramadan-reader.html?day=${day}&portion=${portion.id}"><strong>${portion.prayer}</strong><span class="portion-range">${portion.range}</span><span class="portion-status">${status}</span></a>`; }).join("");
  }
  function renderCalendar(){
    const state=fastRecord.read(); const container=document.getElementById("fastCalendar"); const first=fastRecord.parseLocalDate(state.firstFastDay); const today=fastRecord.todayRamadanDay();
    const weekdays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let html=weekdays.map(day=>`<div class="calendar-weekday">${day}</div>`).join("");
    const blanks=first?first.getDay():0; for(let i=0;i<blanks;i++) html+='<div class="calendar-blank" aria-hidden="true"></div>';
    for(let ramadanDay=1;ramadanDay<=30;ramadanDay++){
      const record=fastRecord.getDay(ramadanDay); const def=fastRecord.statusDefinitions.find(item=>item.id===record.status); const date=fastRecord.dayDate(ramadanDay); const isToday=today===ramadanDay;
      html+=`<button type="button" class="fast-day ${record.status?"recorded":""} ${isToday?"today":""}" data-fast-day="${ramadanDay}" aria-label="Ramadan Day ${ramadanDay}${def?`, ${def.label}`:""}"><span class="ramadan-number">${ramadanDay}</span><span class="gregorian-cell-date">${date?shortGregorian(date):"Set date"}</span><span class="fast-status-icon" aria-hidden="true">${def?def.icon:""}</span><span class="fast-status-label">${def?def.label:(isToday?"Today":"Not recorded")}</span>${record.notes?'<span class="has-note" title="This day has a note">•</span>':""}</button>`;
    }
    container.innerHTML=html;
    container.querySelectorAll("[data-fast-day]").forEach(button=>button.addEventListener("click",()=>openFastDay(Number(button.dataset.fastDay))));
    document.getElementById("fastRecordHelper").textContent=state.firstFastDay?`First Fast Day: ${longGregorian(first)}. Tap any day to record its status or add a note.`:"Set the First Fast Day in Ramadan Settings to place Gregorian dates on the record.";
  }
  function renderMakeups(){
    const state=fastRecord.read(); const remaining=fastRecord.remainingMakeups(); document.getElementById("makeupCount").textContent=remaining; document.getElementById("makeupMessage").textContent=remaining?`${remaining} day${remaining===1?"":"s"} still need to be made up.`:"No make-up fasts are currently outstanding.";
    const history=document.getElementById("makeupHistory"); history.innerHTML=state.makeups.length?`<h3>Recorded make-up fasts</h3>${state.makeups.map(item=>`<div class="makeup-entry"><div><strong>${longGregorian(fastRecord.parseLocalDate(item.date))}</strong>${item.notes?`<span>${item.notes}</span>`:""}</div><button type="button" data-remove-makeup="${item.id}" aria-label="Remove make-up fast">Remove</button></div>`).join("")}`:"";
    history.querySelectorAll("[data-remove-makeup]").forEach(button=>button.addEventListener("click",()=>{ if(confirm("Remove this recorded make-up fast?")){ fastRecord.removeMakeup(button.dataset.removeMakeup); renderMakeups(); } }));
  }
  const settingsDialog=document.getElementById("ramadanSettingsDialog");
  document.getElementById("openRamadanSettings").addEventListener("click",()=>{ const state=fastRecord.read(); document.getElementById("firstFastDay").value=state.firstFastDay; document.getElementById("showMenstruation").checked=state.showMenstruation; settingsDialog.showModal(); });
  document.getElementById("ramadanSettingsForm").addEventListener("submit",event=>{ event.preventDefault(); fastRecord.saveSettings(document.getElementById("firstFastDay").value,document.getElementById("showMenstruation").checked); settingsDialog.close(); renderAll(); });

  const fastDayDialog=document.getElementById("fastDayDialog"); let activeDay=null;
  function openFastDay(ramadanDay){
    activeDay=ramadanDay; const state=fastRecord.read(); const record=fastRecord.getDay(ramadanDay); const date=fastRecord.dayDate(ramadanDay);
    document.getElementById("fastDayTitle").textContent=`Ramadan Day ${ramadanDay}`; document.getElementById("fastDayDate").textContent=`${ramadanDay} Ramadan ${state.hijriYear||""} AH${date?` · ${longGregorian(date)}`:""}`;
    document.getElementById("statusOptions").innerHTML='<legend>Fasting status</legend>'+fastRecord.statusDefinitions.filter(item=>!item.optional||state.showMenstruation).map(item=>`<label class="status-option"><input type="radio" name="fastStatus" value="${item.id}" ${record.status===item.id?"checked":""}><span class="status-symbol">${item.icon}</span><span>${item.label}</span>${item.makeup?'<small>Counts toward make-up fasts</small>':""}</label>`).join("");
    document.getElementById("fastDayNotes").value=record.notes||""; fastDayDialog.showModal();
  }
  document.getElementById("fastDayForm").addEventListener("submit",event=>{ event.preventDefault(); const selected=document.querySelector('input[name="fastStatus"]:checked'); fastRecord.saveDay(activeDay,selected?selected.value:"",document.getElementById("fastDayNotes").value); fastDayDialog.close(); renderCalendar(); renderMakeups(); });
  document.getElementById("clearFastDay").addEventListener("click",()=>{ if(activeDay&&confirm(`Clear Ramadan Day ${activeDay}?`)){ fastRecord.clearDay(activeDay); fastDayDialog.close(); renderCalendar(); renderMakeups(); } });

  const makeupDialog=document.getElementById("makeupDialog");
  document.getElementById("recordMakeupFast").addEventListener("click",()=>{ document.getElementById("makeupDate").value=dateInputToday(); document.getElementById("makeupNotes").value=""; makeupDialog.showModal(); });
  document.getElementById("makeupForm").addEventListener("submit",event=>{ event.preventDefault(); fastRecord.addMakeup(document.getElementById("makeupDate").value,document.getElementById("makeupNotes").value); makeupDialog.close(); renderMakeups(); });
  document.querySelectorAll("[data-close-dialog]").forEach(button=>button.addEventListener("click",()=>button.closest("dialog").close()));
  document.querySelectorAll(".dialog-close").forEach(button=>button.addEventListener("click",event=>{ event.preventDefault(); button.closest("dialog").close(); }));
  document.querySelectorAll("[data-coming-soon]").forEach(button=>button.addEventListener("click",()=>{ document.getElementById("ramadanFeatureMessage").textContent=`${button.dataset.comingSoon} is planned for a future Ramadan Central update.`; }));
  function renderAll(){ renderOrientation(); renderReadings(); renderCalendar(); renderMakeups(); }
  renderAll();
})();
