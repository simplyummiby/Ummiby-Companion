(function(){
 const data=window.QURAN_DATA||[];
 const tracker=window.QURAN_CLASSIC;
 let state=tracker.read();
 let pos=state.position;
 const $=id=>document.getElementById(id);
 const overall=tracker.overallPercent(pos.surah,pos.ayah);
 const currentSurah=data[pos.surah-1]||data[0];

 $('classic-location').textContent=`${currentSurah.name} · Ayah ${pos.ayah}`;
 $('classic-completed-count').textContent=state.completedSurahs.length;
 $('classic-progress').textContent=pos.surah===1&&pos.ayah===1&&!state.startedAt?'Ready to begin your cover-to-cover reading.':`${state.completedSurahs.length} of 114 surahs completed.`;
 $('classic-overall-fill').style.width=`${overall}%`;
 $('classic-overall-label').textContent=`${overall.toFixed(overall<10?1:0)}%`;
 const continueLink=$('continue-classic');
 continueLink.href=`surah-reader.html?mode=classic&surah=${pos.surah}&ayah=${pos.ayah}`;
 continueLink.lastChild.textContent=state.startedAt?' Continue Classic Reading':' Begin Classic Reading';
 const params=new URLSearchParams(location.search);
 if(params.get('saved')==='1'||params.get('completed')==='1')$('classic-saved-message').hidden=false;

 $('reset-classic').addEventListener('click',()=>{
   if(confirm('Reset Classic Reading to Al-Fātiḥah, Ayah 1? This clears its saved position, completed surahs, and consistency history.')){
     tracker.reset();location.href='classic-reading.html';
   }
 });

 const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
 const week=tracker.weekDays(state); const count=week.filter(Boolean).length;
 $('classic-week').innerHTML=days.map((d,i)=>`<div class="classic-week-day ${week[i]?'complete':''}"><span>${d}</span><b>${week[i]?'✓':'·'}</b></div>`).join('');
 $('classic-week-summary').textContent=count?`${count} of 7 days include a confirmed Classic Reading session.`:'A fresh week is waiting. Save your place after reading to record today.';

 function render(filter=''){
   const q=filter.trim().toLowerCase();
   const rows=data.filter(s=>!q||String(s.number)===q||s.name.toLowerCase().includes(q)||s.arabicName.includes(q)).map(s=>{
     const completed=state.completedSurahs.includes(s.number);
     const current=s.number===pos.surah;
     const statusClass=completed?'completed':current?'current':'';
     const statusText=completed?'Completed':current?`Current · Ayah ${pos.ayah}`:'Not started';
     const statusIcon=completed?'check':current?'arrow-right':'check';
     return `<article class="reading-unit-card classic-surah-card ${statusClass}">
       <span class="unit-order">${String(s.number).padStart(3,'0')}</span>
       <a class="unit-card-link" href="surah-reader.html?mode=classic&surah=${s.number}&ayah=${current?pos.ayah:1}" data-surah="${s.number}" aria-label="Read ${s.name}">
         <span class="unit-card-copy"><small>${s.arabicName} · ${s.ayahCount} ayat</small><strong>${s.number}. ${s.name}</strong><em>Read Surah ${s.number}</em></span>
         <span class="unit-card-status">${statusText}<span data-ui-icon="arrow-right" aria-hidden="true"></span></span>
       </a>
       <div class="unit-status-control classic-status-control" aria-label="${statusText}">
         <span class="unit-status-label">Status</span>
         <span class="unit-checkmark classic-status-mark ${completed?'is-complete':current?'is-current':''}" aria-hidden="true"><span data-ui-icon="${statusIcon}"></span></span>
       </div>
     </article>`;
   }).join('');
   $('classic-index').innerHTML=rows||'<p class="empty-state">No surahs match that search.</p>';
   window.UmmibyIcons?.hydrate(document);
   document.querySelectorAll('.classic-surah-card .unit-card-link').forEach(link=>link.addEventListener('click',e=>{
     const n=Number(link.dataset.surah); if(n===pos.surah)return;
     const ok=confirm(`Move your Classic Reading place to ${data[n-1].name}? Your completed-surah history will remain saved.`);
     if(!ok)e.preventDefault(); else tracker.savePosition(n,1);
   }));
 }
 render();
 $('classic-index-search').addEventListener('input',e=>render(e.target.value));
 const backToTop=$('classicBackToTop');
 window.addEventListener('scroll',()=>backToTop?.classList.toggle('is-visible',window.scrollY>420),{passive:true});
 backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 window.UmmibyIcons?.hydrate(document);
})();