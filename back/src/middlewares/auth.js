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

            req.user = token;

            next();

        } catch (error) {
            throw generateError('Token incorrecto', 401);
        }
        //req.register_id = token.id;
        
    } catch (error) {
        next(error);
    }
};
export default authUser;
