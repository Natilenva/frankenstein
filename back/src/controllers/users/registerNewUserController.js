import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET, PORTFRONT } = process.env;
import { registerSchema } from '../../schemas/registerSchema.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { sendEmail } from '../../helpers/sendEmail.js';
import * as crypto from 'crypto';
import { selectRegisterByEmailModel } from '../../models/users/selectRegisterByEmailModel.js';
import { insertNewRegisterModel } from '../../models/users/insertNewRegisterModel.js';
import { generateError } from '../../helpers/generateError.js';

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
         
         <!doctype html>
    <html>
      <head>
       
        <style>
        p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
        h1{ font-size: 30px !important;}
        h2{ font-size: 25px !important;}
        h3{ font-size: 18px !important;}
        h4{ font-size: 16px !important;}
        p, a{font-size: 15px !important;}
         
        .claseBoton{
            width: 30%;
                background-color: #829821;
                border: 2px solid #829821;
                color: #000000; 
                padding: 8px 16px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
        }
        .claseBoton:hover{
            background-color: #000000;
            color: #ffffff;
        }
        .imag{
            width: 20px;
            height: 20px;
        }
        .contA{
            margin: 0px 5px 0 5px;
        }
        .afooter{
            color: #ffffff !important; 
            text-decoration: none;
            font-size: 13px !important;
        }
    </style>
      </head>
      <body>
     
        <div style="padding: 20px 10px 20px 10px;">
            <!-- Imagen inicial -->
            <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
             
            </div>
            <!-- Imagen inicial -->
             <!-- Contenido principal -->
            <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
        <h1>¡Bienvenid@ a Frankenstein!</h1>
         <p>Activa tu cuenta haciendo click en el siguiente enlace.</p>
        <a class="claseBoton" href="${PORTFRONT}/validate/${registrationCode}">Activar cuenta</a>
          <!-- Footer -->
            <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
 

           
                <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                    © 2024 Frankenstein, todos los derechos reservados.
                </p>
            </div>
            <!-- Footer -->



        </div>
    </div>

      </body>
    </html>
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
            status: 'ok',
            message: `Usuario creado correctamente`,
        });
    } catch (error) {
        next(error);
    }
}
export { registerNewUserController };
