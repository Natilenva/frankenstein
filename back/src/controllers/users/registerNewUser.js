import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET, PORT } = process.env;
import getConnection from '../../db/getConnection.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { generateError } from '../../helpers/generateError.js';
import { sendEmail } from '../../helpers/sendEmail.js';
import * as crypto from 'crypto';

async function registerNewUser(req, res) {
    //console.log('req.body: ',req.body );
    try {
        // zod validation for new user data
        // TODO en userSchema falta agregar la validación de register_code?
        const {
            success,
            data: user,
            error,
        } = registerSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        // data from body register
        //! register_code?
        const { register_id, email, register_password, register_code } = user;
        console.log(
            'email, register_password, register_code: ',
            email,
            register_password,
            register_code
        );

        // TODO Activación de la cuenta?
        const registrationCode = crypto.randomUUID();
        console.log('registrationCode:', registrationCode);

        const subject = 'Activa tu cuenta en Frankenstein';
        const content = `
        <h1>¡Bienvenid@ a tu web Frankenstein</h1>
        <p>Activa tu cuenta haciendo click en el siguiente enlace.</p>

        <a href="http://localhost:${PORT}/${registrationCode}">Activar cuenta</a>
        `;
        await sendEmail(email, subject, content);

        // create new connection to db
        const connection = await getConnection();

        // check if user exists by email
        const [userEmail] = await connection.query(
            `SELECT register_id FROM register WHERE email= ?`,
            [email]
        );
        // if user not exists, throw error
        if (userEmail.length > 0) {
            res.status(400).send('Ya existe un usuario con ese email');
        }

        // hash password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(register_password, saltRounds);

        // insert new user into db
        const insertInfo = await connection.query(
            `INSERT INTO register (register_id, email, register_password, register_code) VALUES (?,?,?,?)`,
            [register_id, email, hashedPassword, registrationCode]
        );

        //! define user info?
        const userInfo = { user_id: insertInfo.insertId, user };

        // generate token
        const token = jwt.sign(userInfo, SECRET, { expiresIn: '1day' });
        res.setHeader('Authorization', token);
        console.log(token);

        res.send({
            httpstatus: '201',
            code: 'USER_CREATED',
            message: `Usuario creado correctamente`,
        });
    } catch (error) {
        console.error(error.message);
    }
}
export { registerNewUser };
