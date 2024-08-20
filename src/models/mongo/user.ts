import Mongoose from "mongoose";
import { User } from "../../types/tmdb-types";


const { Schema } = Mongoose;

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  type: String,
});

export const UserMongoose = Mongoose.model("User", userSchema);