import Mongoose from "mongoose";
import { Favourites } from "../../types/tmdb-types";

const { Schema } = Mongoose;

const favouriteSchema = new Schema<Favourites>({
  name: String,
  id: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const FavouritesMongoose = Mongoose.model("Favourites", favouriteSchema);