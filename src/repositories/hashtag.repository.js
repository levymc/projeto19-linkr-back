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

export async function updateHashtagsOnEdit(postId, hashtags) {

    try {

        const dbDeleteResponse = await db.query(`
            DELETE FROM "hashtagPostJunction"
                USING "hashtags"
                WHERE
                    "hashtags"."hashtagId" = "hashtagPostJunction"."hashtagId"
                    AND "hashtagPostJunction"."postId" = ${postId}
                RETURNING *;
        `);
        
        // console.log('dbDeleteResponse.rows:', dbDeleteResponse.rows);  // DEBUG

        let decreaseHashtagIdArray = dbDeleteResponse.rows.map(e => e.hashtagId);

        // console.log('decreaseHashtagIdArray:', decreaseHashtagIdArray);  // DEBUG

        const dbDecreaseResponse = await db.query(`
            UPDATE "hashtags"
                SET "currentInteractions" = "hashtags"."currentInteractions" - 1
                WHERE "hashtagId" = ANY('{${decreaseHashtagIdArray.toString()}}')
            RETURNING *;
        `);

        // console.log('dbDecreaseResponse.rows:', dbDecreaseResponse.rows);  // DEBUG

        let queryValues = '';
        hashtags.forEach((hashtag) => { queryValues += `('${hashtag}'), ` });
        queryValues = queryValues.substring(0, queryValues.length - 2);

        // console.log('queryValues:', queryValues);  // DEBUG

        const dbUpdateResponse = await db.query(`
            INSERT INTO "hashtags" ("hashtagName")
                VALUES ${queryValues}
            ON CONFLICT ("hashtagName") DO UPDATE
                SET "currentInteractions" = "hashtags"."currentInteractions" + 1
            RETURNING "hashtagId", "hashtagName";
        `);

        // console.log('dbUpdateResponse.rows:', dbUpdateResponse.rows);  // DEBUG

        const hashtagIdArray = dbUpdateResponse.rows.map(e => e.hashtagId);
        let queryJunctionValues = '';
        hashtagIdArray.forEach((hashtagId) => { queryJunctionValues += `('${hashtagId}', '${postId}'), ` });
        queryJunctionValues = queryJunctionValues.substring(0, queryJunctionValues.length - 2);

        // console.log('queryJunctionValues:', queryJunctionValues);  // DEBUG

        await db.query(`
            INSERT
                INTO "hashtagPostJunction" ("hashtagId", "postId")
                VALUES ${queryJunctionValues}
            ON CONFLICT DO NOTHING;
        `);

        return

    } catch (error) {

        throw new Error(error.message);

    }

}

export async function updateHashtagsOnDelete(postId) {

    try {

        const dbResponse = await db.query(`
            DELETE FROM "hashtagPostJunction"
                USING "hashtags"
                WHERE
                    "hashtags"."hashtagId" = "hashtagPostJunction"."hashtagId"
                    AND "hashtagPostJunction"."postId" = ${postId}
                RETURNING *;
        `);

        let hashtagIdArray = dbResponse.rows.map(e => e.hashtagId);

        await db.query(`
            UPDATE "hashtags"
                SET "currentInteractions" = "hashtags"."currentInteractions" - 1
                WHERE "hashtagId" = ANY('{${hashtagIdArray.toString()}}')
            RETURNING *;
        `);

        return

    } catch (error) {

        throw new Error(error.message);

    }

}

export async function getAllHashtags() {

    try {

        const dbResponse = await db.query(`
            SELECT *
                FROM "hashtags"
        `);

        return dbResponse.rows

    } catch (error) {

        throw new Error(error.message);

    }

}

export async function dailyHashtagReset() {

    try {

        await db.query(`
            UPDATE "hashtags"
                SET
                    "dailyInteractionsArray" = array_append("hashtags"."dailyInteractionsArray", "hashtags"."currentInteractions"),
                    "currentInteractions" = 0
        `);

    } catch (error) {

        throw new Error(error.message);

    }

}