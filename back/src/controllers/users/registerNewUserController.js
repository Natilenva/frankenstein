import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET, PORT } = process.env;
import { registerSchema } from '../../schemas/registerSchema.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { sendEmail } from '../../helpers/sendEmail.js';
import * as crypto from 'crypto';
import { selectRegisterByEmailModel } from '../../models/users/selectRegisterByEmailModel.js';
import { insertNewRegisterModel } from '../../models/users/insertNewRegisterModel.js';

async function registerNewUserController(req, res, next) {
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

        // data from body register
        const { register_id, email, register_password } = user;

        // Activación de la cuenta
        const registrationCode = crypto.randomUUID();
        const subject = 'Activa tu cuenta en Frankenstein';
        const content = `
         <h1>¡Bienvenid@ a tu web Frankenstein</h1>
         <p>Activa tu cuenta haciendo click en el siguiente enlace.</p>
        <a href="http://localhost:${PORT}/validate/${registrationCode}">Activar cuenta</a>
        `;

        // TODO cambiar el orden las siguientes 2 lineas
        // enviamos el email para activar cuenta
        await sendEmail(email, subject, content);

        // comprobamos si el email ya existe
        await selectRegisterByEmailModel(email);

        // ciframos el password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(register_password, saltRounds);

        // insert new user into db
        const insertInfo = insertNewRegisterModel(
            register_id,
            email,
            hashedPassword,
            registrationCode
        );

        const userInfo = { user_id: insertInfo.insertId, user };

        // generate token
        const token = jwt.sign(userInfo, SECRET, { expiresIn: '1day' });
        res.setHeader('Authorization', token);

        res.send({
            /* httpstatus: '201', */
            status:'ok',
            /* code: 'USER_CREATED', */
            message: `Usuario creado correctamente`,
        });
    } catch (error) {
        next(error);
    }
}
export { registerNewUserController };
