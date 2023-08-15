import { v4 as uuidv4 } from 'uuid';

const generateToken = (req, res, next) => {
    const token = uuidv4();
    res.token = token
    next()
};

export default generateToken;
