import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { SECRET, PORT } = process.env;
import getConnection from '../../db/getConnection.js';
import selectUserByIdModel from '../../models/users/selectUserById.js';

const updatePasswordController = async (req, res, next) => {
    const connection = await getConnection();

    const { id, token } = req.params;

    const user = await selectUserByIdModel(id);

    const { password, password2 } = req.body;

    if (password !== password2) {
        throw {
            httpStatus: '400',
            message: 'Las contraseñas no coinciden',
        };
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    try {
        // const pl= jwt.verify(token, secret);
        await connection.query(
            `UPDATE register SET register_password = ? WHERE register_id = ? `,
            [hashedPassword, id]
        );
        res.send(user);
    } catch (err) {
        console.error(err);
        res.send(err.message);
    }
};

export default updatePasswordController;
