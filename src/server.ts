import Hapi from "@hapi/hapi";
import glob from "glob";
import { Server, Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { AppDataSource } from "./data-source";
import { secretKey } from "./config/token.config";
import { verifyUser } from "./utils/verifyUser";

// Server instance
export let server: Server;

// Initialize server and register all plugins
export const init = async (): Promise<Server> => {
  server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  });

  // Register plugins
  glob("./**/*.plugin.ts", (err, files: string[]) => {
    files.forEach(async (plugin) => {
      await server.register(require(plugin.replace(/\/src|.ts/g, "")), {
        routes: {
          prefix: "/api",
        },
      });
    });
  });

  // Set authentication
  await server.register(require("hapi-auth-jwt2"));
  server.auth.strategy("jwt", "jwt", { key: secretKey, validate: verifyUser });

  // Handle invalid routing
  server.route({
    method: "*",
    path: "/{any*}",
    handler: (request: Request, h: ResponseToolkit): ResponseObject => {
      return h.response("404 Error! Page Not Found!");
    },
  });

  return server;
};

// Start server
export const start = async (): Promise<void> => {
  console.log(
    `[${new Date().toISOString()}] Starting server listening on ${
      server.settings.host
    }:${server.settings.port}`
  );

  server.start();
  return connectDatabase();
};

// Connect database
export const connectDatabase = async (): Promise<void> => {
  AppDataSource.initialize()
    .then(() => {})
    .catch((error) => console.log(error));
};

// Handle rejection
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
