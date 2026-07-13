(() => {
  "use strict";
  const KEY = "ummibyQuranRamadanFastRecord";
  const statusDefinitions = [
    { id: "fasted", label: "Fasted", icon: "✓", makeup: false },
    { id: "travel", label: "Traveling", icon: "✈", makeup: true },
    { id: "sick", label: "Sick", icon: "+", makeup: true },
    { id: "menstruation", label: "Menstruation", icon: "●", makeup: true, optional: true },
    { id: "other-excused", label: "Other excused", icon: "○", makeup: true },
    { id: "other-unexcused", label: "Other unexcused", icon: "!", makeup: true }
  ];
  const emptyRecord = () => ({ id:`ramadan-${Date.now()}`, firstFastDay:"", hijriYear:"", showMenstruation:true, days:{}, makeups:[], createdAt:new Date().toISOString(), updatedAt:null });
  const defaults = { schemaVersion:2, activeRecordId:"", records:[] };
  function migrate(raw){
    if(raw && raw.schemaVersion===2 && Array.isArray(raw.records)) return {...defaults,...raw};
    if(raw && (raw.firstFastDay!==undefined || raw.days || raw.makeups)){
      const record={...emptyRecord(),...raw,id:raw.id||`ramadan-${Date.now()}`};
      return {schemaVersion:2,activeRecordId:record.id,records:[record]};
    }
    const record=emptyRecord();
    return {schemaVersion:2,activeRecordId:record.id,records:[record]};
  }
  function readAll(){ try { return migrate(JSON.parse(localStorage.getItem(KEY)||"{}")); } catch { return migrate({}); } }
  function writeAll(value){ localStorage.setItem(KEY,JSON.stringify(value)); return value; }
  function activeRecord(all=readAll()){ return all.records.find(r=>r.id===all.activeRecordId) || all.records[0] || emptyRecord(); }
  function read(){ return activeRecord(); }
  function updateActive(mutator){ const all=readAll(); let record=activeRecord(all); record={...record}; mutator(record); record.updatedAt=new Date().toISOString(); const index=all.records.findIndex(r=>r.id===record.id); if(index>=0) all.records[index]=record; else all.records.push(record); all.activeRecordId=record.id; writeAll(all); return record; }
  function parseLocalDate(value){ if(!value) return null; const [y,m,d]=value.split("-").map(Number); return new Date(y,m-1,d); }
  function toInputDate(date){ return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
  function addDays(date,amount){ const copy=new Date(date); copy.setDate(copy.getDate()+amount); return copy; }
  function dayDate(day,record=read()){ const first=parseLocalDate(record.firstFastDay); return first?addDays(first,Number(day)-1):null; }
  function todayRamadanDay(record=read()){ const first=parseLocalDate(record.firstFastDay); if(!first) return null; const today=new Date(); today.setHours(0,0,0,0); first.setHours(0,0,0,0); return Math.floor((today-first)/86400000)+1; }
  function deriveHijriYear(date){ try { const parts=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura",{year:"numeric"}).formatToParts(date); return (parts.find(p=>p.type==="year")||{}).value||""; } catch { return ""; } }
  function saveSettings(firstFastDay,showMenstruation){ return updateActive(r=>{ r.firstFastDay=firstFastDay||""; r.showMenstruation=Boolean(showMenstruation); const date=parseLocalDate(r.firstFastDay); r.hijriYear=date?deriveHijriYear(date):""; }); }
  function getDay(day,record=read()){ return record.days[String(day)]||{status:"",notes:""}; }
  function saveDay(day,status,notes){ return updateActive(r=>{ r.days={...r.days,[String(day)]:{status:status||"",notes:(notes||"").trim(),updatedAt:new Date().toISOString()}}; }); }
  function clearDay(day){ return updateActive(r=>{ r.days={...r.days}; delete r.days[String(day)]; }); }
  function requiredMakeups(record=read()){ return Object.values(record.days||{}).filter(rec=>statusDefinitions.find(item=>item.id===rec.status)?.makeup).length; }
  function remainingMakeups(record=read()){ return Math.max(0,requiredMakeups(record)-(record.makeups||[]).length); }
  function addMakeup(date,notes){ return updateActive(r=>{ r.makeups=[...(r.makeups||[]),{id:`m-${Date.now()}`,date,notes:(notes||"").trim(),createdAt:new Date().toISOString()}].sort((a,b)=>a.date.localeCompare(b.date)); }); }
  function removeMakeup(id){ return updateActive(r=>{ r.makeups=(r.makeups||[]).filter(item=>item.id!==id); }); }
  function beginNewRamadan(firstFastDay,showMenstruation=true){ const all=readAll(); const date=parseLocalDate(firstFastDay); const record={...emptyRecord(),firstFastDay:firstFastDay||"",showMenstruation:Boolean(showMenstruation),hijriYear:date?deriveHijriYear(date):""}; all.records.push(record); all.activeRecordId=record.id; writeAll(all); return record; }
  function setActiveRecord(id){ const all=readAll(); if(all.records.some(r=>r.id===id)){ all.activeRecordId=id; writeAll(all); return true; } return false; }
  function records(){ return readAll().records.slice().sort((a,b)=>(b.firstFastDay||b.createdAt).localeCompare(a.firstFastDay||a.createdAt)); }
  window.RAMADAN_FAST_RECORD={KEY,read,readAll,records,activeRecord,statusDefinitions,parseLocalDate,toInputDate,dayDate,todayRamadanDay,saveSettings,getDay,saveDay,clearDay,requiredMakeups,remainingMakeups,addMakeup,removeMakeup,beginNewRamadan,setActiveRecord};
})();
