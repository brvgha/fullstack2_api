"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMongoStore = void 0;
const user_js_1 = require("./user.js");
exports.userMongoStore = {
    async getAllUsers() {
        const users = await user_js_1.UserMongoose.find().lean();
        return users;
    },
    async getUserById(id) {
        if (id) {
            const user = await user_js_1.UserMongoose.findOne({ _id: id }).lean();
            return user;
        }
        return null;
    },
    async addUser(user) {
        const newUser = new user_js_1.UserMongoose(user);
        const userObj = await newUser.save();
        const u = await this.getUserById(userObj._id);
        return u;
    },
    async getUserByEmail(email) {
        const user = await user_js_1.UserMongoose.findOne({ email: email }).lean();
        return user;
    },
    async deleteUserById(id) {
        try {
            await user_js_1.UserMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAll() {
        await user_js_1.UserMongoose.deleteMany({});
    },
    async updateUser(userid, updatedUser) {
        const user = await user_js_1.UserMongoose.findOne({ _id: userid });
        const defaultUser = await user_js_1.UserMongoose.findOne({ _id: userid });
        if (updatedUser.firstName) {
            console.log(1);
            user.firstName = updatedUser.firstName;
        }
        else {
            user.firstName = defaultUser.firstName;
        }
        if (updatedUser.lastName) {
            user.lastName = updatedUser.lastName;
        }
        else {
            user.lastName = defaultUser.lastName;
        }
        if (updatedUser.password) {
            user.password = updatedUser.password;
        }
        else {
            user.password = defaultUser.password;
        }
        await user.save();
        return user;
    }
};
