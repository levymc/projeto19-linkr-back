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
        .json({ error: "User with this email already exists." });
    }
    const hash = bcrypt.hashSync(password, 10);
    const user = await userRepo.createUser(email, hash, name, imageUrl);
    const token = jwt.sign({ userId: user.userId }, secretKey);
    res.json({ user, token });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: "An error occurred during user creation." });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userRepo.getUserByEmail(email);

    if (!user) {
      return res.status(401).send({ message: "E-mail não cadastrado!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Senha incorreta!" });
    }

    const activeSession = await userRepo.getActiveSession(user.userId);
    if (activeSession) {
      return res
        .status(401)
        .send({ message: "Usuário já possui uma sessão ativa." });
    }

    const token = jwt.sign({ userId: user.userId }, secretKey);

    const session = await userRepo.createSessionWithToken(user.userId, token);
    await userRepo.updateSessionActivity(session.token);
    res.send({ id: user.userId, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function logout(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const session = await userRepo.findSessionDB(token);
    if (!session) {
      return res.status(401).send({ message: "Invalid session token." });
    }

   
    const currentTime = new Date();
    const sessionCreationTime = new Date(session.createdat); 
    const timeDifferenceInMillis = currentTime - sessionCreationTime;
    const oneMinuteInMillis = 1 * 60 * 1000; // 1 minute in milliseconds

    if (timeDifferenceInMillis > oneMinuteInMillis) {
      
      await userRepo.deleteSessionByToken(token);
      return res.send({ message: "User inactive, logout successful." });
    }

   
    await userRepo.deleteSessionByToken(token);
    res.send({ message: "Logout successful." });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).send({ error: "An error occurred during logout." });
  }
}

export async function resetActivityTimer(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const session = await userRepo.findSessionDB(token);
    if (!session) {
      return res.status(401).send({ message: "Invalid session token." });
    }

    await userRepo.updateSessionActivity(token);

    res.send({ message: "Activity timer reset." });
  } catch (err) {
    console.error("Error during activity timer reset:", err);
    res
      .status(500)
      .send({ error: "An error occurred during activity timer reset." });
  }
}
