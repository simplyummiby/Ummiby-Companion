(() => {
  const controls = document.querySelectorAll('input[name="arabicTextSize"]');
  const preview = document.getElementById("arabicSizePreview");
  const status = document.getElementById("preferenceStatus");
  const preferences = window.UmmibyPreferences;
  if (!preferences || !controls.length) return;

  const current = preferences.applyArabicTextSize(preferences.read().arabicTextSize);
  const selected = document.querySelector(`input[name="arabicTextSize"][value="${current}"]`);
  if (selected) selected.checked = true;

  controls.forEach((control) => {
    control.addEventListener("change", () => {
      const saved = preferences.saveArabicTextSize(control.value);
      if (preview) preview.dataset.size = saved;
      if (status) {
        status.textContent = "Arabic text size saved on this device.";
        window.setTimeout(() => { status.textContent = ""; }, 2200);
      }
    });
  });
})();
