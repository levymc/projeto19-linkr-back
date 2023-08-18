import { db } from "../database/db.connection.js";

export default class PostRepository {

    async createPost(userId, content, postUrl, imgMetadata, titleMetadata, descriptionMetadata) {
        console.log(userId, content, postUrl, imgMetadata, titleMetadata, descriptionMetadata)
        const query = `
            INSERT INTO public.posts ("userId", content, "postUrl", "imgMetadata", "titleMetadata", "descriptionMetadata")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [userId, content, postUrl, imgMetadata, titleMetadata, descriptionMetadata]

        try {
            const result = await db.query(query, values)
            return result.rows[0]
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async getPosts() { // limitado a 20 posts
        const query = `
            SELECT post.*, "user".email, "user".name, "user"."imageUrl" FROM public.posts as post
            LEFT JOIN public.users as "user" on (post."userId" = "user"."userId")
            ORDER BY post."createdAt" desc LIMIT 20
        `
        try {
            const result = await db.query(query);
            return result.rows
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async getPostById(postId) {
        const query = `
            SELECT * FROM public.posts
            WHERE "postId" = $1;
        `
        const values = [postId]

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async atualizarPost(postId, content, hashtags, editedAt) {
        const query = `
            UPDATE public.posts
            SET content = $2, "hashtags" = $3, "editedAt" = $4
            WHERE "postId" = $1
            RETURNING *
        `
        const values = [postId, content, hashtags, editedAt]

        try {
            const result = await db.query(query, values)
            return result.rows[0]
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async deletarPost(postId) {
        const query = `
            DELETE FROM public.posts
            WHERE "postId" = $1
            RETURNING *
        `;
        const values = [postId]

        try {
            const result = await db.query(query, values)
            return result.rows[0]
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async sendPost(postId) {
        const query = `
            SELECT * FROM public.posts
            WHERE "postId" = $1
        `;
        const values = [postId]

        try {
            const result = await db.query(query, values)
            return result.rows[0]
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

