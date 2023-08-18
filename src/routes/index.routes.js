import { Router } from "express";
import {
  newPost,
  getPosts,
  editPosts,
  deletePost,
} from "../controllers/post.controller.js";

import authRouter from "./auth.routes.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchemas.js";
import usersRouter from "./users.routes.js";

const router = Router();

router.post("/newPost", newPost);
router.get("/posts", getPosts);
router.put("/posts", validateSchema(postSchema), editPosts);
router.delete('/posts/:id', deletePost)

router.use(authRouter);
router.use(usersRouter);

export default router;

