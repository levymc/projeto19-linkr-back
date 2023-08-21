import { getAllHashtags, getHashtagRepository } from "../repositories/hashtag.repository.js";
import zScore from "../utils/zscore.js";

export async function getHashtag(req, res) {

    const hashtag = req.params.hashtag;

    try {

        const hashtagPosts = await getHashtagRepository(hashtag);

        res.status(200).send(hashtagPosts);

    } catch (error) {

        res.status(500).send(error.message);

    }

}

export async function getTrending(req, res) {

    try {

        const hashtags = await getAllHashtags();

        hashtags.forEach(hashtag => {
            if (hashtag.dailyInteractionsArray.length === 0) {
                hashtag['zScore'] = Number.NEGATIVE_INFINITY;
            } else {
                hashtag['zScore'] = zScore(hashtag.currentInteractions, hashtag.dailyInteractionsArray);
            }
        });

        hashtags.sort((a, b) => b.zScore - a.zScore);

        res.status(200).send(hashtags.slice(0, 10));

    } catch (error) {

        res.status(500).send(error.message);

    }

}