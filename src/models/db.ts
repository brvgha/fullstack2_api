// memory storage
/*import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/placemark-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";
// json storage
import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placemark-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js"; */
// mongo storage
import { connectMongo } from "./mongo/connect.js";

import { Db } from "../types/tmdb-types.js";

export const db: Db = {
  userStore: null,
  favouritesStore: null,
  mustWatchStore: null,
};

export function connectDB(storeType: string) {
  switch (storeType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
  }
};
