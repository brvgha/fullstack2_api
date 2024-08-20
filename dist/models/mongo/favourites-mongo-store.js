"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteStore = void 0;
exports.favouriteStore = {
    async getAllPlaceMarks() {
        const placemarks = await PlaceMarkMongoose.find().lean();
        return placemarks;
    },
    async getPlaceMarkById(id) {
        if (id) {
            const placemark = await PlaceMarkMongoose.findOne({ _id: id }).lean();
            if (placemark) {
                placemark.infos = await infoMongoStore.getInfoByPlaceMarkId(placemark._id);
            }
            return placemark;
        }
        return null;
    },
    async addPlaceMark(placemark) {
        const newPlaceMark = new PlaceMarkMongoose(placemark);
        const placemarkObj = await newPlaceMark.save();
        return this.getPlaceMarkById(placemarkObj._id);
    },
    async getUserPlaceMarks(id) {
        const placemark = await PlaceMarkMongoose.find({ userid: id }).lean();
        return placemark;
    },
    async deletePlaceMarkById(id) {
        try {
            if (id) {
                const infos = await infoMongoStore.getInfoByPlaceMarkId(id);
                for (let i = 0; i < infos.length; i += 1) {
                    // eslint-disable-next-line no-await-in-loop
                    await InfoMongoose.deleteOne({ _id: infos[i]._id });
                }
            }
            await PlaceMarkMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllPlaceMarks() {
        await PlaceMarkMongoose.deleteMany({});
    },
    async updatePlaceMark(placemarkid, updatedPlaceMark) {
        const placemark = await PlaceMarkMongoose.findOne({ _id: placemarkid });
        placemark.name = updatedPlaceMark.name;
        placemark.city = updatedPlaceMark.city;
        placemark.country = updatedPlaceMark.country;
        placemark.img = updatedPlaceMark.img;
        placemark.lat = updatedPlaceMark.lat,
            placemark.lng = updatedPlaceMark.lng,
            placemark.weather = updatedPlaceMark.weather,
            placemark.tempC = updatedPlaceMark.tempC,
            placemark.tempF = updatedPlaceMark.tempF,
            placemark.min_temp = updatedPlaceMark.min_temp,
            placemark.max_temp = updatedPlaceMark.max_temp,
            placemark.wind_spd = updatedPlaceMark.wind_spd,
            placemark.wind_direction_deg = updatedPlaceMark.wind_direction_deg,
            placemark.wind_direction_txt = updatedPlaceMark.wind_direction_txt,
            placemark.humidity = updatedPlaceMark.humidity,
            placemark.img = updatedPlaceMark.img;
        placemark.forecast = [],
            await placemark.save();
        return placemark;
    }
};
