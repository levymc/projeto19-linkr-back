import { Router } from "express";
import { newPost, getPosts, editPosts } from "../controllers/post.controller.js";

import userRouter from "./auth.routes.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchemas.js";

const router = Router();


router.post('/newPost', newPost)
router.get('/posts', getPosts)
router.put('/posts', validateSchema(postSchema), editPosts)


router.use(userRouter);

export default router;
