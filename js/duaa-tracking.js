(function () {
  "use strict";

  const STORAGE_KEY = "ummibyDuaaDailyTracking";
  const SCHEMA_VERSION = 1;
  const TRACKED_COLLECTIONS = Object.freeze(["morning", "evening", "sleep"]);
  const LEGACY_PREFIX = "ummibyDuaaProgress:";
  const LEGACY_MIGRATION = "legacyProgressV1";

  function localDateKey(date = new Date()) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  function blankStore() {
    return {
      schemaVersion: SCHEMA_VERSION,
      days: {},
      migrations: {}
    };
  }

  function uniqueStrings(value) {
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((item) => typeof item === "string" && item.trim()))];
  }

  function normalizeStore(value) {
    const store = value && typeof value === "object" ? value : blankStore();
    const normalized = blankStore();
    normalized.migrations = store.migrations && typeof store.migrations === "object" ? { ...store.migrations } : {};

    if (store.days && typeof store.days === "object") {
      Object.entries(store.days).forEach(([date, day]) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !day || typeof day !== "object") return;
        const normalizedDay = {};
        TRACKED_COLLECTIONS.forEach((collectionId) => {
          const record = day[collectionId];
          if (!record || typeof record !== "object") return;
          normalizedDay[collectionId] = {
            completed: uniqueStrings(record.completed),
            updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : ""
          };
        });
        if (Object.keys(normalizedDay).length) normalized.days[date] = normalizedDay;
      });
    }

    return normalized;
  }

  function readStore() {
    try {
      return normalizeStore(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
    } catch {
      return blankStore();
    }
  }

  function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeStore(store)));
  }

  function migrateLegacyProgress() {
    const store = readStore();
    if (store.migrations[LEGACY_MIGRATION]) return store;

    TRACKED_COLLECTIONS.forEach((collectionId) => {
      const key = `${LEGACY_PREFIX}${collectionId}`;
      let legacy = null;
      try {
        legacy = JSON.parse(localStorage.getItem(key) || "null");
      } catch {
        legacy = null;
      }

      if (!legacy || !Array.isArray(legacy.completed)) return;
      const date = /^\d{4}-\d{2}-\d{2}$/.test(legacy.date || "") ? legacy.date : localDateKey();
      store.days[date] ||= {};
      const existing = uniqueStrings(store.days[date][collectionId]?.completed);
      store.days[date][collectionId] = {
        completed: [...new Set([...existing, ...uniqueStrings(legacy.completed)])],
        updatedAt: new Date().toISOString()
      };
      localStorage.removeItem(key);
    });

    store.migrations[LEGACY_MIGRATION] = true;
    writeStore(store);
    return store;
  }

  function getCompleted(collectionId, date = localDateKey()) {
    if (!TRACKED_COLLECTIONS.includes(collectionId)) return [];
    const store = migrateLegacyProgress();
    return uniqueStrings(store.days[date]?.[collectionId]?.completed);
  }

  function setCompleted(collectionId, completed, date = localDateKey()) {
    if (!TRACKED_COLLECTIONS.includes(collectionId)) return [];
    const store = migrateLegacyProgress();
    store.days[date] ||= {};
    store.days[date][collectionId] = {
      completed: uniqueStrings(completed),
      updatedAt: new Date().toISOString()
    };
    writeStore(store);
    return store.days[date][collectionId].completed;
  }

  function toggle(collectionId, duaaId, date = localDateKey()) {
    const completed = new Set(getCompleted(collectionId, date));
    if (completed.has(duaaId)) completed.delete(duaaId);
    else completed.add(duaaId);
    return setCompleted(collectionId, [...completed], date);
  }

  function resetToday(collectionId) {
    return setCompleted(collectionId, [], localDateKey());
  }

  function summary(collectionId, total, date = localDateKey()) {
    const completed = getCompleted(collectionId, date);
    const safeTotal = Math.max(0, Number(total) || 0);
    const count = safeTotal ? Math.min(completed.length, safeTotal) : completed.length;
    return {
      collectionId,
      date,
      completed,
      count,
      total: safeTotal,
      percent: safeTotal ? Math.round((count / safeTotal) * 100) : 0,
      isComplete: safeTotal > 0 && count === safeTotal
    };
  }

  window.UmmibyDuaaTracking = Object.freeze({
    storageKey: STORAGE_KEY,
    trackedCollections: TRACKED_COLLECTIONS,
    localDateKey,
    migrateLegacyProgress,
    getCompleted,
    setCompleted,
    toggle,
    resetToday,
    summary,
    readHistory: () => migrateLegacyProgress().days
  });

  migrateLegacyProgress();
})();
