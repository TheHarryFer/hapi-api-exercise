import Joi from "joi";

// Validation schema for add location data
export const locationAddSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  address: Joi.string().min(1).max(255).required(),
  longtitude: Joi.number().required(),
  latitude: Joi.number().required(),
});

// Validation schema for update location data
export const locationUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  address: Joi.string().min(1).max(255),
  longtitude: Joi.number(),
  latitude: Joi.number(),
});

// Validation schema for required location id
export const locationIdRequiredSchema = Joi.object({
  locationId: Joi.number().integer().min(1).required(),
});

// Validation schema for location id
export const locationIdSchema = Joi.object({
  locationId: Joi.number().integer().min(1),
});
