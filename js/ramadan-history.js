(() => {
  "use strict";
  const fast=window.RAMADAN_FAST_RECORD;
  const list=document.getElementById("historyList");
  const fmt=value=>value?new Intl.DateTimeFormat([], {month:"long",day:"numeric",year:"numeric"}).format(fast.parseLocalDate(value)):"First Fast Day not set";
  function summary(record){
    const counts={}; Object.values(record.days||{}).forEach(d=>{ if(d.status) counts[d.status]=(counts[d.status]||0)+1; });
    return {fasted:counts.fasted||0,missed:fast.requiredMakeups(record),remaining:fast.remainingMakeups(record)};
  }
  function render(){
    const all=fast.readAll(); const records=fast.records();
    list.innerHTML=records.map(record=>{ const s=summary(record); const active=record.id===all.activeRecordId; return `<article class="history-record ${active?"current":""}"><div class="history-record-main"><span class="history-record-icon" data-ui-icon="calendar" aria-hidden="true"></span><div><p class="history-label">${active?"Current Ramadan":"Past Ramadan"}</p><h3>Ramadan ${record.hijriYear||"Record"}${record.hijriYear?" AH":""}</h3><p>${fmt(record.firstFastDay)}</p></div></div><div class="history-stats"><span><strong>${s.fasted}</strong> fasted</span><span><strong>${s.missed}</strong> make-up required</span><span><strong>${s.remaining}</strong> remaining</span></div>${active?'<span class="current-pill">Current</span>':`<button class="text-action" type="button" data-open-record="${record.id}">Open Record</button>`}</article>`; }).join("");
    list.querySelectorAll('[data-open-record]').forEach(b=>b.addEventListener('click',()=>{ fast.setActiveRecord(b.dataset.openRecord); location.href='ramadan-journey.html'; }));
    if(window.UMMIBY_ICONS) window.UMMIBY_ICONS.render?.();
  }
  const dialog=document.getElementById('newRamadanDialog');
  document.getElementById('openNewRamadan').addEventListener('click',()=>{ document.getElementById('newFirstFastDay').value=''; document.getElementById('newShowMenstruation').checked=fast.read().showMenstruation; dialog.showModal(); });
  document.getElementById('newRamadanForm').addEventListener('submit',e=>{ e.preventDefault(); fast.beginNewRamadan(document.getElementById('newFirstFastDay').value,document.getElementById('newShowMenstruation').checked); dialog.close(); location.href='ramadan-journey.html'; });
  document.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
  document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();b.closest('dialog').close();}));
  render();
})();
