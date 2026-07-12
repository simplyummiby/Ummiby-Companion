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

 function displayArabic(ayah){
   if(surahNo===1 || surahNo===9 || ayah.ayah!==1) return ayah.arabic;
   if(ayah.arabic.startsWith(BASMALAH)) return ayah.arabic.slice(BASMALAH.length).trimStart();
   if(ayah.arabic.startsWith(BASMALAH_VARIANT)) return ayah.arabic.slice(BASMALAH_VARIANT.length).trimStart();
   return ayah.arabic;
 }

 $('surah-title').textContent=`${surah.number}. ${surah.name}`;
 $('arabic-surah-name').textContent=surah.arabicName;
 $('surah-meta').textContent=`${surah.ayahCount} ayat`;
 $('reader-mode-label').textContent=mode==='classic'?'Classic Reading Journey':'Read Without a Journey';
 $('save-note').hidden=mode!=='classic';
 $('back-link').href=mode==='classic'?'classic-reading.html':'surahs.html';
 $('back-link').textContent=mode==='classic'?'← Classic Reading':'← Surah Index';

 const basmalahBlock=$('surah-basmalah');
 basmalahBlock.hidden=surahNo===1 || surahNo===9;

 const sel=$('ayah-select');
 surah.ayahs.forEach(a=>{
   const o=document.createElement('option');
   o.value=a.ayah;
   o.textContent=`Ayah ${a.ayah}`;
   sel.appendChild(o);
 });
 sel.value=Math.min(startAyah,surah.ayahCount);

 $('ayah-list').innerHTML=surah.ayahs.map(a=>`
   <article class="ayah" id="ayah-${a.ayah}" data-ayah="${a.ayah}">
     <div class="ayah-label">${surah.number}:${a.ayah}</div>
     <p class="arabic-text" lang="ar" dir="rtl">
       <span class="ayah-arabic-copy">${displayArabic(a)}</span>
       <span class="ayah-ornament" aria-label="Ayah ${a.ayah}"><span class="ayah-ornament-symbol" aria-hidden="true">۝</span><span class="ayah-ornament-number">${arabicDigits(a.ayah)}</span></span>
     </p>
     <div class="translation-wrap">
       <p class="translation">${a.translation}</p>
       ${a.footnotes?`<details class="footnotes"><summary>Translation notes</summary><p>${a.footnotes.replace(/\n/g,'<br>')}</p></details>`:''}
     </div>
   </article>`).join('');

 function save(ayah){
   if(mode!=='classic')return;
   localStorage.setItem('ummiby.quran.classic.position',JSON.stringify({surah:surahNo,ayah,updatedAt:new Date().toISOString()}));
 }

 sel.addEventListener('change',()=>{
   const el=$(`ayah-${sel.value}`);
   el&&el.scrollIntoView({behavior:'smooth',block:'start'});
   save(Number(sel.value));
 });
 $('translation-toggle').addEventListener('change',e=>document.body.classList.toggle('hide-translation',!e.target.checked));

 const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
   if(visible){
     const ayah=Number(visible.target.dataset.ayah);
     sel.value=ayah;
     save(ayah);
   }
 },{threshold:[.35,.6]});
 document.querySelectorAll('.ayah').forEach(el=>observer.observe(el));

 function go(n,ayah=1){
   location.href=`surah-reader.html?${mode==='classic'?'mode=classic&':''}surah=${n}&ayah=${ayah}`;
 }
 $('previous-surah').disabled=surahNo===1;
 $('next-surah').disabled=surahNo===114;
 $('previous-surah').addEventListener('click',()=>go(surahNo-1,data[surahNo-2].ayahCount));
 $('next-surah').addEventListener('click',()=>go(surahNo+1,1));

 function updateBackToTopVisibility(){
   if(!backToTopButton)return;
   backToTopButton.classList.toggle('is-visible',window.scrollY>520);
 }
 backToTopButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 window.addEventListener('scroll',updateBackToTopVisibility,{passive:true});
 updateBackToTopVisibility();

 requestAnimationFrame(()=>{
   const el=$(`ayah-${Math.min(startAyah,surah.ayahCount)}`);
   if(el&&startAyah>1)el.scrollIntoView({block:'start'});
 });
})();
