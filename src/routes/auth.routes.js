import { Router } from "express";
import { register, login, getMe, verifyEmail } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator, validate } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username, email, password}
 * @returns {user: {_id, username, email, verified}} 
*/
authRouter.post("/register", registerValidator, validate, register);

/**
 * @route POST /api/auth/login
 * @desc Login user and return JET token
 * @access Public
 * @body {email, password}
*/
authRouter.post("/login", loginValidator, validate, login);

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's details
 * @access Private
*/
authRouter.get("/get-me", authUser, getMe);

/**
 * @route POST /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @body {username, email, password}
 */
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
