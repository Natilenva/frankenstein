import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

import { zodErrorMap } from '../../helpers/zodError.js';
import { registerSchema } from '../../schemas/registerSchema.js';

const { SECRET } = process.env;

async function loginUser(req, res) {
    console.log('req.body: ', req.body);
    try {
        // zod validation for new user data
        const {
            success,
            data: user,
            error,
        } = registerSchema.safeParse(req.body);
        

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        let connection;
        connection = await getConnection();

        const { email, register_password } = user;

        // select * from register where email = ?
        const [userDB] = await connection.query(
            `SELECT * FROM register WHERE email = ? ;`,[email]
        );
        // 
        if (!userDB[0]) {
            res.status(400).send({
                message: 'Email y/o contraseña incorrectos',
            });
        }

        // compare password
        const passwordMatched = bcrypt.compareSync(
            register_password,
            userDB[0].register_password
        );
        if (!passwordMatched) {
            res.status(400).send({
                message: 'Email y/o contraseña incorrectos',
            });
        }

        const userInfo = {
            user_id: userDB.register_id,
        };

        console.log(userInfo);

        // create token
        const token = jwt.sign(userInfo, SECRET, { expiresIn: '1day' });
        res.setHeader('Authorization', token);

        // send response
        res.send({
            message: `Usuario ${userDB[0].email} logueado`,
            token,
        });
    } catch (error) {
        console.error(error.message);
    }
}

export { loginUser };
