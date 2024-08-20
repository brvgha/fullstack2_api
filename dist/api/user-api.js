"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const db_js_1 = require("../models/db.js");
const jwt_utils_js_1 = require("./jwt-utils.js");
const passwordHash = __importStar(require("password-hash"));
exports.userApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const users = await db_js_1.db.userStore.getAllUsers();
                return h.response(users).code(200);
            }
            catch (err) {
                return boom_1.default.serverUnavailable("Database Error");
            }
        }
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const user = await db_js_1.db.userStore.getUserById(request.params.id);
                if (user === null) {
                    return boom_1.default.notFound("No User with this id");
                }
                return h.response(user).code(200);
            }
            catch (err) {
                return boom_1.default.serverUnavailable("No User with this id");
            }
        }
    },
    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const userPayload = request.payload;
                userPayload.password = passwordHash.generate(userPayload.password);
                const user = (await db_js_1.db.userStore.addUser(userPayload));
                return h.response({ success: true }).code(201);
                // return Boom.badImplementation("error creating user");
            }
            catch (err) {
                return boom_1.default.serverUnavailable("Database Error");
            }
        }
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db_js_1.db.userStore.deleteAll();
                return h.response().code(204);
            }
            catch (err) {
                return boom_1.default.serverUnavailable("Database Error");
            }
        }
    },
    authenticate: {
        auth: false,
        handler: async function (request, h) {
            const userPayload = request.payload;
            try {
                const user = (await db_js_1.db.userStore.getUserByEmail(userPayload.email));
                if (user === null) {
                    return boom_1.default.unauthorized("User not found");
                }
                const passwordsMatch = passwordHash.verify(userPayload.password, user.password);
                if (!passwordsMatch)
                    return boom_1.default.unauthorized("Invalid password");
                const token = (0, jwt_utils_js_1.createToken)(user);
                const data = { success: true, name: `${user.firstName} ${user.lastName}`, token: token, _id: user._id };
                return h.response(data).code(201);
            }
            catch (err) {
                return boom_1.default.serverUnavailable("Database Error");
            }
        }
    },
    /*
    googleLogin: {
      auth: false,
      handler: async (request: Request, h: ResponseToolkit) => {
            try {
              const code = request.query.code;
              console.log(code)
              const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                  code: code,
                  client_id: process.env.client_id,
                  client_secret: process.env.client_secret,
                  redirect_uri: process.env.redirect_uri,
                  grant_type: 'authorization_code'
              });
              const accessToken = tokenResponse.data.access_token;
              const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              });
              const userInfo = userInfoResponse.data;
              let user = await db.userStore.getUserByEmail(userInfo.email);
              if (!user) {
                const newUser = {
                  firstName: userInfo.given_name,
                  lastName: userInfo.family_name,
                  email: userInfo.email,
                  password: ""
                }
                user = await db.userStore.addUser(newUser);
              }
              
              const token = createToken(user)
  
              //const redirectUrl = `http://localhost:5173/placemark/${user._id}`;
              const data = { name: `${user.firstName} ${user.lastName}`, _id: user._id, token: token };
              
              const cookieValue = encodeURIComponent(JSON.stringify(data));
              //h.state("placemark-user", cookieValue);
              const redirectUrl = `https://assignment2-svelte.netlify.app/loading?userData=${cookieValue}`;
              return h.redirect(redirectUrl);
          } catch (error) {
              console.error('OAuth callback error:', error);
              return h.response('OAuth callback error').code(500);
          }
      }
    }, */
};
