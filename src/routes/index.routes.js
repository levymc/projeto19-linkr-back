import { Router } from "express";
import { newPost, getPosts } from "../controllers/post.controller.js";

import userRouter from "./auth.routes.js";

const router = Router();


router.post('/newPost', newPost)
router.get('/posts', getPosts)


router.use(userRouter);

export default router;
