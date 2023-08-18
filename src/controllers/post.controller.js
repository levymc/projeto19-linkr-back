import PostRepository from "../repositories/post.repository.js"
import { getUserById } from "../repositories/auth.repository.js"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import urlMetadata from "url-metadata"

const postRepo = new PostRepository()

dayjs.extend(utc)
dayjs.extend(timezone)
const timezoneName = 'America/Sao_Paulo';


export async function newPost(req, res){
    req.body.userId = 1
    const timestampAtual = Date.now();
    console.log(req.body.metadata['og:image']);
    try{
        const insertedPost = await postRepo.createPost(
                                                        res.locals.userId, 
                                                        req.body.content, 
                                                        req.body.postUrl,
                                                        req.body.metadata['og:image'],
                                                        req.body.metadata['og:title'],
                                                        req.body.metadata['og:description']
                                                    )
        if (insertedPost) return res.status(201).send(insertedPost)
    }catch(err){
        console.error("Erro na criação de Post: ",err)
        res.status(500).send("Erro na criação de Post: " + err)
    }
}

export async function getPosts (req, res) {
    try{
        const posts = await postRepo.getPosts()
        // const user = await getUserById(res.locals.userId)
        const response = {
            posts: posts,
            // user: user
        }
        if (posts) return res.status(200).send(response)
    }catch(err){
        console.error("Erro no getPosts: ",err)
        res.status(500).send("Erro no getPosts: " + err)
    }
}

export async function editPosts (req, res) {
    const {text, hashtags, postId} = req.body
    const editedAt = dayjs().format('YYYY-MM-DD HH:mm:ssZ');
    try{
        const updatePost = await postRepo.atualizarPost(postId, text, hashtags, editedAt)
        if(updatePost) return res.sendStatus(200)
    }catch(err){
        res.status(500).send(err)
    }
}

export async function getMetadata (req, res, next){
    const url = req.body.postUrl;
    if (!url) {
        return res.status(400).json({ error: 'URL not provided' });
    }

    try {
        const metadata = await urlMetadata(url);
        req.body.metadata = metadata
        next()
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching metadata' });
export async function deletePost(req, res){
    const {id} = req.params
    try{
        const post = await postRepo.sendPost(id);
        if(!post) return res.sendStatus(404);
        const delPost = await postRepo.deletarPost(id)
        if(delPost) return res.sendStatus(200)
    }catch(err){
        res.status(500).send(err)
    }
}