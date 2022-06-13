import { Server } from "@hapi/hapi";
import {
  userUpdateSchema,
  userIdRequiredSchema,
  userIdSchema,
} from "../schemas/user.schema";
import * as UserController from "../controllers/user.controller";
import * as ExerciseController from "../controllers/exercise.controller";

// User routing plugin
exports.plugin = {
  name: "users",
  version: "1.0.0",
  register: async (server: Server, options: any) => {
    // Get user data
    server.route({
      method: "GET",
      path: "/users/{userId?}",
      handler: UserController.get,
      options: {
        auth: "jwt",
        validate: {
          params: userIdSchema,
        },
      },
    });

    // Get user exercise data
    server.route({
      method: "GET",
      path: "/users/{userId}/exercises",
      handler: ExerciseController.getByUserId,
      options: {
        auth: "jwt",
        validate: {
          params: userIdRequiredSchema,
        },
      },
    });

    // Update user data
    server.route({
      method: "PUT",
      path: "/users/{userId}",
      handler: UserController.update,
      options: {
        auth: "jwt",
        validate: {
          params: userIdRequiredSchema,
          payload: userUpdateSchema,
        },
      },
    });

    // Delete user data
    server.route({
      method: "DELETE",
      path: "/users/{userId}",
      handler: UserController.remove,
      options: {
        auth: "jwt",
        validate: {
          params: userIdRequiredSchema,
        },
      },
    });
  },
};
