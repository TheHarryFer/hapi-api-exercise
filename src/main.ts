import "reflect-metadata";
import "dotenv/config";
import { init, start } from "./server";

// Initialize server
init().then(() => start());
