import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.ts";
import { Request, ResponseToolkit } from "@hapi/hapi";
import * as passwordHash from 'password-hash';
import { User } from "../types/tmdb-types.js";

export const userApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore.getAllUsers();
        return h.response(users).code(200);
      } catch (err: any) {
        return Boom.serverUnavailable("Database Error");
      }
    }
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = await db.userStore.getUserById(request.params.id) ;
        if (user === null) {
          return Boom.notFound("No User with this id");
        }
        return h.response(user).code(200);
      } catch (err: any) {
        return Boom.serverUnavailable("No User with this id");
      }
    }
  },

  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const userPayload = request.payload as User;
        userPayload.password = passwordHash.generate(userPayload.password);
        const user = (await db.userStore.addUser(userPayload));
        return h.response({ success: true }).code(201);
        // return Boom.badImplementation("error creating user");
      } catch (err: any) {
        return Boom.serverUnavailable("Database Error");
      }
    }
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err: any) {
        return Boom.serverUnavailable("Database Error");
      }
    }
  },

  authenticate: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const userPayload = request.payload as User;
      try {
        const user = (await db.userStore.getUserByEmail(userPayload.email));
        if (user === null) {
          return Boom.unauthorized("User not found");
        }
        const passwordsMatch: boolean = passwordHash.verify(userPayload.password, user.password);
        if (!passwordsMatch) return Boom.unauthorized("Invalid password");
        const token = createToken(user);
        const data = {success: true,name: `${user.firstName} ${user.lastName}`, token: token, _id: user._id };
        return h.response(data).code(201);
      } catch (err: any) {
        return Boom.serverUnavailable("Database Error");
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
