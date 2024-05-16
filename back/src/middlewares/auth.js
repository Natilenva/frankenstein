import jwt from 'jsonwebtoken';
import { generateError } from '../helpers/generateError.js';
const authUser = (req, res, next) => {

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw generateError('Falta cabecera de autorización', 401);
        }
        // Comprobamos que el token sea correcto
        let token;
        try {
            token = jwt.verify(authorization, process.env.SECRET);
            //console.log('token: ', token);
        } catch {
            throw generateError('token no válido', 401);
        }
        // Metemos la id del token en la request para usarla en el controlador
        req.userId = token.id;

        next(); 

    } catch (error) {
        next(error);
    }
};
export default authUser;
