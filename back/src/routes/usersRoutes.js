import express from 'express';
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { transporter } from '../services/mailer.js';
const {SECRET, PORT}= process.env
const router= express.Router();

// usuario falso para las pruebas

let user ={
    id: "safasfsgsadgdga",
    email: "juanpabloallendefp@gmail.com",
    password: "hackaboss"
};
// --------------------------------------


router.get('/forgot-password', (req, res, next)=>{
res.render('forgot-password');
});
router.post('/forgot-password', (req, res, next)=>{
    const {email}= req.body;
    if (email !== user.email){
        res.send('usuario no registrado');
        return;
    };
    const secret = SECRET + user.password;
    const pl = {
        email: user.email,
        id: user.id
    };
    const token = jwt.sign(pl, secret, {expiresIn: '15m'});
    const link = `http://localhost:${PORT}/reset-password/${user.id}/${token}`;


// mailer----------------------------
    async function main() {
        // send mail with defined transport object
        await transporter.sendMail({
          from: '"Frankenstein" <maddison53@ethereal.email>', // sender address
          to: user.email, // list of receivers
          subject: "Cambio de contraseña", // Subject line
          text: "Cliquea el link", // plain text body
          html: `<a href="${link}">${link}</a`, // html body
        });}
        main().catch(console.error);
        // ---------------------------------------

    res.send('Link de reseteo de contraseña enviado a tu email')

});



router.get('/reset-password/:id/:token', (req, res, next)=>{
    const { id, token }= req.params;
    if(id!== user.id){
        res.send('Usuario invalido')
        return;
    };
    const secret= SECRET + user.password;
    try {
        const pl= jwt.verify(token, secret);
        res.render('reset-password', {email: user.email})
    } catch (err) {
        console.error(err);
        res.send(err.message)
        
    }

});

router.post('/reset-password/:id/:token', (req, res, next)=>{
    const {id , token}= req.params;
    const {oassword, password2}= req.body;
    if(id!== user.id){
        res.send('Usuario invalido')
        return;
    };

    const secret = SECRET + user.password;
    try {
        const pl= jwt.verify(token, secret);
        user.password;
        res.send(user);
     
    } catch (err) {
        console.error(err);
        res.send(err.message)
        
    }

});


export default router;