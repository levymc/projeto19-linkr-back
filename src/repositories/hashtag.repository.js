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

export async function updateHashtagsRepository(postId, ...hashtags) {

    try {

        let queryValues;
        hashtags.forEach(async (hashtag) => { queryValues += `('${hashtag}'), ` });
        queryValues = queryValues.substring(0, str.length - 2);

        const dbResponse = await db.query(`
            INSERT INTO "hashtag" ("hashtagName")
                VALUES ${queryValues}
            ON CONFLICT ("hashtagName") DO UPDATE
                SET "currentInteractions" = "currentInteractions" + 1
            RETURNING "hashtagId", "hashtagName";
        `)

        const hashtagIdArray = dbResponse.rows.map((e) => { e.hashtagId });

        let queryJunctionValues;
        hashtagIdArray.forEach(async (hashtagId) => { queryJunctionValues += `('${hashtagId}', '${postId}'), ` });
        queryJunctionValues = queryValues.substring(0, str.length - 2);

        await db.query(`
            INSERT
                INTO "hashtagPostJunction" ("hashtagId", "postId")
                VALUES ${queryJunctionValues};
        `);

        console.log(dbResponse.rows);
        return dbResponse.rows;

    } catch (error) {

        throw new Error(error.message);

    }

}