import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  searchByUsername,
  toggleFollow,
  checkFollow,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:userName", validateAuth, searchByUsername);
usersRouter.post("/toggle-follow", validateAuth, toggleFollow);
usersRouter.get("/check-follow/:userId", validateAuth, checkFollow);

export default usersRouter;
