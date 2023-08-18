import * as userRepo from "../repositories/users.repository.js";

export async function searchByUsername(req, res) {
  const { userName } = req.params;

  try {
    const users = await userRepo.getUserByName(userName);

    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found with the specified letter." });
    }

    res.json({ users });
  } catch (error) {
    console.error("Error during letter search:", error);
    res.status(500).json({ error: "An error occurred during letter search." });
  }
}
