import { Router } from "express";
import { newPost, getPosts, editPosts, getMetadata } from "../controllers/post.controller.js";
import { getTitleFromUrl } from "../middlewares/getMetadatas.js";

import userRouter from "./auth.routes.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const router = Router();


router.post('/newPost', getTitleFromUrl, newPost)
router.get('/posts', validateAuth, getPosts)
router.put('/posts', validateSchema(postSchema), editPosts)

router.get('/get-metadata', getMetadata)


router.use(userRouter);

export default router;
