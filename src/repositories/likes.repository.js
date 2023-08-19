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

export function countLikes(postId) {
  return db.query(
    `
  SELECT COUNT(*) FROM likes WHERE "postId"= $1`,
    [postId]
  );
}

export function countLikesTooltip(postId) {
  return db.query(
    `
    SELECT * FROM (SELECT * FROM likes JOIN users ON likes."userId" = users."userId") whoLiked WHERE "postId"= $1`,
    [postId]
  );
}

export function verifyLike(userId, postId) {

  return db.query(
    `SELECT * FROM likes WHERE "userId" = $1  AND "postId" = $2`,
    [userId, postId]
  );
}
