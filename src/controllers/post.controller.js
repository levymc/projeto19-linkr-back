import PostRepository from "../repositories/post.repository.js"
import { getUserById } from "../repositories/auth.repository.js"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

const postRepo = new PostRepository()

dayjs.extend(utc)
dayjs.extend(timezone)
const timezoneName = 'America/Sao_Paulo';


export async function newPost(req, res){
    req.body.userId = 1
    const timestampAtual = Date.now();
    console.log(req.body);
    try{
        // const insertedPost = await postRepo.createPost(res.locals.userId, req.body.content, req.body.postUrl)
        // if (insertedPost) return res.status(201).send(insertedPost)
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
    try{
        console.log(req.body)
        const updatePost = await postRepo.atualizarPost(postId, text, postId)
        if(updatePost) return res.sendStatus(200)
    }catch(err){
        res.status(500).send(err)
    }
}