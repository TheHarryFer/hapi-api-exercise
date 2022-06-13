import { Server } from "@hapi/hapi";
import {
  exerciseAddSchema,
  exerciseUpdateSchema,
  exerciseIdRequiredSchema,
  exerciseIdSchema,
} from "../schemas/exercise.schema";
import * as ExerciseController from "../controllers/exercise.controller";

// Exercise routing plugin
exports.plugin = {
  name: "exercises",
  version: "1.0.0",
  register: async (server: Server, options: any) => {
    // Add exercise data
    server.route({
      method: "POST",
      path: "/exercises",
      handler: ExerciseController.add,
      options: {
        auth: "jwt",
        validate: {
          payload: exerciseAddSchema,
        },
      },
    });

    // Get exercise data
    server.route({
      method: "GET",
      path: "/exercises/{exerciseId?}",
      handler: ExerciseController.get,
      options: {
        auth: "jwt",
        validate: {
          params: exerciseIdSchema,
        },
      },
    });

    // Update exercise data
    server.route({
      method: "PUT",
      path: "/exercises/{exerciseId}",
      handler: ExerciseController.update,
      options: {
        auth: "jwt",
        validate: {
          params: exerciseIdRequiredSchema,
          payload: exerciseUpdateSchema,
        },
      },
    });

    // Delete exercise data
    server.route({
      method: "DELETE",
      path: "/exercises/{exerciseId}",
      handler: ExerciseController.remove,
      options: {
        auth: "jwt",
        validate: {
          params: exerciseIdRequiredSchema,
        },
      },
    });
  },
};
