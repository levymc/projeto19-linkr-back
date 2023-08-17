import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";

import { userSchema, authSchema } from "../schemas/auth.schemas.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchema), signUp);
userRouter.post("/sign-in", validateSchema(authSchema), signIn);
userRouter.post("/logout", validateAuth, logout);

export default userRouter;
