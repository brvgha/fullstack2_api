"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.decodeToken = decodeToken;
exports.validate = validate;
exports.getUserIdFromRequest = getUserIdFromRequest;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("../models/db.js");
dotenv_1.default.config();
const cookiePassword = process.env.cookie_password;
function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        scope: []
    };
    const options = {
        algorithm: "HS256",
        expiresIn: "1h",
    };
    return jsonwebtoken_1.default.sign(payload, cookiePassword, options);
}
function decodeToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, cookiePassword);
        return {
            id: decoded.id,
            email: decoded.email,
            scope: decoded.scope,
        };
    }
    catch (e) {
        console.log(e.message);
    }
    return null;
}
async function validate(decoded) {
    const user = await db_js_1.db.userStore.getUserById(decoded.id);
    if (!user) {
        return { isValid: false };
    }
    return { isValid: true, credentials: user };
}
function getUserIdFromRequest(request) {
    let userId = null;
    try {
        const { authorization } = request.headers;
        const token = authorization.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, "b20104109fitzpatrickHDipComputerScience");
        userId = decodedToken.id;
    }
    catch (e) {
        userId = null;
    }
    return userId;
}
