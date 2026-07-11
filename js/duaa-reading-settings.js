(() => {
  const preferences = window.UmmibyDuaaPreferences;
  const triggers = document.querySelectorAll("[data-duaa-settings-trigger]");
  if (!preferences || !triggers.length) return;

  let activeContext = "collection";
  const dialog = document.createElement("dialog");
  dialog.className = "duaa-settings-dialog";
  dialog.setAttribute("aria-labelledby", "duaaSettingsTitle");
  dialog.innerHTML = `
    <form method="dialog" class="duaa-settings-form">
      <div class="duaa-settings-header">
        <div><h2 id="duaaSettingsTitle">Duaa Reading Settings</h2><p id="duaaSettingsContextNote">Adjust this reading experience without leaving your place.</p></div>
        <button class="duaa-settings-close" value="close" aria-label="Close reading settings">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <fieldset style="border:0;padding:0;margin:0">
        <legend class="sr-only">Arabic text size</legend>
        <div class="duaa-size-options">
          <div class="duaa-size-option"><input type="radio" name="duaaArabicTextSize" id="duaaArabicSmall" value="small"><label for="duaaArabicSmall">Small</label></div>
          <div class="duaa-size-option"><input type="radio" name="duaaArabicTextSize" id="duaaArabicMedium" value="medium"><label for="duaaArabicMedium">Medium</label></div>
          <div class="duaa-size-option"><input type="radio" name="duaaArabicTextSize" id="duaaArabicLarge" value="large"><label for="duaaArabicLarge">Large</label></div>
          <div class="duaa-size-option"><input type="radio" name="duaaArabicTextSize" id="duaaArabicExtraLarge" value="extra-large"><label for="duaaArabicExtraLarge">Extra Large</label></div>
        </div>
      </fieldset>
      <p class="duaa-settings-preview" lang="ar" dir="rtl">اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ</p>
      <div class="duaa-display-options">
        <label class="duaa-display-option" for="duaaShowTransliteration">
          <span class="duaa-display-copy"><strong>Show transliteration</strong><span>Show or hide the Latin-letter pronunciation guide.</span></span>
          <span class="duaa-switch"><input type="checkbox" id="duaaShowTransliteration"><span class="duaa-switch-track" aria-hidden="true"></span></span>
        </label>
        <label class="duaa-display-option" for="duaaShowTranslation">
          <span class="duaa-display-copy"><strong>Show English translation</strong><span>Show or hide the English meaning.</span></span>
          <span class="duaa-switch"><input type="checkbox" id="duaaShowTranslation"><span class="duaa-switch-track" aria-hidden="true"></span></span>
        </label>
      </div>
      <p class="duaa-settings-status" role="status" aria-live="polite"></p>
      <div class="duaa-settings-actions"><button class="duaa-settings-done" value="done">Done</button></div>
    </form>`;
  document.body.appendChild(dialog);

  const sizes = dialog.querySelectorAll('input[name="duaaArabicTextSize"]');
  const transliteration = dialog.querySelector("#duaaShowTransliteration");
  const translation = dialog.querySelector("#duaaShowTranslation");
  const status = dialog.querySelector(".duaa-settings-status");
  const contextNote = dialog.querySelector("#duaaSettingsContextNote");

  function syncControls() {
    const current = preferences.read(activeContext);
    const size = preferences.applyArabicTextSize(current.arabicTextSize);
    const selected = dialog.querySelector(`input[name="duaaArabicTextSize"][value="${size}"]`);
    if (selected) selected.checked = true;
    const display = preferences.applyReadingDisplay(current);
    transliteration.checked = display.showTransliteration;
    translation.checked = display.showTranslation;
    contextNote.textContent = activeContext === "focus"
      ? "These choices apply only to Focus Mode."
      : "These choices apply only to Duaa collection pages.";
  }

  function announce(message) {
    status.textContent = message;
    window.clearTimeout(announce.timeout);
    announce.timeout = window.setTimeout(() => { status.textContent = ""; }, 1800);
  }

  triggers.forEach((trigger) => trigger.addEventListener("click", () => {
    activeContext = trigger.dataset.duaaSettingsContext || "collection";
    preferences.applyContext(activeContext);
    syncControls();
    dialog.showModal();
  }));

  sizes.forEach((control) => control.addEventListener("change", () => {
    preferences.saveArabicTextSize(activeContext, control.value);
    announce("Arabic text size saved.");
  }));
  transliteration.addEventListener("change", () => {
    preferences.saveReadingDisplay(activeContext, "showTransliteration", transliteration.checked);
    announce(transliteration.checked ? "Transliteration shown." : "Transliteration hidden.");
  });
  translation.addEventListener("change", () => {
    preferences.saveReadingDisplay(activeContext, "showTranslation", translation.checked);
    announce(translation.checked ? "English translation shown." : "English translation hidden.");
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
