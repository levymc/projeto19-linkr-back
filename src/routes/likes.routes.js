import { Router } from "express";
import { likePost } from "../controllers/likes.controller.js";

const likesRouter = Router();

likesRouter.post("/like", likePost);

export default likesRouter;
