(() => {
  "use strict";
  const init = () => {
    const STORAGE_KEY = "ummibyMemorizationSurahStatuses";
    const MADANI_SURAHS = new Set([2,3,4,5,8,9,13,22,24,33,47,48,49,55,57,58,59,60,61,62,63,64,65,66,76,98,99,110]);
    const labels = {"not-started":"Not Started","in-progress":"In Progress",memorized:"Memorized","needs-revision":"Needs Revision"};
    const safeRead = () => { try { const v=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}"); return v&&typeof v==="object"?v:{}; } catch { return {}; } };
    const safeWrite = value => { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(value)); return true; } catch { return false; } };
    let statuses=safeRead();
    Object.keys(statuses).forEach(k=>{if(statuses[k]==="needs-review")statuses[k]="needs-revision";if(statuses[k]==="mastered")statuses[k]="memorized";});
    const source = Array.isArray(window.QURAN_SURAHS) ? window.QURAN_SURAHS : (Array.isArray(window.QURAN_DATA) ? window.QURAN_DATA : []);
    const library=document.getElementById("memorizationLibrary");
    if (!library || !source.length) { console.error("Memorization library data unavailable."); return; }
    const surahs=source.map(s=>({number:Number(s.number),name:s.name,arabicName:s.arabicName,ayahCount:Number(s.ayahCount),revelation:MADANI_SURAHS.has(Number(s.number))?"madani":"makki"}));
    const getStatus=n=>statuses[n]||"not-started";
    const search=document.getElementById("memorizationSearch"), count=document.getElementById("libraryCount"), noResults=document.getElementById("libraryNoResults");
    const modalBackdrop=document.getElementById("statusModalBackdrop"), modalClose=document.getElementById("statusModalClose"), modalSurah=document.getElementById("statusModalSurah");
    const statusOptions=[...document.querySelectorAll("[data-status-choice]")];
    let activeStatus="all",activeRevelation="all",selectedSurahNumber=null,lastFocusedElement=null;
    const normalize=v=>String(v||"").toLowerCase().replace(/[’'\-]/g," ").replace(/\s+/g," ").trim();
    function hydrate(root){window.UmmibyAppShell?.hydrateIcons?.(root);}
    function renderFocusSection(headingId,status,emptyTitle,emptyText){
      const section=document.getElementById(headingId)?.closest(".memorization-section");
      const body=section?.querySelector(".empty-state, .focus-surah-list");
      const heading=section?.querySelector(".section-heading");
      if(!body||!heading)return;

      heading.querySelector(".focus-section-action")?.remove();

      const allMatches=surahs.filter(s=>getStatus(s.number)===status);
      const matches=allMatches.slice(0,4);

      if(!matches.length){
        body.className="empty-state compact";
        body.innerHTML=`<span class="empty-icon${status==="needs-revision"?" amber":""}" data-ui-icon="${status==="needs-revision"?"history":"book"}"></span><div><h3>${emptyTitle}</h3><p>${emptyText}</p></div>`;
        hydrate(body);
        return;
      }

      if(allMatches.length>4){
        const action=document.createElement("button");
        action.type="button";
        action.className="focus-section-action";
        action.dataset.viewStatus=status;
        action.textContent=`View all ${allMatches.length}`;
        action.setAttribute("aria-label",`View all ${allMatches.length} surahs marked ${labels[status]}`);
        heading.appendChild(action);
      }

      body.className="focus-surah-list";
      body.innerHTML=matches.map(s=>`<a href="memorization-surah.html?surah=${s.number}" class="focus-surah-card"><span class="focus-surah-number">${s.number}</span><span><strong>${s.name}</strong><small>${s.ayahCount} ayat · ${s.revelation==="makki"?"Makki":"Madani"}</small></span><span class="library-status status-${status}"><i aria-hidden="true"></i>${labels[status]}</span></a>`).join("");
    }
    function updateDashboard(){const v=surahs.map(s=>getStatus(s.number));document.getElementById("memorizedCount").textContent=v.filter(x=>x==="memorized").length;document.getElementById("progressCount").textContent=v.filter(x=>x==="in-progress").length;document.getElementById("reviewCount").textContent=v.filter(x=>x==="needs-revision").length;renderFocusSection("currentlyHeading","in-progress","Your current surahs will appear here.","When you begin tracking a surah, this space will help you return to it quickly.");renderFocusSection("reviewHeading","needs-revision","Nothing needs revision right now.","Surahs whose memorization has weakened will be gathered here for focused strengthening.");}
    function render(){const q=normalize(search?.value);const filtered=surahs.filter(s=>{const st=getStatus(s.number);return(!q||String(s.number)===q||normalize(s.name).includes(q)||normalize(s.arabicName).includes(q))&&(activeStatus==="all"||st===activeStatus)&&(activeRevelation==="all"||s.revelation===activeRevelation);});count.textContent=`${filtered.length} surah${filtered.length===1?"":"s"}`;library.innerHTML=filtered.map(s=>{const st=getStatus(s.number);return `<article class="memorization-surah-card"><a class="surah-card-main" href="memorization-surah.html?surah=${s.number}" aria-label="Open ${s.name} memorization page"><span class="library-surah-number">${s.number}</span><span class="library-surah-copy"><span class="library-surah-arabic" lang="ar" dir="rtl">${s.arabicName}</span><strong>${s.name}</strong><small>${s.ayahCount} ayat · ${s.revelation==="makki"?"Makki":"Madani"}</small></span><span class="card-arrow" data-ui-icon="arrow-right" aria-hidden="true"></span></a><button class="library-status status-${st}" type="button" data-change-status="${s.number}" aria-label="Change ${s.name} status, currently ${labels[st]}"><i aria-hidden="true"></i><span>${labels[st]}</span><span class="status-chevron" aria-hidden="true">▼</span></button></article>`;}).join("");hydrate(library);noResults.hidden=filtered.length!==0;}
    function openModal(number,trigger){const s=surahs.find(x=>x.number===number);if(!s)return;selectedSurahNumber=number;lastFocusedElement=trigger||document.activeElement;modalSurah.textContent=`${s.arabicName} · ${s.name}`;const current=getStatus(number);statusOptions.forEach(o=>{const yes=o.dataset.statusChoice===current;o.classList.toggle("selected",yes);o.setAttribute("aria-checked",String(yes));});modalBackdrop.hidden=false;document.body.classList.add("modal-open");requestAnimationFrame(()=>modalBackdrop.classList.add("open"));(statusOptions.find(o=>o.dataset.statusChoice===current)||statusOptions[0])?.focus();}
    function closeModal(){modalBackdrop.classList.remove("open");document.body.classList.remove("modal-open");setTimeout(()=>{modalBackdrop.hidden=true;},150);lastFocusedElement?.focus?.();}
    document.addEventListener("click",e=>{
      const viewButton=e.target.closest("[data-view-status]");
      if(!viewButton)return;
      const requestedStatus=viewButton.dataset.viewStatus;
      activeStatus=requestedStatus;
      if(search)search.value="";
      document.querySelectorAll("#statusFilters .filter-chip").forEach(chip=>{
        chip.classList.toggle("active",chip.dataset.status===requestedStatus);
      });
      render();
      document.getElementById("my-surahs")?.scrollIntoView({behavior:"smooth",block:"start"});
    });
    library.addEventListener("click",e=>{const b=e.target.closest("[data-change-status]");if(b){e.preventDefault();e.stopPropagation();openModal(Number(b.dataset.changeStatus),b);}});
    statusOptions.forEach(o=>o.addEventListener("click",()=>{if(!selectedSurahNumber)return;statuses[selectedSurahNumber]=o.dataset.statusChoice;safeWrite(statuses);render();updateDashboard();closeModal();}));
    modalClose?.addEventListener("click",closeModal);modalBackdrop?.addEventListener("click",e=>{if(e.target===modalBackdrop)closeModal();});document.addEventListener("keydown",e=>{if(modalBackdrop&&!modalBackdrop.hidden&&e.key==="Escape")closeModal();});
    document.querySelectorAll("#statusFilters .filter-chip").forEach(b=>b.addEventListener("click",()=>{activeStatus=b.dataset.status;document.querySelectorAll("#statusFilters .filter-chip").forEach(c=>c.classList.toggle("active",c===b));render();}));
    document.querySelectorAll("#revelationFilters .filter-chip").forEach(b=>b.addEventListener("click",()=>{activeRevelation=b.dataset.revelation;document.querySelectorAll("#revelationFilters .filter-chip").forEach(c=>c.classList.toggle("active",c===b));render();}));
    search?.addEventListener("input",render);document.getElementById("clearLibraryFilters")?.addEventListener("click",()=>{if(search)search.value="";activeStatus="all";activeRevelation="all";document.querySelectorAll(".filter-chip").forEach(c=>c.classList.toggle("active",c.dataset.status==="all"||c.dataset.revelation==="all"));render();});
    safeWrite(statuses);render();updateDashboard();
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
