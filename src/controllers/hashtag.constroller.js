import { getHashtagRepository } from "../repositories/hashtag.repository.js";

export async function getHashtag(req, res) {

    const hashtag = req.params.hashtag;

    try {

        const hashtagPosts = await getHashtagRepository(hashtag);
        
        res.status(200).send(hashtagPosts);

    } catch (error) {

        res.status(500).send(error.message);

    }

}