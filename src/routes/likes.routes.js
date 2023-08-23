import { Router } from "express";
import { likePost, countLike } from "../controllers/likes.controller.js";

const likesRouter = Router();

likesRouter.post("/like", likePost);
likesRouter.get("/like/:postId", countLike);

export default likesRouter;
