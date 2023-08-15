import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { userSchema, userLogin, urlSchema } from "../schemas/user.schema.js";
import { signUp, signIn, userMe, getRanking } from "../controllers/user.controller.js";
import { validadeEmail, validateUserPass, checkShortUrlUserID } from "../middlewares/userValidates.js";
import generateToken from "../middlewares/generateToken.js";
import validateAuth from "../middlewares/validateAuth.js";
import { postUrl, getUrlById, openShort, deleteUrl } from "../controllers/urls.controller.js";

const router = Router();

router.post('/signup', (req, res, next) => validateSchema(req, res, next, userSchema), validadeEmail, signUp)
router.post('/signin', (req, res, next) => validateSchema(req, res, next, userLogin), validateUserPass, generateToken, signIn)
router.get('/users/me', validateAuth, userMe)

router.post('/urls/shorten', (req, res, next) => validateSchema(req, res, next, urlSchema), validateAuth, postUrl)
router.get('/urls/:id', getUrlById)
router.get('/urls/open/:shortUrl', openShort)
router.delete('/urls/:id', validateAuth, checkShortUrlUserID, deleteUrl)

router.get('/ranking', getRanking)


router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno no servidor');
})

export default router;