import { db } from "../database/db.connection.js";

export async function getHashtagRepository(hashtag) {

    try {

        const dbResponse = await db.query(`
            SELECT *
            FROM "hashtags"
            JOIN "hashtagPostJunction"
                USING ("hashtagId")
            JOIN "posts"
                USING ("postId")
            WHERE "hashtagName" = '${hashtag}'
            ORDER BY "createdAt" DESC
            LIMIT 20
        `);

        console.log(dbResponse.rows);
        return dbResponse.rows;

    } catch (error) {

        throw new Error(error.message);

    }

}