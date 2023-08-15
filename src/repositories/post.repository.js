import { db } from "../database/db.connection";

export default class PostRepository {

    async createPost(userId, content, postUrl, createdAt) {
        const query = `
            INSERT INTO public.posts ("userId", content, "postUrl", "createdAt")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [userId, content, postUrl, createdAt];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
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

    async atualizarPost(postId, content, postUrl, createdAt) {
        const query = `
            UPDATE public.posts
            SET content = $2, "postUrl" = $3, "createdAt" = $4
            WHERE "postId" = $1
            RETURNING *
        `
        const values = [postId, content, postUrl, createdAt]

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
}

