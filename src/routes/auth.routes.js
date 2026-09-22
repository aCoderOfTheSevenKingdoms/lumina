import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerValidator, validate } from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, validate, register);

export default authRouter;
