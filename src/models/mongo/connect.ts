import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { Db } from "../../types/tmdb-types.js";
import { userMongoStore } from "./user-mongo-store.js";
import { placeMarkMongoStore } from "./favourites-mongo-store.js";
import { infoMongoStore } from "./mustWatch-mongo-store.js";
import { seedData } from "./seed-data.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo(db: Db) {
  const seedChk = false;
  dotenv.config();
  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db as string);
  const mongodb = Mongoose.connection;

  db.userStore = userMongoStore;
  db.placeMarkStore = placeMarkMongoStore;
  db.infoStore = infoMongoStore;

  mongodb.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  mongodb.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongodb.once("open", function () {
    console.log(`database connected to ${mongodb.name} on ${mongodb.host}`);
    if (seedChk) seed();
  });
}