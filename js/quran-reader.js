(function(){
 const data=window.QURAN_DATA||[];
 const p=new URLSearchParams(location.search);
 const mode=p.get('mode')==='classic'?'classic':'browse';
 let surahNo=Math.min(114,Math.max(1,Number(p.get('surah'))||1));
 let startAyah=Math.max(1,Number(p.get('ayah'))||1);
 const surah=data[surahNo-1];
 const $=id=>document.getElementById(id);
 const BASMALAH='بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
 const BASMALAH_VARIANT='بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
 const arabicDigits=number=>String(number).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
 const backToTopButton=$('quranBackToTop');
 let currentAyah=Math.min(startAyah,surah.ayahCount);
 let observerReady=false;

 function displayArabic(ayah){
   if(surahNo===1 || surahNo===9 || ayah.ayah!==1) return ayah.arabic;
   if(ayah.arabic.startsWith(BASMALAH)) return ayah.arabic.slice(BASMALAH.length).trimStart();
   if(ayah.arabic.startsWith(BASMALAH_VARIANT)) return ayah.arabic.slice(BASMALAH_VARIANT.length).trimStart();
   return ayah.arabic;
 }
 function go(n,ayah=1){location.href=`surah-reader.html?${mode==='classic'?'mode=classic&':''}surah=${n}&ayah=${ayah}`;}
 function positionLabel(){return `${surah.name} · Ayah ${currentAyah}`;}
 function updateClassicBar(){
   if(mode!=='classic')return;
   const surahPct=(currentAyah/surah.ayahCount)*100;
   $('surah-progress-fill').style.width=`${surahPct}%`;
   $('surah-progress-label').textContent=`${surah.name} · Ayah ${currentAyah} of ${surah.ayahCount} · ${Math.round(surahPct)}%`;
 }
 function remember(ayah){
   currentAyah=ayah; sel.value=ayah; updateClassicBar();
   if(mode==='classic'&&observerReady)window.QURAN_CLASSIC.savePosition(surahNo,ayah);
 }

 $('surah-title').textContent=`${surah.number}. ${surah.name}`;
 $('arabic-surah-name').textContent=surah.arabicName;
 $('surah-meta').textContent=`${surah.ayahCount} ayat`;
 $('reader-mode-label').textContent=mode==='classic'?'Classic Reading Journey':'Read Without a Journey';
 $('save-note').hidden=mode!=='classic';
 $('back-link').href=mode==='classic'?'classic-reading.html':'surahs.html';
 $('back-link').textContent=mode==='classic'?'← Classic Reading':'← Surah Index';
 $('classic-reader-bar').hidden=mode!=='classic';
 $('browse-surah-nav').hidden=mode==='classic';
 document.body.classList.toggle('classic-mode',mode==='classic');

 const basmalahBlock=$('surah-basmalah');
 basmalahBlock.hidden=surahNo===1 || surahNo===9;
 const sel=$('ayah-select');
 surah.ayahs.forEach(a=>{const o=document.createElement('option');o.value=a.ayah;o.textContent=`Ayah ${a.ayah}`;sel.appendChild(o);});
 sel.value=currentAyah;
 $('ayah-list').innerHTML=surah.ayahs.map(a=>`
   <article class="ayah classic-ayah-card" id="ayah-${a.ayah}" data-ayah="${a.ayah}">
     <div class="ayah-label">${surah.number}:${a.ayah}</div>
     <div class="classic-ayah-content">
       <div class="translation-wrap classic-translation-column"><p class="translation">${a.translation}</p>${a.footnotes?`<details class="footnotes"><summary>Translation notes</summary><p>${a.footnotes.replace(/\n/g,'<br>')}</p></details>`:''}</div>
       <div class="classic-arabic-column"><p class="arabic-text" lang="ar" dir="rtl"><span class="ayah-arabic-copy">${displayArabic(a)}</span><span class="ayah-ornament" aria-label="Ayah ${a.ayah}"><span class="ayah-ornament-symbol" aria-hidden="true">۝</span><span class="ayah-ornament-number">${arabicDigits(a.ayah)}</span></span></p></div>
     </div>
   </article>`).join('');

 sel.addEventListener('change',()=>{const ayah=Number(sel.value);remember(ayah);$(`ayah-${ayah}`)?.scrollIntoView({behavior:'smooth',block:'start'});});
 $('translation-toggle').addEventListener('change',e=>document.body.classList.toggle('hide-translation',!e.target.checked));

 const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
   if(visible)remember(Number(visible.target.dataset.ayah));
 },{threshold:[.35,.6]});
 document.querySelectorAll('.ayah').forEach(el=>observer.observe(el));

 $('previous-surah').disabled=surahNo===1;
 $('next-surah').disabled=surahNo===114;
 $('previous-surah').addEventListener('click',()=>go(surahNo-1,data[surahNo-2].ayahCount));
 $('next-surah').addEventListener('click',()=>go(surahNo+1,1));

 if(mode==='classic'){
   $('classic-previous-surah').disabled=surahNo===1;
   $('classic-previous-label').textContent=surahNo===1?'Beginning':data[surahNo-2].name;
   $('classic-previous-surah').addEventListener('click',()=>go(surahNo-1,data[surahNo-2].ayahCount));
   $('classic-next-label').textContent=surahNo===114?'Complete Journey':data[surahNo].name;
   $('classic-next-surah').addEventListener('click',()=>{
     if(currentAyah<surah.ayahCount){
       const ok=confirm(`You are currently at Ayah ${currentAyah}. Move to the next surah and mark ${surah.name} complete?`);
       if(!ok)return;
     }
     if(surahNo===114){showCompletion(true);return;}
     window.QURAN_CLASSIC.completeSurah(surahNo);
     window.QURAN_CLASSIC.confirmPosition(surahNo+1,1);
     go(surahNo+1,1);
   });
   $('save-exit-button').addEventListener('click',()=>{
     window.QURAN_CLASSIC.confirmPosition(surahNo,currentAyah);
     location.href='classic-reading.html?saved=1';
   });
   updateClassicBar();
 }

 function showCompletion(finalJourney=false){
   const card=$('classic-completion-card');
   card.hidden=false;
   $('completion-title').textContent=finalJourney?'Classic Reading Journey complete':`${surah.name} complete`;
   $('completion-message').textContent=finalJourney?'You have read continuously from Al-Fatihah through An-Nas. This completed journey will be saved.':`Your place has been saved. Continue naturally into ${data[surahNo]?.name}.`;
   const action=$('completion-action');
   action.textContent=finalJourney?'Save Completed Journey':'Continue to Next Surah';
   action.onclick=()=>{
     if(finalJourney){window.QURAN_CLASSIC.finishJourney();location.href='classic-reading.html?completed=1';}
     else{window.QURAN_CLASSIC.completeSurah(surahNo);window.QURAN_CLASSIC.confirmPosition(surahNo+1,1);go(surahNo+1,1);}
   };
   card.scrollIntoView({behavior:'smooth',block:'center'});
 }

 const lastAyahEl=$(`ayah-${surah.ayahCount}`);
 const completionObserver=new IntersectionObserver(entries=>{
   if(mode==='classic'&&entries.some(e=>e.isIntersecting&&e.intersectionRatio>.65))showCompletion(surahNo===114);
 },{threshold:[.65]});
 if(lastAyahEl)completionObserver.observe(lastAyahEl);

 function updateBackToTopVisibility(){if(backToTopButton)backToTopButton.classList.toggle('is-visible',window.scrollY>520);}
 backToTopButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 window.addEventListener('scroll',updateBackToTopVisibility,{passive:true});updateBackToTopVisibility();
 requestAnimationFrame(()=>{const el=$(`ayah-${currentAyah}`);if(el&&currentAyah>1)el.scrollIntoView({block:'start'});setTimeout(()=>{observerReady=true;},350);});
})();
