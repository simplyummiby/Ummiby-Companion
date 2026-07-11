(() => {
  const sizeControls = document.querySelectorAll('input[name="arabicTextSize"]');
  const transliterationControl = document.getElementById("showTransliteration");
  const translationControl = document.getElementById("showTranslation");
  const preview = document.getElementById("arabicSizePreview");
  const status = document.getElementById("preferenceStatus");
  const preferences = window.UmmibyPreferences;
  if (!preferences) return;

  const currentPreferences = preferences.read();
  const currentSize = preferences.applyArabicTextSize(currentPreferences.arabicTextSize);
  const selected = document.querySelector(`input[name="arabicTextSize"][value="${currentSize}"]`);
  if (selected) selected.checked = true;

  const display = preferences.applyReadingDisplay(currentPreferences);
  if (transliterationControl) transliterationControl.checked = display.showTransliteration;
  if (translationControl) translationControl.checked = display.showTranslation;

  function announce(message) {
    if (!status) return;
    status.textContent = message;
    window.clearTimeout(announce.timeout);
    announce.timeout = window.setTimeout(() => { status.textContent = ""; }, 2200);
  }

  sizeControls.forEach((control) => {
    control.addEventListener("change", () => {
      const saved = preferences.saveArabicTextSize(control.value);
      if (preview) preview.dataset.size = saved;
      announce("Arabic text size saved on this device.");
    });
  });

  transliterationControl?.addEventListener("change", () => {
    preferences.saveReadingDisplay("showTransliteration", transliterationControl.checked);
    announce(transliterationControl.checked ? "Transliteration will be shown." : "Transliteration will be hidden.");
  });

  translationControl?.addEventListener("change", () => {
    preferences.saveReadingDisplay("showTranslation", translationControl.checked);
    announce(translationControl.checked ? "English translation will be shown." : "English translation will be hidden.");
  });
})();
