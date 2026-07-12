(() => {
  const starts = [
    [1,1],[2,142],[2,253],[3,93],[4,24],[4,148],[5,82],[6,111],[7,88],[8,41],
    [9,93],[11,6],[12,53],[15,1],[17,1],[18,75],[21,1],[23,1],[25,21],[27,56],
    [29,46],[33,31],[36,28],[39,32],[41,47],[46,1],[51,31],[58,1],[67,1],[78,1]
  ];
  const prayers = ['Fajr','Dhuhr','ʿAsr','Maghrib','ʿIshāʾ'];
  const data = window.QURAN_DATA || [];
  const flat = [];
  data.forEach(surah => surah.ayahs.forEach(ayah => flat.push({
    surah: surah.number,
    surahName: surah.name,
    ayah: ayah.ayah,
    arabic: ayah.arabic,
    translation: ayah.translation,
    footnotes: ayah.footnotes || ''
  })));
  const indexByKey = new Map(flat.map((item,index)=>[`${item.surah}:${item.ayah}`,index]));
  function label(start,end){
    return start.surah===end.surah ? `${start.surah}:${start.ayah}–${end.ayah}` : `${start.surah}:${start.ayah}–${end.surah}:${end.ayah}`;
  }
  function splitBalanced(verses){
    const weights=verses.map(v=>Math.max(1,(v.arabic||'').replace(/\s/g,'').length));
    const total=weights.reduce((a,b)=>a+b,0);
    const boundaries=[0];
    let cumulative=0, targetIndex=1;
    for(let i=0;i<weights.length-1 && targetIndex<5;i++){
      cumulative+=weights[i];
      if(cumulative >= total*targetIndex/5){ boundaries.push(i+1); targetIndex++; }
    }
    while(boundaries.length<5){
      const previous=boundaries[boundaries.length-1];
      boundaries.push(Math.min(verses.length-1, previous+1));
    }
    boundaries.push(verses.length);
    return prayers.map((prayer,i)=>{
      const portionVerses=verses.slice(boundaries[i],boundaries[i+1]);
      const start=portionVerses[0], end=portionVerses[portionVerses.length-1];
      return {id:prayer.toLowerCase().replace(/[ʿāʾ]/g,c=>({'ʿ':'','ā':'a','ʾ':''}[c]||c)), prayer, index:i+1, start:{surah:start.surah,ayah:start.ayah}, end:{surah:end.surah,ayah:end.ayah}, range:label(start,end), verses:portionVerses};
    });
  }
  const days=starts.map((start,dayIndex)=>{
    const startIndex=indexByKey.get(`${start[0]}:${start[1]}`);
    const next=starts[dayIndex+1];
    const endIndex=next ? indexByKey.get(`${next[0]}:${next[1]}`)-1 : flat.length-1;
    const verses=flat.slice(startIndex,endIndex+1);
    return {day:dayIndex+1,juz:dayIndex+1,start:{surah:start[0],ayah:start[1]},end:{surah:verses.at(-1).surah,ayah:verses.at(-1).ayah},range:label(verses[0],verses.at(-1)),portions:splitBalanced(verses)};
  });
  window.RAMADAN_JOURNEY_DATA={days,prayers,getDay:n=>days[Math.max(1,Math.min(30,Number(n)||1))-1]};
})();
