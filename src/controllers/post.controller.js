import PostRepository from "../repositories/post.repository.js"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

const postRepo = new PostRepository()

dayjs.extend(utc)
dayjs.extend(timezone)
const timezoneName = 'America/Sao_Paulo';


export default async function newPost(req, res){

    const currentTime = dayjs().tz(timezoneName) //, currentTime.valueOf()
    req.body.userId = 1

    try{
        const insertedPost = await postRepo.createPost(1, req.body.content, req.body.postUrl)
        if (insertedPost) return res.status(201).send(insertedPost)
    }catch(err){
        console.error("Erro na criação de Post: ",err)
        res.status(500).send("Erro na criação de Post: " + err)
    }
}