import { Router } from "express";
import {
  signIn,
  signUp,
  logout,
  resetActivityTimer,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";

import {
  userSchema,
  authSchema,
  tokenSchema,
} from "../schemas/auth.schemas.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSchema), signUp);
userRouter.post("/signin", validateSchema(authSchema), signIn);
userRouter.delete("/logout", validateAuth, logout);
userRouter.post("/active", validateAuth, resetActivityTimer);

export default userRouter;
