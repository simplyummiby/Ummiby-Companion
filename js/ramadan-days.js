(() => {
 const current=window.RAMADAN_STATE.read().currentDay||1;
 document.getElementById('ramadanDays').innerHTML=window.RAMADAN_JOURNEY_DATA.days.map(day=>{
   const summary=window.RAMADAN_STATE.daySummary(day.day);
   const next=window.RAMADAN_STATE.nextPortion(day.day);
   return `<a class="day-link ${day.day===current?'current':''} ${summary.isComplete?'complete':''}" href="ramadan-reader.html?day=${day.day}&portion=${next.id}"><strong>Day ${day.day}</strong><small>Juz ${day.juz}</small><small>${summary.isComplete?'✓ Complete':`${summary.completed} of 5`}</small></a>`;
 }).join('');
})();
