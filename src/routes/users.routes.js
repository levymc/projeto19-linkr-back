import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  searchByUsername,
  toggleFollow,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:userName", validateAuth, searchByUsername);
usersRouter.post("/toggle-follow", toggleFollow);

export default usersRouter;
