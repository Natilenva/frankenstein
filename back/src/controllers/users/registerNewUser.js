import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET } = process.env;
import { getConnection } from '../../../db/db.js';
import { userSchema } from '../../../schemas/userSchema.js';
import { zodErrorMap } from '../../../helpers/zodError.js';
import { generateError } from '../../../helpers/generateError.js';
async function registerNewUser(req, res) {
    const { success, data: user, error } = userSchema.safeParse(req.body);
    if (!success) {
        const errors = zodErrorMap(error.issues);
        return res.status(400).send({ error: errors });
    }
    try {
        let connection;
        connection = await getConnection();

        console.log(user);

        const { email, password, username, name, lastname, birthdate, role } =
            user;
        const [userEmail] = await connection.query(
            `
        
        SELECT user_id FROM users WHERE email= ?`,
            [email]
        );
        if (userEmail.length > 0) {
            throw generateError('Ya existe un usuario con ese mail', 409);
        }

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

        const userInfo = {
            user_id: insertInfo.insertId,
            user,
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
