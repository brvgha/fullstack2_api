"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// @ts-ignore
const mongooseSeeder = __importStar(require("mais-mongoose-seeder"));
const user_mongo_store_js_1 = require("./user-mongo-store.js");
const favourites_mongo_store_js_1 = require("./favourites-mongo-store.js");
const mustWatch_mongo_store_js_1 = require("./mustWatch-mongo-store.js");
const seed_data_js_1 = require("./seed-data.js");
const seedLib = mongooseSeeder.default;
async function seed() {
    const seeder = seedLib(mongoose_1.default);
    const dbData = await seeder.seed(seed_data_js_1.seedData, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
}
function connectMongo(db) {
    const seedChk = false;
    dotenv.config();
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default.connect(process.env.db);
    const mongodb = mongoose_1.default.connection;
    db.userStore = user_mongo_store_js_1.userMongoStore;
    db.placeMarkStore = favourites_mongo_store_js_1.placeMarkMongoStore;
    db.infoStore = mustWatch_mongo_store_js_1.infoMongoStore;
    mongodb.on("error", (err) => {
        console.log(`database connection error: ${err}`);
    });
    mongodb.on("disconnected", () => {
        console.log("database disconnected");
    });
    mongodb.once("open", function () {
        console.log(`database connected to ${mongodb.name} on ${mongodb.host}`);
        if (seedChk)
            seed();
    });
}
