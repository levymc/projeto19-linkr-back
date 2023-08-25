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

export async function checkIfUserIsFollowing(userIdToFollow, loggedInUserId) {
  const result = await db.query(
    'SELECT 1 FROM "follows" WHERE "followerId" = $1 AND "followingId" = $2',
    [loggedInUserId, userIdToFollow]
  );
  return result.rows.length > 0;
}

export async function getFollowingIds(userId) {
  const result = await db.query(
    'SELECT "followingId" FROM "follows" WHERE "followerId" = $1',
    [userId]
  );
  return result.rows.map((row) => row.followingId);
}

export async function getFollowingPosts(userIds) {
  const query = `
    SELECT post.*, "user".email, "user".name, "user"."imageUrl" FROM public.posts as post
    LEFT JOIN public.users as "user" on (post."userId" = "user"."userId")
    WHERE post."userId" = ANY($1)
    ORDER BY post."createdAt" DESC LIMIT 20;
  `;

  const queryWithReposts = `
    SELECT "postUnion".*, "user"."email", "user"."name", "user"."imageUrl"
    FROM (
      SELECT
        "originalPost"."postId",
        "originalPost"."userId",
        "originalPost"."content",
        "originalPost"."postUrl",
        "originalPost"."imgMetadata",
        "originalPost"."titleMetadata",
        "originalPost"."descriptionMetadata",
        COUNT("reposts".*) AS "repostCount",
        NULL AS "reposterId",
        NULL AS "reposterName",
        "originalPost"."createdAt"
          FROM "public"."posts" AS "originalPost"
          LEFT JOIN "reposts" USING ("postId")
          WHERE "originalPost"."userId" = ANY($1)
          GROUP BY "originalPost"."postId", "originalPost"."userId"
      UNION
      SELECT
        "repostedPost"."postId",
        "repostedPost"."userId",
        "repostedPost"."content",
        "repostedPost"."postUrl",
        "repostedPost"."imgMetadata",
        "repostedPost"."titleMetadata",
        "repostedPost"."descriptionMetadata",
        COUNT("reposts".*) AS "repostCount",
        "repost"."userId" AS "reposterId",
        "repostUser"."name" AS "reposterName",
        "repost"."createdAt"
          FROM "public"."reposts" AS "repost"
          INNER JOIN "posts" AS "repostedPost" USING ("postId")
          INNER JOIN "users" AS "repostUser" ON "repostUser"."userId" = "repost"."userId"
          LEFT JOIN "reposts" USING ("postId")
          WHERE "repostedPost"."userId" = ANY($1)
          GROUP BY "repostedPost"."postId", "repost"."userId", "repostUser"."name", "repost"."createdAt"
    ) AS "postUnion"
    INNER JOIN "users" AS "user" USING ("userId")
    ORDER BY "postUnion"."createdAt" DESC
    LIMIT 20;
  `

  try {
    const result = await db.query(queryWithReposts, [userIds]);
    return result.rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}
