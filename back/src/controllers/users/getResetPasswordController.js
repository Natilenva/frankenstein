import 'dotenv/config'
import jwt from 'jsonwebtoken';

import selectUserByIdModel from '../../models/users/selectUserById.js';
const {SECRET, PORT}= process.env

const getResetPasswordController = async (req, res, next)=>{
    try {
        
  
    const { id, token }= req.params;

    const user = await selectUserByIdModel(id);

    const secret= SECRET + user.register_password;
    try {
        const pl= jwt.verify(token, secret);
        res.render('reset-password', {email: user.email})
    } catch (err) {
        console.error(err);
        res.send(err.message)
        
    }
} catch (err) {
        next(err);
};

};


export default getResetPasswordController;