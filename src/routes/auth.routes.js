import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";

import { userSchema, authSchema } from "../schemas/auth.schemas.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(userSchema), signUp);
authRouter.post("/sign-in", validateSchema(authSchema), signIn);
authRouter.post("/logout", validateAuth, logout);

export default authRouter;
