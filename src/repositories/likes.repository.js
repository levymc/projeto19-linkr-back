import { db } from "../database/db.connection.js";

export function insertLike(userId, postId, CURRENT_TIMESTAMP) {
  return db.query(
    `INSERT INTO likes("userId", "postId", "createdAt") VALUES($1, $2, $3) `,
    [userId, postId, CURRENT_TIMESTAMP]
  );
}

export function deleteLike(userId, postId) {
  return db.query(`DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2`, [
    userId,
    postId,
  ]);
}

export function countLikes() {
  return db.query(`
    SELECT "postId", COUNT(*) AS "numLikes"
    FROM likes
    GROUP BY "postId"`);
}

export function verifyLike(userId, postId) {
  return db.query(`SELECT * FROM likes WHERE "userId" = $1  AND "postId" = $2`, [userId, postId]);
}
