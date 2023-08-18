import { db } from "../database/db.connection.js";

export async function getUserByName(letter) {
  try {
    const result = await db.query(
      'SELECT "userId", "email", "password", "name", "imageUrl" FROM "users" WHERE LOWER("name") LIKE $1',
      [`%${letter.toLowerCase()}%`]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching users by letter:", error);
    throw new Error("An error occurred while fetching users by letter.");
  }
}
