import { Router } from "express";

import userRouter from "./auth.routes.js";

const router = Router();


router.post('/newPost', newPost)


router.use(userRouter);

export default router;
