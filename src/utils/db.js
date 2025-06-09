import { openDB } from "idb";

export const initDB = async () => {
  return openDB("CineZoneDB", 4, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", {
          keyPath: "username",
        });
        userStore.createIndex("username", "username", { unique: true });
        userStore.createIndex("email", "email", { unique: true });
      }

      if (!db.objectStoreNames.contains("watchlists")) {
        const watchlistStore = db.createObjectStore("watchlists", {
          keyPath: ["username", "id"],
        });
        watchlistStore.createIndex("username", "username");
      }
    },
  });
};
