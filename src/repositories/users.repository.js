import { db } from "../database/db.connection.js";

export async function getUserByName(letter) {
  const result = await db.query(
    'SELECT "name", "imageUrl", "userId" FROM "users" WHERE LOWER("name") LIKE $1',
    [`%${letter.toLowerCase()}%`]
  );
  return result.rows;
}
