"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustWatchStore = void 0;
exports.mustWatchStore = {
    async getInfoByPlaceMarkId(id) {
        const info = await InfoMongoose.find({ placemarkid: id }).lean();
        return info;
    },
    async getAllInfo() {
        const info = await InfoMongoose.find().lean();
        return info;
    },
    async addInfo(info) {
        const newInfo = new InfoMongoose(info);
        const infoObj = await newInfo.save();
        return this.getInfoById(infoObj._id);
    },
    async getInfoById(id) {
        if (id) {
            const info = await InfoMongoose.findOne({ _id: id }).lean();
            return info;
        }
        return null;
    },
    async deleteInfo(id) {
        try {
            await InfoMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllInfo() {
        await InfoMongoose.deleteMany({});
    },
    async updateInfo(info, updatedInfo) {
        info = await InfoMongoose.findOne({ _id: info._id });
        info.description = updatedInfo.description;
        info.category = updatedInfo.category;
        info.analytics = updatedInfo.analytics;
        await info.save();
    },
};
