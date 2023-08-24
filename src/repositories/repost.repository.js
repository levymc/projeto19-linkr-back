import { db } from "../database/db.connection.js";

export async function insertRepost(userId, postId) {

    try {

        await db.query(`
            INSERT
                INTO "reposts" ("userId", "postId")
                VALUES (${userId}, ${postId});
        `);

        return

    } catch (error) {

        throw new Error(error.message);

    }

}