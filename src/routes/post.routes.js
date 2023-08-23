import { validateAuth } from "../middlewares/validateAuth.js";
import { getMetadataFromUrl } from "../middlewares/getMetadatas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchemas.js";
import {
  newPost,
  getPosts,
  editPosts,
  deletePost,
  getUserPosts,
  getFollowingPosts,
} from "../controllers/post.controller.js";

import { Router } from "express";

const postRouter = Router();

postRouter.post("/newPost", validateAuth, getMetadataFromUrl, newPost);
postRouter.get("/posts", getPosts);
postRouter.get("/posts/following", getFollowingPosts);
postRouter.put("/posts", validateSchema(postSchema), editPosts);
postRouter.delete("/posts/:id", deletePost);
postRouter.get("/userPosts/:id", getUserPosts);

export default postRouter;
