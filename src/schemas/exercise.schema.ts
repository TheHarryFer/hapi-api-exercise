import Joi from "joi";

// Validation schema for add exercise data
export const exerciseAddSchema = Joi.object({
  type: Joi.string().min(1).max(64).required(),
  user: Joi.number().integer().min(1).required(),
  duration: Joi.number().min(0).required(),
  calories: Joi.number().min(0).required(),
  location: Joi.number().integer().min(1).required(),
});

// Validation schema for update exercise data
export const exerciseUpdateSchema = Joi.object({
  type: Joi.string().min(1).max(64),
  user: Joi.number().integer().min(1),
  duration: Joi.number().min(0),
  calories: Joi.number().min(0),
  location: Joi.number().integer().min(1),
});

// Validation schema for required exercise id
export const exerciseIdRequiredSchema = Joi.object({
  exerciseId: Joi.number().integer().min(1).required(),
});

// Validation schema for exercise id
export const exerciseIdSchema = Joi.object({
  exerciseId: Joi.number().integer().min(1),
});
