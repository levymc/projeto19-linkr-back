import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { postRepost } from "../controllers/repost.controller.js";

const repostRouter = Router();

repostRouter.post('/repost/:id', validateAuth, postRepost);

export default repostRouter;
