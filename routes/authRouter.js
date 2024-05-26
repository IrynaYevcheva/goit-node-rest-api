import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authControllers.js";
import { userSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), register);

authRouter.post("/login", validateBody(userSchema), login);

authRouter.post("/logout", tokenValidation, logout);

authRouter.get("/current", tokenValidation, getCurrentUser);

export default authRouter;
