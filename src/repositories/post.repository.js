import { db } from "../database/db.connection.js";

export default class PostRepository {
  async getFollowingPosts(followingIds) {
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
      const result = await db.query(query, [followingIds]);
      return result.rows;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createPost(
    userId,
    content,
    postUrl,
    imgMetadata,
    titleMetadata,
    descriptionMetadata
  ) {
    console.log(
      userId,
      content,
      postUrl,
      imgMetadata,
      titleMetadata,
      descriptionMetadata
    );
    const query = `
            INSERT INTO public.posts ("userId", content, "postUrl", "imgMetadata", "titleMetadata", "descriptionMetadata")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
    const values = [
      userId,
      content,
      postUrl,
      imgMetadata,
      titleMetadata,
      descriptionMetadata,
    ];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPosts() {
    // limitado a 20 posts
    const query = `
            SELECT post.*, "user".email, "user".name, "user"."imageUrl" FROM public.posts as post
            LEFT JOIN public.users as "user" on (post."userId" = "user"."userId")
            ORDER BY post."createdAt" desc LIMIT 20
        `;
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getUserPosts(id) {
    // limitado a 20 posts
    const query = `
            SELECT post.*, "user".email, "user".name, "user"."imageUrl" FROM public.posts as post
            LEFT JOIN public.users as "user" on (post."userId" = "user"."userId")
            WHERE post."userId" = $1
            ORDER BY post."createdAt" desc LIMIT 20
        `;
    try {
      const result = await db.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPostById(postId) {
    const query = `
            SELECT * FROM public.posts
            WHERE "postId" = $1;
        `;
    const values = [postId];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async atualizarPost(postId, content, hashtags, editedAt) {
    const query = `
            UPDATE public.posts
            SET content = $2, "hashtags" = $3
            WHERE "postId" = $1
            RETURNING *
        `;
    const values = [postId, content, hashtags];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deletarPost(postId) {
    const query = `
        WITH
          deleted_comments AS (
            DELETE FROM public.comments
            WHERE "postId" = $1
            RETURNING *
          ),
          deleted_reposts AS (
            DELETE FROM "reposts"
            WHERE "postId" = $1
            RETURNING *
          )
        DELETE FROM public.posts
        WHERE "postId" = $1
        RETURNING *;
        `;
    const values = [postId];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendPost(postId) {
    const query = `
            SELECT * FROM public.posts
            WHERE "postId" = $1
        `;
    const values = [postId];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getNumberComments(postId) {
    const query = `
          SELECT COUNT(*) AS commentCount
          FROM public.comments
          WHERE "postId" = $1;
        `;
    const values = [postId];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createComment(postId, userId, comment) {
    const query = `
      INSERT INTO "comments" 
      ("postId", "userId", "comment") 
      VALUES ($1, $2, $3); 
      `;
    const values = [postId, userId, comment];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async infoComments(postId) {
    const query = `
      SELECT u."userId", u.name, u."imageUrl", c.comment
      FROM users u
      JOIN comments c ON u."userId" = c."userId"
      WHERE c."postId" = $1; 
      `;
    const values = [postId];

    try {
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
