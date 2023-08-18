import { db } from "../database/db.connection.js";
export async function createUser(email, password, name, imageUrl) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const result = await db.query(
      'INSERT INTO "users" ("email", "password", "name", "imageUrl", "createdAt") VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [email, password, name, imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error during user creation:", error);
    throw new Error("An error occurred during user creation.");
  }
}



export async function getUserByEmail(email) {
  try {
    const result = await db.query(
      'SELECT "userId", "email", "password", "name", "imageUrl" FROM "users" WHERE "email" = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("An error occurred while fetching user by email.");
  }
}

export async function getActiveSession(userId) {
  try {
    const result = await db.query(
      'SELECT * FROM "sessions" WHERE "userId" = $1',
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching active session:", error);
    throw new Error("An error occurred while fetching active session.");
  }
}
export async function createSessionWithToken(userId, token) {
  try {
    const result = await db.query(
      'INSERT INTO "sessions" ("userId", "token", "createdAt") VALUES ($1, $2, NOW()) RETURNING *',
      [userId, token]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error during session creation:", error);
    throw new Error("An error occurred during session creation.");
  }
}

export function findSessionDB(token) {
  return db.query(`SELECT "userId" FROM sessions WHERE token = $1;`, [token]);
}

export async function updateSessionTokenAndActivity(oldToken, newToken) {
  try {
    await db.query(
      'UPDATE "sessions" SET "token" = $1, "createdAt" = NOW() WHERE "token" = $2',
      [newToken, oldToken]
    );
  } catch (error) {
    console.error("Error updating session token and activity:", error);
    throw new Error(
      "An error occurred while updating session token and activity."
    );
  }
}

export function deleteTokenFromDB(token) {
  return db.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
}

export async function getUserById(userId) {
  try {
    const result = await db.query('SELECT * FROM "users" WHERE "userId" = $1', [
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("An error occurred while fetching user by ID.");
  }
}

// export async function getAllActiveSessions() {
//   try {
//     const result = await db.query('SELECT * FROM "sessions"');
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching active sessions:", error);
//     throw new Error("An error occurred while fetching active sessions.");
//   }
// }
