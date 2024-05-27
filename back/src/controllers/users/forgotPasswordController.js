import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../helpers/sendEmail.js';

import { transporter } from '../../services/mailer.js';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
const { SECRET, PORTFRONT } = process.env;

const forgotPasswordController = async (req, res, next) => {
    const { email } = req.body;

    const user = await selectUserByEmailModel(email);
    console.log(user);

    const secret = SECRET + user.register_password;
    const pl = {
        email: user.email,
        id: user.register_id,
    };
    const token = jwt.sign(pl, secret, { expiresIn: '15m' });

    const subject = 'Resetea tu contraseña en Frankenstein';
    const content = `
    <h1>Hemos recibido su petición de reseteo de contraseña</h1>
    <p>Haga click en el enlace para actualizar su contraseña.</p>

    <a href="${PORTFRONT}/reset-password/${user.register_id}/${token}">Activar cuenta</a>
    `;
    console.log(content);
    await sendEmail(email, subject, content);
    res.send({
        message: "Revisa la bandeja de entrada de su email",
    });
};

export default forgotPasswordController;
