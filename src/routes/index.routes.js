import { Router } from "express";

import authRouter from "./auth.routes.js";
import likesRouter from "./likes.routes.js";
import usersRouter from "./users.routes.js";
import hashtagRouter from "./hashtag.routes.js";
import postRouter from "./post.routes.js";
import repostRouter from "./repost.routes.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(hashtagRouter);
router.use(likesRouter);
router.use(postRouter);
router.use(repostRouter);

export default router;
