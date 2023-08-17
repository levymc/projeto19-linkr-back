import { Router } from "express";
import newPost from "../controllers/post.controller.js";

import userRouter from "./auth.routes.js";
import likesRouter from "./likes.routes.js";

const router = Router();


router.post('/newPost', newPost)



router.use(userRouter);
router.use(likesRouter)

export default router;
