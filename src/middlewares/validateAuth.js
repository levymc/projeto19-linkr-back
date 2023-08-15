import LogAccessDAO from "../database/dao/dao.logAccess.js";
import UsuarioDAO from "../database/dao/dao.users.js";

const daoLog = new LogAccessDAO()
const dao = new UsuarioDAO()

async function validateAuth(req, res, next) {
    const { authorization } = req.headers
    if (!authorization?.startsWith("Bearer ")) return res.sendStatus(422);
    const token = authorization?.replace("Bearer ", "")
    if (!token) return res.sendStatus(401)

    try {
        const session = await daoLog.readByToken(token)
        if (!session) return res.sendStatus(401);

        const user = await dao.readById(session.userId)
        if (!user) return res.sendStatus(401);

        res.user = user
        // console.log("Deu bom!")
        next();
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export default validateAuth;