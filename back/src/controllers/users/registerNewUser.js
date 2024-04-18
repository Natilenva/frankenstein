import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET } = process.env;
import { getConnection } from '../../../db/db.js';

async function registerNewUser(req, res) {
    try {
        let connection;
        connection = await getConnection();
        const user = req.body;
        const person = req.body;
        const userType = req.body;
        const { name, lastname, birthdate } = person;
        const { email, password, username } = user;
        const { role } = userType;

        // console.log(user);
        const insertInfo = await connection.query(
            `
        INSERT INTO persons (name, lastname, birthdate) VALUES (?,?,?)
        `,
            [name, lastname, birthdate]
        );

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        await connection.query(
            `
        INSERT INTO users (email, password, username) VALUES (?,?,?)
        `,
            [email, hashedPassword, username]
        );
        await connection.query(
            `
        INSERT INTO users_types (role) VALUES (?)
        `,
            [role]
        );
        // const userInfo = {
        //     user_id: insertInfo.insertId,
        //     role: 'anonymous',
        //     username: username,
        // };
        const userInfo = {
            user_id: insertInfo.insertId,
            name: name,
        };
        const token = jwt.sign(userInfo, SECRET, { expiresIn: '1day' });
        res.setHeader('Authorization', token);
        console.log(token);
        res.send({
            message: `Usuario creado correctamente`,
            user: userInfo,
            data: token,
        });
    } catch (error) {
        console.error(error.message);
    }
}
export { registerNewUser };
