import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  searchByUsername,
  toggleFollow,
  checkFollow,
  getFollowingIds,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:userName", validateAuth, searchByUsername);
usersRouter.post("/follow", validateAuth, toggleFollow);
usersRouter.get("/check-follow/:userId", validateAuth, checkFollow);
usersRouter.get("/get-following/:userId", getFollowingIds);

export default usersRouter;
