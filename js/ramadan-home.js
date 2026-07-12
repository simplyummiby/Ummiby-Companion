(() => {
  const state=window.RAMADAN_STATE.read();
  const day=Math.max(1,Math.min(30,state.currentDay||1));
  const data=window.RAMADAN_JOURNEY_DATA.getDay(day);
  const summary=window.RAMADAN_STATE.daySummary(day);
  const next=window.RAMADAN_STATE.nextPortion(day);
  document.getElementById('dayTitle').textContent=`Ramadan Day ${day} · Juz ${data.juz}`;
  document.getElementById('daySummary').textContent=`${summary.completed} of 5 prayer portions completed`;
  document.getElementById('dayProgress').style.width=`${summary.completed*20}%`;
  const continueButton=document.getElementById('continueButton');
  continueButton.href=`ramadan-reader.html?day=${day}&portion=${next.id}`;
  continueButton.textContent=summary.completed ? (summary.isComplete?'Review Day':'Continue Reading') : 'Begin Reading';
  document.getElementById('portionList').innerHTML=data.portions.map(portion=>{
    const saved=window.RAMADAN_STATE.getPortion(day,portion.id);
    const status=saved.completed?'✓ Complete':saved.lastVerse?'Continue →':'Start →';
    return `<a class="portion-row ${saved.completed?'complete':''}" href="ramadan-reader.html?day=${day}&portion=${portion.id}"><strong>${portion.prayer}</strong><span class="portion-range">${portion.range}</span><span class="portion-status">${status}</span></a>`;
  }).join('');
  const completeDays=window.RAMADAN_STATE.completedDays();
  document.getElementById('completedDays').textContent=`${completeDays} of 30`;
  document.getElementById('currentDayStat').textContent=`Day ${day}`;
  document.getElementById('journeyProgress').style.width=`${completeDays/30*100}%`;
  document.querySelectorAll('[data-coming-soon]').forEach(link=>{
    link.addEventListener('click',event=>{
      event.preventDefault();
      const feature=link.dataset.comingSoon;
      document.getElementById('ramadanFeatureMessage').textContent=`${feature} is planned for a future Ramadan Central update.`;
    });
  });
})();
