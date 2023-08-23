import { db } from "../database/db.connection.js";

export async function getUserByName(letter) {
  const result = await db.query(
    'SELECT "name", "imageUrl", "userId" FROM "users" WHERE LOWER("name") LIKE $1',
    [`%${letter.toLowerCase()}%`]
  );
  return result.rows;
}

export async function toggleFollowStatus(userIdToFollow, loggedInUserId) {
  try {
    const isFollowing = await checkIfUserIsFollowing(
      userIdToFollow,
      loggedInUserId
    );

    if (isFollowing) {
      await db.query(
        'DELETE FROM "follows" WHERE "followerId" = $1 AND "followingId" = $2',
        [loggedInUserId, userIdToFollow]
      );
    } else {
      await db.query(
        'INSERT INTO "follows" ("followerId", "followingId") VALUES ($1, $2)',
        [loggedInUserId, userIdToFollow]
      );
    }

    return true;
  } catch (error) {
    console.error("Error toggling follow status:", error);
    return false;
  }
}

export async function getFollowingIds(userId) {
  const result = await db.query(
    'SELECT "followingId" FROM "follows" WHERE "followerId" = $1',
    [userId]
  );
  return result.rows.map((row) => row.followingId);
}

export async function checkIfUserIsFollowing(userIdToFollow, loggedInUserId) {
  const result = await db.query(
    'SELECT 1 FROM "follows" WHERE "followerId" = $1 AND "followingId" = $2',
    [loggedInUserId, userIdToFollow]
  );
  return result.rows.length > 0;
}
