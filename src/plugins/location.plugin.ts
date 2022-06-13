import { Server } from "@hapi/hapi";
import {
  locationAddSchema,
  locationUpdateSchema,
  locationIdRequiredSchema,
  locationIdSchema,
} from "../schemas/location.schema";
import * as LocationController from "../controllers/location.controller";
import * as ExerciseController from "../controllers/exercise.controller";

// Location routing plugin
exports.plugin = {
  name: "locations",
  version: "1.0.0",
  register: async (server: Server, options: any) => {
    // Add location data
    server.route({
      method: "POST",
      path: "/locations",
      handler: LocationController.add,
      options: {
        auth: "jwt",
        validate: {
          payload: locationAddSchema,
        },
      },
    });

    // Get location data
    server.route({
      method: "GET",
      path: "/locations/{locationId?}",
      handler: LocationController.get,
      options: {
        auth: "jwt",
        validate: {
          params: locationIdSchema,
        },
      },
    });

    // Get location exercise data
    server.route({
      method: "GET",
      path: "/locations/{locationId}/exercises",
      handler: ExerciseController.getByLocationId,
      options: {
        auth: "jwt",
        validate: {
          params: locationIdRequiredSchema,
        },
      },
    });

    // Update location data
    server.route({
      method: "PUT",
      path: "/locations/{locationId}",
      handler: LocationController.update,
      options: {
        auth: "jwt",
        validate: {
          params: locationIdRequiredSchema,
          payload: locationUpdateSchema,
        },
      },
    });

    // Delete location data
    server.route({
      method: "DELETE",
      path: "/locations/{locationId}",
      handler: LocationController.remove,
      options: {
        auth: "jwt",
        validate: {
          params: locationIdRequiredSchema,
        },
      },
    });
  },
};
