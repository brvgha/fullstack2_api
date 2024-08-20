import { UserMongoose } from "./user.js";
import { User } from "../../types/tmdb-types.js";

export const userMongoStore = {
  async getAllUsers(): Promise<User[]>{
    const users = await UserMongoose.find().lean();
    return users;
  },

  async getUserById(id: string): Promise<User | null> {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user: User): Promise<User | null> {
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id: string) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error: any) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await UserMongoose.deleteMany({});
  },

  async updateUser(userid: string, updatedUser: any) {
    const user = await UserMongoose.findOne({ _id: userid }) as any;
    const defaultUser = await UserMongoose.findOne({ _id: userid }) as any;
    if (updatedUser.firstName) {
      console.log(1)
      user.firstName = updatedUser.firstName;
    } else {
      user.firstName = defaultUser.firstName;
    }
    if (updatedUser.lastName) {
      user.lastName = updatedUser.lastName;
    } else {
      user.lastName = defaultUser.lastName;
    }
    if (updatedUser.password) {
      user.password = updatedUser.password;
    } else {
      user.password = defaultUser.password;
    }
    await user.save();
    return user;
  }
};