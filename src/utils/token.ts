import jwt from "jsonwebtoken";
import { secretKey } from "../config/token.config";

// Create a token
export const createToken = (payload: string | object): string => {
  return jwt.sign(payload, secretKey, { expiresIn: "2h" });
};
