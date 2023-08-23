import { db } from "../database/db.connection.js";

export interface Post {
    postId: number;
    userId: number;
    content: string;
    postUrl: string;
    createdAt: Date;
    imgMetadata?: string; // opcional, pois pode estar ausente
    titleMetadata?: string; // opcional, pois pode estar ausente
    descriptionMetadata?: string; // opcional, pois pode estar ausente
    hashtags?: string; // opcional, pois pode estar ausente
    updatedAt?: string; // opcional, pois pode estar ausente
  }

export class PostRepository {

    async createPost (userId: number, content: string, postUrl: string, imgMetadata: string | 
                    null, titleMetadata: string | null, descriptionMetadata: string | null)
                    : Promise<Post | false> {
        console.log(userId, content, postUrl, imgMetadata, titleMetadata, descriptionMetadata);
        const query = `
            INSERT INTO public.posts ("userId", content, "postUrl", "imgMetadata", "titleMetadata", "descriptionMetadata")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [userId, content, postUrl, imgMetadata, titleMetadata, descriptionMetadata];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getPosts(limit: number = 20): Promise<Post[] | false> {
        const query = `
            SELECT post.*, "user".email, "user".name, "user"."imageUrl" FROM public.posts as post
            LEFT JOIN public.users as "user" on (post."userId" = "user"."userId")
            ORDER BY post."createdAt" desc LIMIT ${limit}
        `;
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
      

    async getUserPosts(id: number): Promise<Post[] | false> {
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

    async getPostById(postId: number): Promise<Post | false> {
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

    async atualizarPost(postId: number, content: string, hashtags: string, editedAt: Date): Promise<Post | false> {
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

    async deletarPost(postId: number): Promise<Post | false> {
        const query = `
            DELETE FROM public.posts
            WHERE "postId" = $1
            RETURNING *
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

    async sendPost(postId: number): Promise<Post | false> {
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
}

