import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { zodErrorMap } from '../../helpers/zodError.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { selectLoginByEmailModel } from '../../models/users/selectLoginByEmailModel.js';
import { generateError } from '../../helpers/generateError.js';
const { SECRET } = process.env;

async function loginUserController(req, res, next) {
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

        // data of body from login
        const { email, register_password, active } = user;

        // select data from db
        const [dataUserRegister] = await selectLoginByEmailModel(email);

        if (!dataUserRegister) {
            res.status(400).send({
                message: 'Email y/o contraseña incorrectos',
            });
        }

        // compare password -----------------------
        const passwordMatched = bcrypt.compareSync(
            register_password,
            dataUserRegister.register_password
        );
        if (!passwordMatched) {
            res.status(400).send({
                message: 'Email y/o contraseña incorrectos',
            });
        }
        console.log(dataUserRegister.active);
        if (dataUserRegister.active === 0) {
            res.status(400).send({
                message: 'Tienes que activar tu cuenta',
            });
        }
        // create token ---------------------------------------
        const idForToken = dataUserRegister.register_id;
        const payload = { id: idForToken };
        console.log('el id del user del token es: ', idForToken);

        // generate token
        const token = jwt.sign(payload, SECRET, {
            expiresIn: '30d',
        });

        // send question ----------------------------------------
        res.send({
            status: 'ok',
            message: `Usuario ${dataUserRegister.email} logueado`,

            data: token,
        });
    } catch (error) {
        next(error);
    }
}

export { loginUserController };
