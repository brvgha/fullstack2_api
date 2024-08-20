import { MustWatchMongoose } from "./mustWatch.js";
import { MustWatch } from "../../types/tmdb-types.js";

export const mustWatchStore = {
  async getInfoByPlaceMarkId(id: string) : Promise<Info[]> {
    const info = await InfoMongoose.find({ placemarkid: id }).lean();
    return info;
  },
  
  async getAllInfo(): Promise<Info[]> {
    const info = await InfoMongoose.find().lean();
    return info;
  },

  async addInfo(info: Info): Promise<Info | null> {
    const newInfo = new InfoMongoose(info);
    const infoObj = await newInfo.save();
    return this.getInfoById(infoObj._id);
  },

  async getInfoById(id: string): Promise<Info | null> {
    if (id) {
      const info = await InfoMongoose.findOne({ _id: id }).lean();
      return info;
    }
    return null;
  },

  async deleteInfo(id: string) {
    try {
      await InfoMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllInfo() {
    await InfoMongoose.deleteMany({});
  },

  async updateInfo(info: any, updatedInfo: any) {
    info = await InfoMongoose.findOne({ _id: info._id });
    info.description = updatedInfo.description;
    info.category = updatedInfo.category;
    info.analytics = updatedInfo.analytics;
    await info.save();
  },
};