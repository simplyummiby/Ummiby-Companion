(function(){
  const STATE_KEY='ummiby.quran.classic.state';
  const LEGACY_KEY='ummiby.quran.classic.position';
  const TOTAL_AYAHS=(window.QURAN_DATA||[]).reduce((sum,s)=>sum+s.ayahCount,0)||6236;

  function todayKey(date=new Date()){
    const y=date.getFullYear();
    const m=String(date.getMonth()+1).padStart(2,'0');
    const d=String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }
  function defaultState(){
    return {version:1,position:{surah:1,ayah:1,updatedAt:null},confirmedPosition:{surah:1,ayah:1,updatedAt:null},completedSurahs:[],readingDays:[],completedJourneys:[],startedAt:null,lastConfirmedAt:null};
  }
  function normalize(raw){
    const base=defaultState();
    const state={...base,...(raw||{})};
    state.position={...base.position,...(raw?.position||{})};
    state.confirmedPosition={...base.confirmedPosition,...(raw?.confirmedPosition||raw?.position||{})};
    state.position.surah=Math.min(114,Math.max(1,Number(state.position.surah)||1));
    const surah=(window.QURAN_DATA||[])[state.position.surah-1];
    state.position.ayah=Math.min(surah?.ayahCount||1,Math.max(1,Number(state.position.ayah)||1));
    state.confirmedPosition.surah=Math.min(114,Math.max(1,Number(state.confirmedPosition.surah)||1));
    const confirmedSurah=(window.QURAN_DATA||[])[state.confirmedPosition.surah-1];
    state.confirmedPosition.ayah=Math.min(confirmedSurah?.ayahCount||1,Math.max(1,Number(state.confirmedPosition.ayah)||1));
    state.completedSurahs=[...new Set((state.completedSurahs||[]).map(Number).filter(n=>n>=1&&n<=114))].sort((a,b)=>a-b);
    state.readingDays=[...new Set((state.readingDays||[]).filter(Boolean))].sort();
    state.completedJourneys=Array.isArray(state.completedJourneys)?state.completedJourneys:[];
    return state;
  }
  function read(){
    try{
      const raw=JSON.parse(localStorage.getItem(STATE_KEY)||'null');
      if(raw)return normalize(raw);
      const legacy=JSON.parse(localStorage.getItem(LEGACY_KEY)||'null');
      if(legacy){
        const migrated=normalize({position:legacy,confirmedPosition:legacy,startedAt:legacy.updatedAt||new Date().toISOString()});
        write(migrated); return migrated;
      }
    }catch(e){}
    return defaultState();
  }
  function write(state){localStorage.setItem(STATE_KEY,JSON.stringify(normalize(state)));}
  function savePosition(surah,ayah){
    const state=read();
    state.position={surah:Number(surah),ayah:Number(ayah),updatedAt:new Date().toISOString()};
    state.startedAt=state.startedAt||new Date().toISOString();
    write(state); return state;
  }
  function confirmPosition(surah,ayah){
    const state=savePosition(surah,ayah);
    const now=new Date().toISOString();
    state.confirmedPosition={surah:Number(surah),ayah:Number(ayah),updatedAt:now};
    state.lastConfirmedAt=now;
    state.readingDays=[...new Set([...state.readingDays,todayKey()])].sort();
    write(state); return state;
  }
  function completeSurah(surah){
    const state=read();
    state.completedSurahs=[...new Set([...state.completedSurahs,Number(surah)])].sort((a,b)=>a-b);
    state.readingDays=[...new Set([...state.readingDays,todayKey()])].sort();
    write(state); return state;
  }
  function finishJourney(){
    const state=completeSurah(114);
    const completedAt=new Date().toISOString();
    state.completedJourneys.push({startedAt:state.startedAt,completedAt});
    state.position={surah:114,ayah:(window.QURAN_DATA||[])[113]?.ayahCount||6,updatedAt:completedAt};
    state.confirmedPosition={...state.position};
    state.lastConfirmedAt=completedAt;
    write(state); return state;
  }
  function reset(){localStorage.removeItem(STATE_KEY);localStorage.removeItem(LEGACY_KEY);}
  function globalAyahNumber(surah,ayah){
    const data=window.QURAN_DATA||[];
    let count=0; for(let i=0;i<surah-1;i++)count+=data[i]?.ayahCount||0;
    return count+ayah;
  }
  function overallPercent(surah,ayah){return TOTAL_AYAHS?Math.min(100,(globalAyahNumber(surah,ayah)/TOTAL_AYAHS)*100):0;}
  function weekDays(state=read()){
    const now=new Date(); const sunday=new Date(now); sunday.setHours(0,0,0,0); sunday.setDate(now.getDate()-now.getDay());
    return Array.from({length:7},(_,i)=>{const d=new Date(sunday);d.setDate(sunday.getDate()+i);return state.readingDays.includes(todayKey(d));});
  }
  window.QURAN_CLASSIC={read,write,savePosition,confirmPosition,completeSurah,finishJourney,reset,globalAyahNumber,overallPercent,weekDays,totalAyahs:TOTAL_AYAHS,todayKey};
})();
