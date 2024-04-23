import jwt from 'jsonwebtoken';
import { generateError } from '../helpers/generateError.js';
const authUser = (req, res, next) => {
    try {
        // read token from header
        const { authorization } = req.headers;

        if (!authorization) {
            throw generateError('Falta cabecera de autorización', 401);
        }

        // verify token
        let token;
        try {
            token = jwt.verify(authorization, process.env.SECRET);
            console.log('token: ', token);
            req.user = token;
        }catch{
            throw generateError('token no válido', 401);
        }

        //storage token
        req.userId = token.id;
        console.log('req.userId = token.id: ', req.userId);

        next(); //go to controller
        
    } catch (error) {
        next(error);
    }
};
export default authUser;
