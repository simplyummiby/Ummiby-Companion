(() => {
  const KEY='ummibyQuranRamadanJourney';
  const defaults={schemaVersion:1,currentDay:1,portions:{},startedAt:null,updatedAt:null};
  function read(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}
  function write(state){state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));return state}
  function portionKey(day,portion){return `${day}:${portion}`}
  function getPortion(day,portion){return read().portions[portionKey(day,portion)]||{completed:false,lastVerse:null}}
  function savePosition(day,portion,verseKey){const s=read();const key=portionKey(day,portion);s.startedAt ||= new Date().toISOString();s.currentDay=Math.max(1,Math.min(30,Number(day)||1));s.portions[key]={...(s.portions[key]||{}),lastVerse:verseKey};write(s)}
  function complete(day,portion){const s=read();const key=portionKey(day,portion);s.startedAt ||= new Date().toISOString();s.portions[key]={...(s.portions[key]||{}),completed:true};const d=window.RAMADAN_JOURNEY_DATA?.getDay(day);if(d&&d.portions.every(p=>s.portions[portionKey(day,p.id)]?.completed)&&day<30)s.currentDay=Math.max(s.currentDay,Number(day)+1);else s.currentDay=Number(day);write(s)}
  function uncomplete(day,portion){const s=read();const key=portionKey(day,portion);s.portions[key]={...(s.portions[key]||{}),completed:false};write(s)}
  function daySummary(day){const d=window.RAMADAN_JOURNEY_DATA.getDay(day);const s=read();const completed=d.portions.filter(p=>s.portions[portionKey(day,p.id)]?.completed).length;return {completed,total:5,isComplete:completed===5}}
  function completedDays(){return window.RAMADAN_JOURNEY_DATA.days.filter(d=>daySummary(d.day).isComplete).length}
  function nextPortion(day){const d=window.RAMADAN_JOURNEY_DATA.getDay(day);return d.portions.find(p=>!getPortion(day,p.id).completed)||d.portions[4]}
  window.RAMADAN_STATE={KEY,read,write,getPortion,savePosition,complete,uncomplete,daySummary,completedDays,nextPortion,reset(){localStorage.removeItem(KEY)}};
})();
