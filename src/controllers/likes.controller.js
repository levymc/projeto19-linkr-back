import {
  countLikes,
  countLikesTooltip,
  deleteLike,
  insertLike,
  verifyLike,
} from "../repositories/likes.repository.js";

export async function likePost(req, res) {
  const { userId, postId } = req.body;
  const createdAt = new Date();

  try {
    const existingLike = await verifyLike(userId, postId);

    if (existingLike.rowCount !== 0) {
      await deleteLike(userId, postId);
      await countLikes(postId);

      res.status(200).json({ message: "Like removido com sucesso." });
    } else {
      await insertLike(userId, postId, createdAt);
      const updatedLikeCount = await countLikes(postId);

      res.status(200).json({ message: "Like inserido com sucesso." });
    }
  } catch (err) {
    console.error("Erro ao interagir com o Like:", err);
    res.status(500).json({ message: "Erro ao interagir com o Like." });
  }
}

export async function countLike(req, res) {
  try {
    const postId = req.params.postId;
    const likeCount = await countLikes(postId);
    const count = likeCount.rows[0].count;

    const likedUsers = await countLikesTooltip(postId);
    const users =
      likedUsers.rows.map((user) => user.name).join(", ") + " liked.";

    res.status(200).json({ count, users });
  } catch (err) {
    console.error("Erro ao contar as curtidas:", err);
    res.status(500).json({ error: "Erro ao contar as curtidas" });
  }
}
