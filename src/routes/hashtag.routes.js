import { Router } from "express";
import { getHashtag } from "../controllers/hashtag.constroller.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag/:hashtag', getHashtag);

export default hashtagRouter;
