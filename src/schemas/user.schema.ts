import Joi from "joi";

// Validation schema for update user data
export const userUpdateSchema = Joi.object({
  firstname: Joi.string().min(3).max(64),
  lastname: Joi.string().min(3).max(64),
  username: Joi.string().alphanum().min(3).max(16),
  email: Joi.string().email().max(255),
});

// Validation schema for required user id
export const userIdRequiredSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
});

// Validation schema for user id
export const userIdSchema = Joi.object({
  userId: Joi.number().integer().min(1),
});
