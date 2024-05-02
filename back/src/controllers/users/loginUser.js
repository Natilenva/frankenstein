import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getConnection from '../../db/getConnection.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { registerSchema } from '../../schemas/registerSchema.js';
const { SECRET } = process.env;

async function loginUser(req, res, next) {
    try {
        // zod validation for login data
        const {
            success,
            data: user,
            error,
        } = registerSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        // connection to db
        const connection = await getConnection();

        // data of body from login
        const { email, register_password } = user;
        console.log('email, register_password: ', email, register_password);

        // select data from db
        const [dataUserRegister] = await connection.query(
            `SELECT * FROM register WHERE email = ? ;`,
            [email]
        );

        // check if user exists
        if (!dataUserRegister[0]) {
            res.status(400).send({
                message: 'Email y/o contraseña incorrectos',
            });
        }
        console.log('dataUserRegister: ', dataUserRegister);
        console.log(
            'dataUserRegister[0].register_id: ',
            dataUserRegister[0].register_id
        );

        // compare password -----------------------
        const passwordMatched = bcrypt.compareSync(
            register_password,
            dataUserRegister[0].register_password
        );
        if (!passwordMatched) {
            res.status(400).send({
                message: 'Email y/o contraseña incorrectos',
            });
        }

        // create token ---------------------------------------
        const idForToken = dataUserRegister[0].register_id;
        const payload = { id: idForToken };
        console.log('el id del user del token es: ', idForToken);

        // generate token
        const token = jwt.sign(payload, SECRET, {
            expiresIn: '30d',
        });

        // send question ----------------------------------------
        res.send({
            status: 'ok',
            message: `Usuario ${dataUserRegister[0].email} logueado`,
            // /* token, */
            data: token,
        });
    } catch (error) {
        next(error);
    }
}

export { loginUser };
