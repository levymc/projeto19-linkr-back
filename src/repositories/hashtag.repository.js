import { db } from "../database/db.connection.js";

export async function getHashtagRepository(hashtag) {

    try {

        const dbResponse = await db.query(`
            SELECT "posts".*, "users"."userId", "users"."name", "users"."imageUrl"
            FROM "hashtags"
            JOIN "hashtagPostJunction"
                USING ("hashtagId")
            JOIN "posts"
                USING ("postId")
            JOIN "users"
                USING ("userId")
            WHERE "hashtagName" = '${hashtag}'
            ORDER BY "createdAt" DESC
            LIMIT 20
        `);

        return dbResponse.rows;

    } catch (error) {

        throw new Error(error.message);

    }

}

export async function updateHashtagsOnPost(postId, hashtags) {

    try {

        let queryValues = '';
        hashtags.forEach((hashtag) => { queryValues += `('${hashtag}'), ` });
        queryValues = queryValues.substring(0, queryValues.length - 2);

        const dbResponse = await db.query(`
            INSERT INTO "hashtags" ("hashtagName")
                VALUES ${queryValues}
            ON CONFLICT ("hashtagName") DO UPDATE
                SET "currentInteractions" = "hashtags"."currentInteractions" + 1
            RETURNING "hashtagId", "hashtagName";
        `)

        const hashtagIdArray = dbResponse.rows.map(e => e.hashtagId);

        let queryJunctionValues = '';
        hashtagIdArray.forEach((hashtagId) => { queryJunctionValues += `('${hashtagId}', '${postId}'), ` });
        queryJunctionValues = queryJunctionValues.substring(0, queryJunctionValues.length - 2);

        await db.query(`
            INSERT
                INTO "hashtagPostJunction" ("hashtagId", "postId")
                VALUES ${queryJunctionValues};
        `);

        return dbResponse.rows;

    } catch (error) {

        throw new Error(error.message);

    }

}