(function () {
  const fallbackIcon = "../assets/collections/fallback/icon.svg";
  const fallbackBanner = "../assets/collections/fallback/banner.svg";

  function entryFor(id) {
    return (window.UMMIBY_DUAA_COLLECTION_REGISTRY || {})[id] || null;
  }

  function safeArtwork(entry, kind) {
    const artwork = entry?.artwork || {};
    return artwork[kind] || (kind === "banner" ? fallbackBanner : fallbackIcon);
  }

  function hydrateImage(element, entry, kind) {
    if (!element) return;
    const image = document.createElement("img");
    image.src = safeArtwork(entry, kind);
    image.alt = element.dataset.decorative === "true" ? "" : (entry?.artwork?.[`${kind}Alt`] || `${entry?.title || "Duaa collection"} artwork`);
    image.loading = kind === "banner" ? "eager" : "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      const fallback = kind === "banner" ? fallbackBanner : fallbackIcon;
      if (!image.src.endsWith(fallback.replace("..", ""))) image.src = fallback;
    }, { once: true });
    element.replaceChildren(image);
  }

  function hydrate(root = document) {
    root.querySelectorAll("[data-collection-icon]").forEach((element) => {
      hydrateImage(element, entryFor(element.dataset.collectionIcon), "icon");
    });
    root.querySelectorAll("[data-collection-banner]").forEach((element) => {
      hydrateImage(element, entryFor(element.dataset.collectionBanner), "banner");
    });
  }

  window.UmmibyCollectionArtwork = { entryFor, hydrate, hydrateImage, safeArtwork };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => hydrate());
  } else {
    hydrate();
  }
})();
