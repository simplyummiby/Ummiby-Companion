(() => {
  const STORAGE_KEY = 'ummiby.quran.studyLibrary.personal.v1';
  const CATEGORY_ORDER = ['audio', 'video', 'reading', 'books', 'related', 'notes'];
  const CATEGORY_META = {
    audio: { label: 'Audio', icon: '🎧' },
    video: { label: 'Video', icon: '🎥' },
    reading: { label: 'Reading', icon: '📖' },
    books: { label: 'Tafsīr & Books', icon: '📚' },
    related: { label: 'Related Reading', icon: '🔗' },
    notes: { label: 'My Notes', icon: '📝' }
  };

  function safeParse(value, fallback) {
    try { return JSON.parse(value); } catch { return fallback; }
  }

  function readPersonal() {
    const value = safeParse(localStorage.getItem(STORAGE_KEY), []);
    return Array.isArray(value) ? value : [];
  }

  function writePersonal(resources) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  }

  function rangesFromContext(context = {}) {
    if (Array.isArray(context.ranges) && context.ranges.length) {
      return context.ranges.map(range => ({
        surahNumber: Number(range.surahNumber ?? range.surah),
        startAyah: Number(range.startAyah ?? range.start ?? 1),
        endAyah: Number(range.endAyah ?? range.end ?? range.startAyah ?? range.start ?? 1)
      })).filter(range => range.surahNumber && range.startAyah && range.endAyah);
    }
    if (context.surahNumber) {
      return [{
        surahNumber: Number(context.surahNumber),
        startAyah: Number(context.startAyah || 1),
        endAyah: Number(context.endAyah || context.startAyah || 1)
      }];
    }
    return [];
  }

  function targetRanges(target = {}) {
    if (Array.isArray(target.ranges)) return rangesFromContext({ ranges: target.ranges });
    if (target.type === 'surah') return [{ surahNumber: Number(target.surahNumber), startAyah: 1, endAyah: Number.MAX_SAFE_INTEGER }];
    if (target.type === 'ayah-range') return [{ surahNumber: Number(target.surahNumber), startAyah: Number(target.startAyah), endAyah: Number(target.endAyah) }];
    return [];
  }

  function rangesOverlap(a, b) {
    return a.surahNumber === b.surahNumber && a.startAyah <= b.endAyah && b.startAyah <= a.endAyah;
  }

  function resourceMatches(resource, context) {
    const target = resource.target || {};
    if (target.type === 'reading-unit' && context.readingUnitId) return target.readingUnitId === context.readingUnitId;
    const shown = rangesFromContext(context);
    const targets = targetRanges(target);
    return shown.some(range => targets.some(targetRange => rangesOverlap(range, targetRange)));
  }

  function getResources(context) {
    const recommended = window.QURAN_STUDY_LIBRARY_DATA?.resources || [];
    const merged = [...recommended, ...readPersonal()].filter(resource => resourceMatches(resource, context));
    const unique = new Map();
    merged.forEach(resource => unique.set(resource.id, resource));
    return [...unique.values()];
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function categoryFor(resource) {
    if (CATEGORY_META[resource.category]) return resource.category;
    return resource.origin === 'personal' && !resource.url ? 'notes' : 'reading';
  }

  function renderResource(resource) {
    const tags = (resource.tags || []).map(tag => `<span class="study-resource-tag">${escapeHtml(tag)}</span>`).join('');
    const originLabel = resource.origin === 'personal' ? 'Mine' : 'Recommended';
    const action = resource.url
      ? `<a class="study-resource-link" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">🌐 Open on Website <span aria-hidden="true">↗</span></a>`
      : '';
    const remove = resource.origin === 'personal'
      ? `<button class="study-resource-remove" type="button" data-remove-resource="${escapeHtml(resource.id)}">Remove</button>`
      : '';
    return `<article class="study-resource-card ${resource.origin === 'personal' ? 'is-personal' : 'is-recommended'}">
      <div class="study-resource-card-top"><span class="study-resource-origin">${originLabel}</span>${remove}</div>
      <h4>${escapeHtml(resource.title)}</h4>
      ${resource.source ? `<p class="study-resource-source">${escapeHtml(resource.source)}</p>` : ''}
      ${resource.description ? `<p class="study-resource-description">${escapeHtml(resource.description)}</p>` : ''}
      ${tags ? `<div class="study-resource-tags">${tags}</div>` : ''}
      ${action}
    </article>`;
  }

  function renderCategory(category, resources) {
    const meta = CATEGORY_META[category];
    const recommended = resources.filter(resource => resource.origin !== 'personal');
    const personal = resources.filter(resource => resource.origin === 'personal');
    const groups = [];
    if (recommended.length) groups.push(`<div class="study-resource-group"><p class="study-resource-group-label">Recommended</p>${recommended.map(renderResource).join('')}</div>`);
    if (personal.length) groups.push(`<div class="study-resource-group"><p class="study-resource-group-label">My Resources</p>${personal.map(renderResource).join('')}</div>`);
    if (!resources.length) groups.push(`<p class="study-library-empty">No ${meta.label.toLowerCase()} resources have been added for this Qur’an selection yet.</p>`);
    return `<details class="study-library-category" open data-study-category="${category}">
      <summary><span class="study-category-icon" aria-hidden="true">${meta.icon}</span><span><strong>${meta.label}</strong><small>${resources.length} ${resources.length === 1 ? 'resource' : 'resources'}</small></span><span class="study-category-chevron" aria-hidden="true">⌄</span></summary>
      <div class="study-library-category-body">${groups.join('')}</div>
    </details>`;
  }

  function defaultTarget(context) {
    const ranges = rangesFromContext(context);
    if (ranges.length === 1 && ranges[0].startAyah === 1 && context.fullSurah) {
      return { type: 'surah', surahNumber: ranges[0].surahNumber };
    }
    if (ranges.length === 1) {
      return { type: 'ayah-range', surahNumber: ranges[0].surahNumber, startAyah: ranges[0].startAyah, endAyah: ranges[0].endAyah };
    }
    return { type: 'ranges', ranges };
  }

  function ensureModal() {
    let modal = document.getElementById('studyResourceModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'studyResourceModal';
    modal.className = 'study-resource-modal';
    modal.hidden = true;
    modal.innerHTML = `<div class="study-resource-modal-backdrop" data-close-study-modal></div>
      <section class="study-resource-modal-card" role="dialog" aria-modal="true" aria-labelledby="studyResourceModalTitle">
        <button class="study-resource-modal-close" type="button" data-close-study-modal aria-label="Close">×</button>
        <p class="eyebrow">My Study Library</p>
        <h2 id="studyResourceModalTitle">Save My Resource</h2>
        <form id="studyResourceForm">
          <label>Type<select name="category"><option value="audio">Audio</option><option value="video">Video</option><option value="reading" selected>Reading</option><option value="books">Tafsīr & Books</option><option value="notes">My Note</option></select></label>
          <label>Title<input name="title" required maxlength="160"></label>
          <label>Source or speaker <span>(optional)</span><input name="source" maxlength="120"></label>
          <label>Website link <span>(optional)</span><input name="url" type="url" placeholder="https://"></label>
          <label>My note or description <span>(optional)</span><textarea name="description" rows="4" maxlength="600"></textarea></label>
          <div class="study-resource-modal-actions"><button type="button" class="study-modal-secondary" data-close-study-modal>Cancel</button><button type="submit" class="study-modal-primary">Save My Resource</button></div>
        </form>
      </section>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', event => {
      if (event.target.closest('[data-close-study-modal]')) modal.hidden = true;
    });
    return modal;
  }

  function render(options = {}) {
    const container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
    const shortcut = typeof options.shortcut === 'string' ? document.querySelector(options.shortcut) : options.shortcut;
    if (!container) return null;
    const context = options.context || {};
    const sectionId = options.sectionId || 'studyLibrary';
    container.id = sectionId;

    function paint() {
      const resources = getResources(context);
      const grouped = Object.fromEntries(CATEGORY_ORDER.map(category => [category, []]));
      resources.forEach(resource => grouped[categoryFor(resource)].push(resource));
      container.classList.add('study-library');
      container.innerHTML = `<div class="study-library-heading">
        <div><h2>📚 Library (${resources.length})</h2><p>Curated and personal resources connected to this Qur’an selection.</p></div>
        <div class="study-library-view-actions"><button type="button" data-study-expand>Expand All</button><span aria-hidden="true">•</span><button type="button" data-study-collapse>Collapse All</button></div>
      </div>
      <div class="study-library-categories">${CATEGORY_ORDER.map(category => renderCategory(category, grouped[category])).join('')}</div>
      <button class="study-library-add" type="button" data-add-study-resource>+ Save My Resource</button>`;

      if (shortcut) {
        shortcut.innerHTML = `📚 Library (${resources.length})`;
        shortcut.setAttribute('href', `#${sectionId}`);
        shortcut.hidden = false;
      }

      container.querySelector('[data-study-expand]')?.addEventListener('click', () => container.querySelectorAll('details').forEach(detail => detail.open = true));
      container.querySelector('[data-study-collapse]')?.addEventListener('click', () => container.querySelectorAll('details').forEach(detail => detail.open = false));
      container.querySelector('[data-add-study-resource]')?.addEventListener('click', () => {
        const modal = ensureModal();
        modal.hidden = false;
        const form = modal.querySelector('#studyResourceForm');
        form.reset();
        form.onsubmit = event => {
          event.preventDefault();
          const data = new FormData(form);
          const personal = readPersonal();
          personal.push({
            id: `personal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            origin: 'personal',
            category: data.get('category'),
            target: defaultTarget(context),
            title: String(data.get('title') || '').trim(),
            source: String(data.get('source') || '').trim(),
            url: String(data.get('url') || '').trim(),
            description: String(data.get('description') || '').trim(),
            tags: []
          });
          writePersonal(personal);
          modal.hidden = true;
          paint();
        };
        setTimeout(() => form.elements.title?.focus(), 30);
      });
      container.querySelectorAll('[data-remove-resource]').forEach(button => button.addEventListener('click', () => {
        const id = button.dataset.removeResource;
        if (!confirm('Remove this resource from My Resources?')) return;
        writePersonal(readPersonal().filter(resource => resource.id !== id));
        paint();
      }));
    }

    paint();
    if (shortcut) shortcut.addEventListener('click', event => {
      event.preventDefault();
      container.querySelectorAll('details').forEach(detail => detail.open = false);
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      container.classList.add('study-library-highlight');
      setTimeout(() => container.classList.remove('study-library-highlight'), 800);
    });
    return { refresh: paint, getResources: () => getResources(context) };
  }

  window.QURAN_STUDY_LIBRARY = { render, getResources, readPersonal, storageKey: STORAGE_KEY };
})();
