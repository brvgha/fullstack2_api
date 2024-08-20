import Mongoose from "mongoose";
import { MustWatch } from "../../types/tmdb-types";

const { Schema } = Mongoose;

const mustWatchSchema = new Schema<MustWatch>({
  name: String,
  id: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const MustWatchMongoose = Mongoose.model("MustWatch", mustWatchSchema);