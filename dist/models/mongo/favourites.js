"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const favouriteSchema = new Schema({
    name: String,
    id: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.FavouritesMongoose = mongoose_1.default.model("Favourites", favouriteSchema);
