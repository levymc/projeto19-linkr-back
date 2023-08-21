import { Router } from "express";
import { getHashtag, getTrending } from "../controllers/hashtag.constroller.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag/:hashtag', getHashtag);
hashtagRouter.get('/hashtag', getTrending);

export default hashtagRouter;
