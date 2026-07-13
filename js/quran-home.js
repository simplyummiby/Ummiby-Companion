(function(){
const { units: READING_UNITS } = window.QURAN_READING_LIBRARY;
const { read: readJourneyState } = window.QURAN_READING_JOURNEY_STATE;
(() => {
  const STORAGE_KEY = 'ummibyQuranJourneyState';
  const defaults = {
    activeJourney: 'units',
    journeys: {
      units: { id:'units', name:'Reading Journey', shortName:'Reading Journey', description:'Read the Qur’an through 294 canonical Reading Units.', icon:'journey', title:'Reading Unit 1', location:'Al-Fātiḥah', range:'1:1–7', detail:'Continue your Reading Journey', progress:0, progressLabel:'Unit 1 of 294', href:'workspace.html?unit=P0001', week:[0,0,0,0,0,0,0] },
      classic: { id:'classic', name:'Classic Reading', shortName:'Classic', description:'Read continuously from Al-Fatihah to An-Nas, picking up where you left off.', icon:'book', title:'Classic Reading', location:'Surah Al-Baqarah (2)', range:'Ayah 142', detail:'Continue from Ayah 142', progress:4, progressLabel:'Surah 2 · Ayah 142', href:'classic-reading.html', week:[1,0,1,1,0,0,0] }
    }
  };

  function readState(){
    try{
      const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(!stored)return structuredClone(defaults);
      const active=['units','classic'].includes(stored.activeJourney)?stored.activeJourney:defaults.activeJourney;
      return {activeJourney:active,journeys:{...defaults.journeys,...(stored.journeys||{})}};
    }catch{return structuredClone(defaults)}
  }
  function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
  const state=readState();
  const unitState=readJourneyState();
  const currentUnit=READING_UNITS.find(unit=>unit.id===unitState.currentUnitId)||READING_UNITS[0];
  const unitProgress=Math.round((unitState.completedUnitIds.length/READING_UNITS.length)*100);
  state.journeys.units={...state.journeys.units,title:`Reading Unit ${currentUnit.order}`,location:currentUnit.surahName,range:currentUnit.reference,detail:`${currentUnit.title}`,progress:unitProgress,progressLabel:`Unit ${currentUnit.order} of ${READING_UNITS.length}`,href:`workspace.html?unit=${currentUnit.id}`};
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
  function hydrate(){window.UmmibyIcons?.hydrate(document)}

  function renderCurrent(){
    const journey=state.journeys[state.activeJourney]||state.journeys.units;
    document.querySelectorAll('[data-current-journey-name]').forEach(el=>el.textContent=journey.name);
    document.querySelector('[data-current-journey-description]').textContent=journey.description;
    document.querySelector('[data-continue-title]').textContent=journey.title;
    document.querySelector('[data-continue-location]').textContent=journey.location;
    document.querySelector('[data-continue-range]').textContent=journey.range;
    document.querySelector('[data-continue-detail]').textContent=journey.detail;
    document.querySelector('[data-continue-percent]').textContent=`${journey.progress}%`;
    document.querySelector('[data-continue-progress]').style.width=`${journey.progress}%`;
    document.querySelector('[data-continue-link]').href=journey.href;
    const indexLink=document.getElementById('journeyIndexLink');
    if(indexLink){
      const isUnits=journey.id==='units';
      indexLink.href=isUnits?'reading-journey.html':'classic-reading.html#classic-index';
      indexLink.textContent=isUnits?'Reading Unit Index':'Classic Index';
    }
  }

  function generalJourneys(){return Object.values(state.journeys).filter(j=>j.id!=='ramadan')}

  function renderProgress(){
    progressGrid.innerHTML=generalJourneys().map(j=>`<article class="journey-progress-item"><div class="journey-progress-top"><span>${icon(j.icon)}</span><div><strong>${j.name}</strong><small>${j.progressLabel}</small></div></div><div class="progress-line"><span style="width:${j.progress}%"></span></div><div class="journey-progress-footer"><span>${j.progressLabel}</span><strong>${j.progress}%</strong></div></article>`).join('');
  }

  function renderChoices(){
    choiceList.innerHTML=generalJourneys().map(j=>`<article class="journey-choice ${j.id===state.activeJourney?'active':''}"><span class="journey-choice-icon">${icon(j.icon)}</span><div><h3>${j.name}</h3><p>${j.description}</p><div class="journey-choice-progress"><strong>${j.progressLabel}</strong> · ${j.progress}% complete</div></div><div class="journey-choice-actions">${j.id===state.activeJourney?'<span class="current-badge">Current Journey</span>':''}<button class="button ${j.id===state.activeJourney?'outline':'primary'}" data-select-journey="${j.id}">${j.id===state.activeJourney?'Keep Reading':'Switch & Continue'}</button></div></article>`).join('');
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
})();
