import jwt from 'jsonwebtoken';
import { generateError } from '../helpers/generateError.js';
const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw generateError('Falta cabecera de autorización', 401);
        }
        let token;
        try {
            token = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            throw generateError('Token incorrecto', 401);
        }
        req.user_id = token.id;
        next();
    } catch (error) {
        next(error);
    }
};
export { authUser };
