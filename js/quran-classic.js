(function(){
 const data=window.QURAN_DATA||[];
 const tracker=window.QURAN_CLASSIC;
 const state=tracker.read();
 const pos=state.position;
 const surah=data[pos.surah-1]||data[0];
 const $=id=>document.getElementById(id);
 const overall=tracker.overallPercent(pos.surah,pos.ayah);
 $('classic-location').textContent=`${surah.name} · Ayah ${pos.ayah}`;
 $('classic-progress').textContent=pos.surah===1&&pos.ayah===1&&!state.startedAt?'Ready to begin your cover-to-cover reading.':`${state.completedSurahs.length} of 114 surahs completed.`;
 $('classic-overall-fill').style.width=`${overall}%`;
 $('classic-overall-label').textContent=`${overall.toFixed(overall<10?1:0)}% through the Qur’an`;
 const a=$('continue-classic');a.href=`surah-reader.html?mode=classic&surah=${pos.surah}&ayah=${pos.ayah}`;a.textContent=state.startedAt?'Continue Classic Reading':'Begin Classic Reading';
 const params=new URLSearchParams(location.search);if(params.get('saved')==='1'||params.get('completed')==='1')$('classic-saved-message').hidden=false;
 $('reset-classic').addEventListener('click',()=>{if(confirm('Reset Classic Reading to Al-Fatihah, Ayah 1? This clears its saved position, completed surahs, and consistency history.')){tracker.reset();location.href='classic-reading.html';}});

 const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
 const week=tracker.weekDays(state); const count=week.filter(Boolean).length;
 $('classic-week').innerHTML=days.map((d,i)=>`<div class="classic-week-day ${week[i]?'complete':''}"><span>${d}</span><b>${week[i]?'✓':'·'}</b></div>`).join('');
 $('classic-week-summary').textContent=count?`${count} of 7 days include a confirmed Classic Reading session.`:'A fresh week is waiting. Save your place after reading to record today.';

 function render(filter=''){
   const q=filter.trim().toLowerCase();
   const rows=data.filter(s=>!q||String(s.number)===q||s.name.toLowerCase().includes(q)||s.arabicName.includes(q)).map(s=>{
     const completed=state.completedSurahs.includes(s.number);
     const current=s.number===pos.surah;
     const status=completed?'Completed':current?`Current · Ayah ${pos.ayah}`:'Not started';
     const cls=completed?'completed':current?'current':'upcoming';
     return `<a class="classic-index-row ${cls}" href="surah-reader.html?mode=classic&surah=${s.number}&ayah=${current?pos.ayah:1}" data-surah="${s.number}"><span class="classic-index-number">${completed?'✓':current?'▶':s.number}</span><span><strong>${s.number}. ${s.name}</strong><small>${s.arabicName} · ${s.ayahCount} ayat</small></span><span class="classic-index-status">${status}</span></a>`;
   }).join('');
   $('classic-index').innerHTML=rows||'<p class="empty-state">No surahs match that search.</p>';
   document.querySelectorAll('.classic-index-row').forEach(row=>row.addEventListener('click',e=>{
     const n=Number(row.dataset.surah); if(n===pos.surah)return;
     const ok=confirm(`Move your Classic Reading place to ${data[n-1].name}? Your completed-surah history will remain saved.`);
     if(!ok)e.preventDefault(); else tracker.savePosition(n,1);
   }));
 }
 render();$('classic-index-search').addEventListener('input',e=>render(e.target.value));
})();
