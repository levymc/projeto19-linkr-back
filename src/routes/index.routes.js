import { Router } from "express";
import newPost from "../controllers/post.controller.js";

import userRouter from "./auth.routes.js";

const router = Router();


router.post('/newPost', newPost)


router.use(userRouter);

export default router;
