(() => {
  const STORAGE_KEY = 'ummibyQuranJourneyState';
  const defaults = {
    activeJourney: 'units',
    journeys: {
      units: { id:'units', name:'Reading Units', shortName:'Reading Units', description:'Balanced reading portions designed for steady progress.', icon:'journey', title:'Reading Unit 12', location:'Surah Al-An‘ām (6)', range:'Ayah 1–77', detail:'Continue from Ayah 42', progress:58, progressLabel:'Unit 12 of 294', href:'workspace.html', week:[1,1,1,1,1,0,0] },
      ramadan: { id:'ramadan', name:'Ramadan Journey', shortName:'Ramadan', description:'Read one juz’ each day throughout Ramadan.', icon:'moon', title:'Juz’ 6', location:'Surah An-Nisā’ (4)', range:'Ayah 148–176', detail:'Continue your sixth day', progress:20, progressLabel:'Juz’ 6 of 30', href:'ramadan-journey.html', week:[1,1,1,0,0,0,0] },
      classic: { id:'classic', name:'Classic Reading', shortName:'Classic', description:'Read continuously from Al-Fatihah to An-Nas, picking up where you left off.', icon:'book', title:'Classic Reading', location:'Surah Al-Baqarah (2)', range:'Ayah 142', detail:'Continue from Ayah 142', progress:4, progressLabel:'Surah 2 · Ayah 142', href:'classic-reading.html', week:[1,0,1,1,0,0,0] }
    }
  };

  function readState(){
    try{
      const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(!stored)return structuredClone(defaults);
      return {activeJourney:stored.activeJourney||defaults.activeJourney,journeys:{...defaults.journeys,...(stored.journeys||{})}};
    }catch{return structuredClone(defaults)}
  }
  function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
  const state=readState();
  if(window.QURAN_CLASSIC && window.QURAN_DATA){
    const classicState=window.QURAN_CLASSIC.read();
    const pos=classicState.position;
    const surah=window.QURAN_DATA[pos.surah-1];
    const pct=window.QURAN_CLASSIC.overallPercent(pos.surah,pos.ayah);
    state.journeys.classic={...state.journeys.classic,title:'Classic Reading',location:`Surah ${surah.name} (${surah.number})`,range:`Ayah ${pos.ayah}`,detail:`Continue from Ayah ${pos.ayah}`,progress:pct,progressLabel:`Surah ${surah.number} · Ayah ${pos.ayah}`,href:`surah-reader.html?mode=classic&surah=${pos.surah}&ayah=${pos.ayah}`,week:window.QURAN_CLASSIC.weekDays(classicState)};
  }
  const dialog=document.getElementById('journeyDialog');
  const choiceList=document.getElementById('journeyChoiceList');
  const progressGrid=document.getElementById('journeyProgressGrid');
  const week=document.getElementById('consistencyWeek');
  const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function icon(name){return `<span data-ui-icon="${name}" aria-hidden="true"></span>`}
  function wholePercent(value){return Math.round(Number(value)||0)}
  function hydrate(){window.UmmibyIcons?.hydrate(document)}

  function renderCurrent(){
    const journey=state.journeys[state.activeJourney]||state.journeys.units;
    document.querySelectorAll('[data-current-journey-name]').forEach(el=>el.textContent=journey.name);
    document.querySelector('[data-current-journey-description]').textContent=journey.description;
    document.querySelector('[data-continue-title]').textContent=journey.title;
    document.querySelector('[data-continue-location]').textContent=journey.location;
    document.querySelector('[data-continue-range]').textContent=journey.range;
    document.querySelector('[data-continue-detail]').textContent=journey.detail;
    document.querySelector('[data-continue-percent]').textContent=`${wholePercent(journey.progress)}%`;
    document.querySelector('[data-continue-progress]').style.width=`${journey.progress}%`;
    document.querySelector('[data-continue-link]').href=journey.href;
  }

  function renderProgress(){
    progressGrid.innerHTML=Object.values(state.journeys).map(j=>`<article class="journey-progress-item"><div class="journey-progress-top"><span>${icon(j.icon)}</span><div><strong>${j.name}</strong><small>${j.progressLabel}</small></div></div><div class="progress-line"><span style="width:${j.progress}%"></span></div><div class="journey-progress-footer"><span>${j.progressLabel}</span><strong>${wholePercent(j.progress)}%</strong></div></article>`).join('');
  }

  function renderChoices(){
    choiceList.innerHTML=Object.values(state.journeys).map(j=>`<article class="journey-choice ${j.id===state.activeJourney?'active':''}"><span class="journey-choice-icon">${icon(j.icon)}</span><div><h3>${j.name}</h3><p>${j.description}</p><div class="journey-choice-progress"><strong>${j.progressLabel}</strong> · ${wholePercent(j.progress)}% complete</div></div><div class="journey-choice-actions">${j.id===state.activeJourney?'<span class="current-badge">Current Journey</span>':''}<button class="button ${j.id===state.activeJourney?'outline':'primary'}" data-select-journey="${j.id}">${j.id===state.activeJourney?'Keep Reading':'Switch & Continue'}</button></div></article>`).join('');
  }

  function renderWeek(id){
    const journey=state.journeys[id];
    week.innerHTML=dayNames.map((day,index)=>`<div class="week-day ${journey.week[index]?'complete':''}"><span>${day}</span><span class="week-marker">${icon('check')}</span></div>`).join('');
    const count=journey.week.filter(Boolean).length;
    document.getElementById('consistencyHeadline').textContent=count?'Every reading counts.':'A fresh week is waiting.';
    document.getElementById('consistencySummary').textContent=`${count} of 7 days with ${journey.name} this week.`;
    document.querySelectorAll('.journey-tab').forEach(tab=>{const selected=tab.dataset.journeyTab===id;tab.classList.toggle('active',selected);tab.setAttribute('aria-selected',String(selected))});
  }

  function renderAll(){renderCurrent();renderProgress();renderChoices();renderWeek(state.activeJourney);hydrate()}

  document.getElementById('openJourneyDialog')?.addEventListener('click',()=>{renderChoices();hydrate();dialog.showModal()});
  document.getElementById('closeJourneyDialog')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  choiceList?.addEventListener('click',e=>{
    const button=e.target.closest('[data-select-journey]');
    if(!button)return;
    state.activeJourney=button.dataset.selectJourney;
    saveState();renderAll();dialog.close();
  });
  document.querySelectorAll('.journey-tab').forEach(tab=>tab.addEventListener('click',()=>renderWeek(tab.dataset.journeyTab)));
  renderAll();
})();
