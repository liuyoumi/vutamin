import WebStorageCache from "web-storage-cache";

export const useCache = (storage = "localStorage") => {
  const wsCache = new WebStorageCache({
    storage,
  });
  
  return {
    wsCache,
  };
};