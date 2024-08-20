import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import path from "path";
import Handlebars from "handlebars";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { fileURLToPath } from "url";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";
import { connectDB } from "./models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config() as any;
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "TMDB-App API",
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
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: { cors: true },
  });
  await server.register([
    Inert as any,
    Vision as any,
    Cookie as any,
    jwt,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
  }]);
  // server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });
  server.auth.default("session");

  connectDB("mongo");
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
