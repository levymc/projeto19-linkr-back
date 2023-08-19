import { Router } from "express";
import { likePost , countLikes } from "../controllers/likes.controller.js";


const likesRouter = Router();

likesRouter.post("/like", likePost);
likesRouter.get("/like/:postId", countLikes)

export default likesRouter;
