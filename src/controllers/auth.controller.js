import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";

const secretKey = process.env.SECRET_KEY;

export async function signUp(req, res) {
  const { email, password, name, imageUrl } = req.body;

  try {
    const existingUser = await userRepo.getUserByEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with this email already exists." });
    }
    const hash = bcrypt.hashSync(password, 10);
    const user = await userRepo.createUser(email, hash, name, imageUrl);
    res.json({ user });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: "An error occurred during user creation." });
  }
}
export async function signIn(req, res) {
  const { email, password } = req.body;
  console.log("AQYU")

  try {
    const user = await userRepo.getUserByEmail(email);

    if (!user) {
      return res.status(401).send({ message: "Email not registered!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Incorrect password!" });
    }

    let session = await userRepo.getActiveSession(user.userId);
    let token = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1d",
    });

    if (session) {
      await userRepo.updateSessionTokenAndActivity(session.token, token);
    } else {
      session = await userRepo.createSessionWithToken(user.userId, token);
    }

    const createdToken = jwt.sign({ userId: user.userId }, String(process.env.SECRET_KEY));
    console.log(token)
    const sessionCreated = await userRepo.createSessionWithToken(user.userId, createdToken);

    res.send({ id: user.userId, createdToken, imageUrl: user.imageUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function logout(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    await userRepo.deleteTokenFromDB(token);
    res.status(200).send({ message: "Logout successful." });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).send({ error: "An error occurred during logout." });
  }
}
