"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.connectDB = connectDB;
// memory storage
/*import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/placemark-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";
// json storage
import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placemark-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js"; */
// mongo storage
const connect_js_1 = require("./mongo/connect.js");
exports.db = {
    userStore: null,
    favouritesStore: null,
    mustWatchStore: null,
};
function connectDB(storeType) {
    switch (storeType) {
        case "mongo":
            (0, connect_js_1.connectMongo)(exports.db);
            break;
        default:
    }
}
;
