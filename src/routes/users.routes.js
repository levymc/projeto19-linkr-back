import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  searchByUsername,
  toggleFollow,
  checkFollow,
  getFollowingIds,
  getFollowingPosts,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:userName", validateAuth, searchByUsername);
usersRouter.get("/check-follow/:userId", validateAuth, checkFollow);
usersRouter.get("/get-following/:userId", getFollowingPosts);
usersRouter.post("/follow", validateAuth, toggleFollow);

export default usersRouter;
