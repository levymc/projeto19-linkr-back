import {
  deleteLike,
  insertLike,
  verifyLike,
} from "../repositories/likes.repository.js";
import { getUserById } from "../repositories/auth.repository.js"

export async function likePost(req, res) {
  const { userId, postId } = req.body;
  const createdAt = new Date();

  const user = await getUserById(res.locals.userId)

  try {
    if (!user)
      return res.status(401).json({ message: "Usuário não autenticado." });

    const existingLike = await verifyLike(userId, postId);

    console.log(existingLike.rowCount)

    if (existingLike.rowCount !==0) {console.log("back")
      await deleteLike(userId, postId);
      res.status(200).json({ message: "Like removido com sucesso." });
    } else {
      await insertLike(userId, postId, createdAt);
      
      res.status(200).json({ message: "Like inserido com sucesso." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao interagir com o Like." });
  }
}

export async function countLikes(req, res) {

  try {

  }catch (err) {
    
  }
}
