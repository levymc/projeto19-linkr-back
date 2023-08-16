import PostRepository from "../repositories/post.repository.js"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

const postRepo = new PostRepository()

dayjs.extend(utc)
dayjs.extend(timezone)
const timezoneName = 'America/Sao_Paulo';


export async function newPost(req, res){
    req.body.userId = 1
    try{
        const insertedPost = await postRepo.createPost(1, req.body.content, req.body.postUrl)
        if (insertedPost) return res.status(201).send(insertedPost)
    }catch(err){
        console.error("Erro na criação de Post: ",err)
        res.status(500).send("Erro na criação de Post: " + err)
    }
}

export async function getPosts (req, res) {
    try{
        const posts = await postRepo.getPosts()
        const user = "" // vem as informações do usuario para enviar o nome e a imagem na postagem
        const response = {
            posts: posts,
            user: user
        }
        if (posts) return res.status(200).send(response)
    }catch(err){
        console.error("Erro no getPosts: ",err)
        res.status(500).send("Erro no getPosts: " + err)
    }
}