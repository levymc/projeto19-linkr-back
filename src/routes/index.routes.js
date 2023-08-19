import { Router } from "express";
import {
  newPost,
  getPosts,
  editPosts,
  deletePost,
  getUserPosts,
} from "../controllers/post.controller.js";

import authRouter from "./auth.routes.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchemas.js";
import usersRouter from "./users.routes.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { getMetadataFromUrl } from "../middlewares/getMetadatas.js";

import { likePost , countLike } from "../controllers/likes.controller.js";

const router = Router();

router.post("/newPost", validateAuth, getMetadataFromUrl, newPost);
router.get("/posts", getPosts);
router.put("/posts", validateSchema(postSchema), editPosts);
router.delete('/posts/:id', deletePost)
router.get("/userPosts/:id", getUserPosts)


router.post("/like", likePost);
router.get("/like/:postId", countLike)

router.use(authRouter);
router.use(usersRouter);

export default router;
