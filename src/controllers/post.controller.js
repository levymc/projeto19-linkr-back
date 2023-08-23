import PostRepository from "../repositories/post.repository.js";
import { getUserById } from "../repositories/auth.repository.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import urlMetadata from "url-metadata";
import {
  updateHashtagsOnDelete,
  updateHashtagsOnEdit,
  updateHashtagsOnPost,
} from "../repositories/hashtag.repository.js";

const postRepo = new PostRepository();

dayjs.extend(utc);
dayjs.extend(timezone);
const timezoneName = "America/Sao_Paulo";

export async function newPost(req, res) {
  req.body.userId = 1;
  const timestampAtual = Date.now();
  console.log(req.body.metadata["og:image"]);
  try {
    const insertedPost = await postRepo.createPost(
      res.locals.userId,
      req.body.content,
      req.body.postUrl,
      req.body.metadata["og:image"],
      req.body.metadata["og:title"],
      req.body.metadata["og:description"]
    );

    let hashtags = [];
    insertedPost.content.split(/\s+/).map((word) => {
      if (word.startsWith("#")) {
        hashtags.push(word.substring(1));
      }
    });
    hashtags = [...new Set(hashtags)];
    await updateHashtagsOnPost(insertedPost.postId, hashtags);

    if (insertedPost) return res.status(201).send(insertedPost);
  } catch (err) {
    console.error("Erro na criação de Post: ", err);
    res.status(500).send("Erro na criação de Post: " + err);
  }
}

export async function getFollowingPosts(req, res) {
  try {
    const followingIds = req.body.followingIds;
    const posts = await postRepo.getFollowingPosts(followingIds);
    const response = {
      posts: posts,
    };

    if (posts) return res.status(200).send(response);
  } catch (err) {
    console.error("Erro no getFollowingPosts: ", err);
    res.status(500).send("Erro no getFollowingPosts: " + err);
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postRepo.getPosts();

    const response = {
      posts: posts,
    };
    if (posts) return res.status(200).send(response);
  } catch (err) {
    console.error("Erro no getPosts: ", err);
    res.status(500).send("Erro no getPosts: " + err);
  }
}

export async function getUserPosts(req, res) {
  try {
    const user = await getUserById(req.params.id);
    const posts = await postRepo.getUserPosts(req.params.id);
    const response = { user: user, posts: posts };

    if (posts) return res.status(200).send(response);
  } catch (err) {
    console.error("Erro no getPosts: ", err);
    res.status(500).send("Erro no getPosts: " + err);
  }
}

export async function editPosts(req, res) {
  const { text, hashtags, postId } = req.body;
  const editedAt = dayjs().format("YYYY-MM-DD HH:mm:ssZ");
  try {
    const updatePost = await postRepo.atualizarPost(
      postId,
      text,
      hashtags,
      editedAt
    );

    let extractedHashtags = [];
    updatePost.content.split(/\s+/).map((word) => {
      if (word.startsWith("#")) {
        extractedHashtags.push(word.substring(1));
      }
    });
    extractedHashtags = [...new Set(extractedHashtags)];
    await updateHashtagsOnEdit(updatePost.postId, extractedHashtags);

    if (updatePost) return res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  try {
    await updateHashtagsOnDelete(id);

    const post = await postRepo.sendPost(id);
    if (!post) return res.sendStatus(404);
    const delPost = await postRepo.deletarPost(id);
    if (delPost) return res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
}
