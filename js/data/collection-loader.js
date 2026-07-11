window.UmmibyCollectionLoader = {
  load(collectionId) {
    return new Promise((resolve, reject) => {
      const registry = window.UMMIBY_DUAA_COLLECTION_REGISTRY || {};
      const entry = registry[collectionId];

      if (!entry) {
        reject(new Error(`Unknown collection: ${collectionId}`));
        return;
      }

      window.UMMIBY_DUAA_COLLECTION = null;

      const script = document.createElement("script");
      script.src = entry.dataFile;
      script.async = true;

      script.onload = () => {
        const collection = window.UMMIBY_DUAA_COLLECTION;
        if (!collection) {
          reject(new Error(`Collection file loaded but did not expose data: ${collectionId}`));
          return;
        }
        resolve(collection);
      };

      script.onerror = () => reject(new Error(`Unable to load collection file: ${entry.dataFile}`));
      document.head.appendChild(script);
    });
  }
};
