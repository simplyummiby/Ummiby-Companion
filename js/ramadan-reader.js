(() => {
  const params=new URLSearchParams(location.search);
  const dayNo=Math.max(1,Math.min(30,Number(params.get('day'))||1));
  const day=window.RAMADAN_JOURNEY_DATA.getDay(dayNo);
  const requested=params.get('portion');
  const portion=day.portions.find(p=>p.id===requested)||day.portions[0];
  const saved=window.RAMADAN_STATE.getPortion(dayNo,portion.id);
  const $=id=>document.getElementById(id);
  const arabicDigits=number=>String(number).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
  const basmalah=window.QURAN_BASMALAH;
  let currentIndex=0;
  let observerReady=false;
  function displayArabic(v){return basmalah.displayArabic(v,v.surah)}
  function key(v){return `${v.surah}:${v.ayah}`}
  function href(targetDay,targetPortion){return `ramadan-reader.html?day=${targetDay}&portion=${targetPortion}`}
  $('readerEyebrow').textContent=`Ramadan Day ${dayNo} · Juz ${day.juz} · Portion ${portion.index} of 5`;
  $('readerTitle').textContent=`${portion.prayer} Reading`;
  $('readerRange').textContent=portion.range;
  $('barTitle').textContent=`${portion.prayer} · Day ${dayNo}`;
  $('ayah-list').innerHTML=portion.verses.map((v,index)=>{
    const surah=window.QURAN_DATA[v.surah-1];
    const showHeading=index===0||portion.verses[index-1].surah!==v.surah;
    const showBasmalah=showHeading&&v.ayah===1&&basmalah.shouldShowStandaloneBasmalah(v.surah);
    return `${showHeading?`<div class="ramadan-surah-divider"><p class="eyebrow">Surah ${surah.name} (${surah.number})</p>${showBasmalah?basmalah.standaloneBasmalahHtml():''}</div>`:''}<article class="ayah" id="ayah-${v.surah}-${v.ayah}" data-index="${index}" data-key="${key(v)}"><div class="ayah-label">${v.surah}:${v.ayah}</div><p class="arabic-text" lang="ar" dir="rtl"><span class="ayah-arabic-copy">${displayArabic(v)}</span><span class="ayah-ornament" aria-label="Ayah ${v.ayah}"><span class="ayah-ornament-symbol" aria-hidden="true">۝</span><span class="ayah-ornament-number">${arabicDigits(v.ayah)}</span></span></p><div class="translation-wrap"><p class="translation">${v.translation}</p>${v.footnotes?`<details class="footnotes"><summary>Translation notes</summary><p>${v.footnotes.replace(/\n/g,'<br>')}</p></details>`:''}</div></article>`;
  }).join('');
  const libraryRanges = Object.values(portion.verses.reduce((groups, verse) => {
    const key = String(verse.surah);
    if (!groups[key]) groups[key] = { surahNumber: verse.surah, startAyah: verse.ayah, endAyah: verse.ayah };
    groups[key].startAyah = Math.min(groups[key].startAyah, verse.ayah);
    groups[key].endAyah = Math.max(groups[key].endAyah, verse.ayah);
    return groups;
  }, {}));
  window.QURAN_STUDY_LIBRARY?.render({
    container: '#ramadanStudyLibrary',
    shortcut: '#ramadanLibraryShortcut',
    sectionId: 'ramadanStudyLibrary',
    context: { ranges: libraryRanges, journey: 'ramadan', day: dayNo, portion: portion.id }
  });

  function remember(index){currentIndex=index;const verse=portion.verses[index];$('barPosition').textContent=`${key(verse)} · ${index+1} of ${portion.verses.length} ayat`;$('portionProgress').style.width=`${(index+1)/portion.verses.length*100}%`;if(observerReady)window.RAMADAN_STATE.savePosition(dayNo,portion.id,key(verse))}
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)remember(Number(visible.target.dataset.index))},{threshold:[.35,.6]});
  document.querySelectorAll('.ayah').forEach(el=>observer.observe(el));
  $('translation-toggle').addEventListener('change',e=>document.body.classList.toggle('hide-translation',!e.target.checked));
  const flatIndex=(dayNo-1)*5+(portion.index-1);
  const previous=$('previousPortion'),next=$('nextPortion');
  previous.disabled=flatIndex===0;next.disabled=flatIndex===149;
  previous.addEventListener('click',()=>{if(flatIndex===0)return;const d=Math.floor((flatIndex-1)/5)+1;const p=window.RAMADAN_JOURNEY_DATA.getDay(d).portions[(flatIndex-1)%5];location.href=href(d,p.id)});
  next.addEventListener('click',()=>{if(flatIndex===149)return;const d=Math.floor((flatIndex+1)/5)+1;const p=window.RAMADAN_JOURNEY_DATA.getDay(d).portions[(flatIndex+1)%5];location.href=href(d,p.id)});
  const completeButton=$('completePortion');
  function refreshComplete(){const current=window.RAMADAN_STATE.getPortion(dayNo,portion.id);completeButton.textContent=current.completed?'Mark Incomplete':'Mark Portion Complete';completeButton.classList.toggle('primary',!current.completed)}
  completeButton.addEventListener('click',()=>{const current=window.RAMADAN_STATE.getPortion(dayNo,portion.id);if(current.completed){window.RAMADAN_STATE.uncomplete(dayNo,portion.id);$('completionNote').hidden=true}else{window.RAMADAN_STATE.complete(dayNo,portion.id);$('completionTitle').textContent=`${portion.prayer} reading complete`;$('completionText').textContent=portion.index===5?`You have completed all five readings for Ramadan Day ${dayNo}.`:`Your place is saved. Continue whenever you are ready.`;$('completionNote').hidden=false;$('completionNote').scrollIntoView({behavior:'smooth',block:'center'})}refreshComplete()});
  refreshComplete();
  const back=$('quranBackToTop');function toggleBack(){back?.classList.toggle('is-visible',scrollY>520)}back?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));addEventListener('scroll',toggleBack,{passive:true});toggleBack();
  const savedIndex=saved.lastVerse?portion.verses.findIndex(v=>key(v)===saved.lastVerse):0;currentIndex=Math.max(0,savedIndex);remember(currentIndex);requestAnimationFrame(()=>{const v=portion.verses[currentIndex];const el=$(`ayah-${v.surah}-${v.ayah}`);if(el&&currentIndex>0)el.scrollIntoView({block:'start'});setTimeout(()=>observerReady=true,350)});
})();
