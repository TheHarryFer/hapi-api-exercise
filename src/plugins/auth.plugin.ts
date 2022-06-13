import { Server } from "@hapi/hapi";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import * as AuthController from "../controllers/auth.controller";

// Auth routing plugin
exports.plugin = {
  name: "auth",
  version: "1.0.0",
  register: async (server: Server, options: any) => {
    // Register new user
    server.route({
      method: "POST",
      path: "/register",
      handler: AuthController.register,
      options: {
        validate: {
          payload: registerSchema,
        },
      },
    });

    // Login user
    server.route({
      method: "POST",
      path: "/login",
      handler: AuthController.login,
      options: {
        validate: {
          payload: loginSchema,
        },
      },
    });
  },
};
