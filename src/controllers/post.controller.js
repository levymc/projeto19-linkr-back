import PostRepository from "../repositories/post.repository"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const postRepo = new PostRepository()

dayjs.extend(utc)
dayjs.extend(timezone)
const timezoneName = 'America/Sao_Paulo';


export default async function newPost(req, res){

    const currentTime = dayjs().tz(timezoneName)
    req.body.userId = 1

    try{
        const insertedPost = await postRepo.createPost(1, req.body.content, req.body.postUrl, currentTime.valueOf())
        res.status(201).send(insertedPost)
    }catch(err){
        console.error("Erro na criação de Post: ",err)
        res.status(500).send("Erro na criação de Post: " + err)
    }
}