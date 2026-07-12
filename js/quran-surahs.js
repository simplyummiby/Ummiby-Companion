(function(){
  const data=window.QURAN_DATA||[], grid=document.getElementById('surah-grid'), search=document.getElementById('surah-search'), select=document.getElementById('surah-select'), count=document.getElementById('result-count');
  const normalize=s=>String(s||'').toLowerCase().replace(/[’'\-]/g,' ').replace(/\s+/g,' ').trim();
  data.forEach(s=>{const o=document.createElement('option');o.value=s.number;o.textContent=`${s.number}. ${s.name}`;select.appendChild(o)});
  function render(){const q=normalize(search.value);const list=data.filter(s=>!q||String(s.number)===q||normalize(s.name).includes(q)||normalize(s.arabicName).includes(q));count.textContent=`${list.length} surah${list.length===1?'':'s'}`;grid.innerHTML=list.map(s=>`<a class="surah-card" href="surah-reader.html?surah=${s.number}"><span class="surah-number">${s.number}</span><span><strong>${s.name}</strong><small>${s.ayahCount} ayat</small></span><span class="surah-arabic" lang="ar" dir="rtl">${s.arabicName}</span></a>`).join('')}
  search.addEventListener('input',render);document.getElementById('open-surah').addEventListener('click',()=>{if(select.value)location.href=`surah-reader.html?surah=${select.value}`});render();
})();
