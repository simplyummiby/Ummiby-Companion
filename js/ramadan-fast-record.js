(() => {
  "use strict";
  const KEY = "ummibyQuranRamadanFastRecord";
  const defaults = { schemaVersion: 1, firstFastDay: "", hijriYear: "", showMenstruation: true, days: {}, makeups: [], updatedAt: null };
  const statusDefinitions = [
    { id: "fasted", label: "Fasted", icon: "✓", makeup: false },
    { id: "travel", label: "Traveling", icon: "✈", makeup: true },
    { id: "sick", label: "Sick", icon: "＋", makeup: true },
    { id: "menstruation", label: "Menstruation", icon: "●", makeup: true, optional: true },
    { id: "other-excused", label: "Other excused", icon: "○", makeup: true },
    { id: "other-unexcused", label: "Other unexcused", icon: "!", makeup: true }
  ];
  function read(){ try { return {...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}")}; } catch { return {...defaults}; } }
  function write(value){ value.updatedAt = new Date().toISOString(); localStorage.setItem(KEY, JSON.stringify(value)); return value; }
  function parseLocalDate(value){ if(!value) return null; const [y,m,d]=value.split("-").map(Number); return new Date(y,m-1,d); }
  function toInputDate(date){ return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
  function addDays(date, amount){ const copy=new Date(date); copy.setDate(copy.getDate()+amount); return copy; }
  function dayDate(day){ const state=read(); const first=parseLocalDate(state.firstFastDay); return first ? addDays(first, Number(day)-1) : null; }
  function todayRamadanDay(){ const state=read(); const first=parseLocalDate(state.firstFastDay); if(!first) return null; const today=new Date(); today.setHours(0,0,0,0); first.setHours(0,0,0,0); return Math.floor((today-first)/86400000)+1; }
  function deriveHijriYear(date){
    try { const parts=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura",{year:"numeric"}).formatToParts(date); return (parts.find(p=>p.type==="year")||{}).value || ""; }
    catch { return ""; }
  }
  function saveSettings(firstFastDay, showMenstruation){ const s=read(); s.firstFastDay=firstFastDay||""; s.showMenstruation=Boolean(showMenstruation); const date=parseLocalDate(s.firstFastDay); s.hijriYear=date?deriveHijriYear(date):""; return write(s); }
  function getDay(day){ return read().days[String(day)] || { status:"", notes:"" }; }
  function saveDay(day, status, notes){ const s=read(); s.days[String(day)]={status:status||"",notes:(notes||"").trim(),updatedAt:new Date().toISOString()}; return write(s); }
  function clearDay(day){ const s=read(); delete s.days[String(day)]; return write(s); }
  function requiredMakeups(){ const s=read(); return Object.values(s.days).filter(record=>statusDefinitions.find(item=>item.id===record.status)?.makeup).length; }
  function remainingMakeups(){ return Math.max(0, requiredMakeups()-read().makeups.length); }
  function addMakeup(date, notes){ const s=read(); s.makeups.push({id:`m-${Date.now()}`,date,notes:(notes||"").trim(),createdAt:new Date().toISOString()}); s.makeups.sort((a,b)=>a.date.localeCompare(b.date)); return write(s); }
  function removeMakeup(id){ const s=read(); s.makeups=s.makeups.filter(item=>item.id!==id); return write(s); }
  window.RAMADAN_FAST_RECORD={KEY,read,write,statusDefinitions,parseLocalDate,toInputDate,dayDate,todayRamadanDay,saveSettings,getDay,saveDay,clearDay,requiredMakeups,remainingMakeups,addMakeup,removeMakeup};
})();
