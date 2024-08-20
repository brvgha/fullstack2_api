"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const user_api_1 = require("./api/user-api");
exports.apiRoutes = [
    { method: "GET", path: "/api/users", config: user_api_1.userApi.find },
    { method: "POST", path: "/api/users", config: user_api_1.userApi.create },
    { method: "DELETE", path: "/api/users", config: user_api_1.userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: user_api_1.userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: user_api_1.userApi.authenticate },
    { method: "GET", path: "/api/callback", config: user_api_1.userApi.googleLogin },
];
exports.default = exports.apiRoutes;
