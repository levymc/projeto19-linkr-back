import { insertRepost } from "../repositories/repost.repository.js";

export async function postRepost(req, res) {

    const userId = res.locals.userId;
    const postId = req.params.id;

    try {

        await insertRepost(userId, postId);

        res.sendStatus(201);

    } catch (error) {

        res.status(500).send(error.message);

    }

}