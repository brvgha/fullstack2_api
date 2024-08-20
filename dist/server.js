"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vision_1 = __importDefault(require("@hapi/vision"));
const hapi_1 = __importDefault(require("@hapi/hapi"));
const cookie_1 = __importDefault(require("@hapi/cookie"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const inert_1 = __importDefault(require("@hapi/inert"));
const hapi_swagger_1 = __importDefault(require("hapi-swagger"));
const hapi_auth_jwt2_1 = __importDefault(require("hapi-auth-jwt2"));
const url_1 = require("url");
const api_routes_js_1 = require("./api-routes.js");
const jwt_utils_js_1 = require("./api/jwt-utils.js");
const db_js_1 = require("./models/db.js");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const result = dotenv_1.default.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}
const swaggerOptions = {
    info: {
        title: "PlaceMark API",
        version: "0.3",
    },
    securityDefinitions: {
        jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },
    security: [{ jwt: [] }]
};
async function init() {
    const server = hapi_1.default.server({
        port: process.env.PORT || 3000,
        routes: { cors: true },
    });
    await server.register([
        inert_1.default,
        vision_1.default,
        cookie_1.default,
        hapi_auth_jwt2_1.default,
        {
            plugin: hapi_swagger_1.default,
            options: swaggerOptions
        }
    ]);
    // server.validator(Joi);
    server.views({
        engines: {
            hbs: handlebars_1.default,
        },
        relativeTo: __dirname,
        path: "./views",
        layoutPath: "./views/layouts",
        partialsPath: "./views/partials",
        layout: true,
        isCached: false,
    });
    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: jwt_utils_js_1.validate,
        verifyOptions: { algorithms: ["HS256"] }
    });
    server.auth.default("session");
    (0, db_js_1.connectDB)("mongo");
    server.route(webRoutes);
    server.route(api_routes_js_1.apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
init();
