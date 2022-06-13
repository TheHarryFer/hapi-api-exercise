import Joi from "joi";

// Validation schema for user registration
export const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(64).required(),
  lastname: Joi.string().min(3).max(64).required(),
  username: Joi.string().alphanum().min(3).max(16).required(),
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().max(255).required(),
});

// Validation schema for user login
export const loginSchema = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().min(1).required(),
  }),

  Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(1).required(),
  })
);
