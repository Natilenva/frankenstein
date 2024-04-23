import 'dotenv/config'
import jwt from 'jsonwebtoken';

import { transporter } from '../../services/mailer.js';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
const {SECRET, PORT}= process.env

const forgotPasswordController = async (req, res, next)=>{
    const {email}= req.body;

    const user = await selectUserByEmailModel(email)
console.log(user);

    const secret = SECRET + user.register_password;
    const pl = {
        email: user.email,
        id: user.register_id
    };
    const token = jwt.sign(pl, secret, {expiresIn: '15m'});
    const link = `http://localhost:${PORT}/reset-password/${user.register_id}/${token}`;

    // // mailer----------------------------
//     async function main() {
//         // send mail with defined transport object
//         await transporter.sendMail({
//           from: '"Frankenstein" <maddison53@ethereal.email>', // sender address
//           to: user.email, // list of receivers
//           subject: "Cambio de contraseña", // Subject line
//           text: "Cliquea el link", // plain text body
//           html: `<a href="${link}">${link}</a`, // html body
//         });}
//         main().catch(console.error);
//         // ---------------------------------------

//     res.send('Link de reseteo de contraseña enviado a tu email')


    console.log(link);};

    export default forgotPasswordController;