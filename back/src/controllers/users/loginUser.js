import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getConnection } from '../../../db/db.js';
import { generateError } from '../../../helpers/generateError.js';
import { loginSchema } from '../../../schemas/loginSchema.js';
import { zodErrorMap } from '../../../helpers/zodError.js';
const { SECRET } = process.env;

async function loginUser(req, res) {
    const { success, data: user, error } = loginSchema.safeParse(req.body);

    if (!success) {
        const errors = zodErrorMap(error.issues);
        return res.status(400).send({ error: errors });
    }
    console.log(user);
    let connection;
    connection = await getConnection();

    const { email, password } = user;
    console.log(email);
    const [userDB] = await connection.query(
        `
        SELECT * FROM users WHERE email = ? ;`,
        [email]
    );
    if (!userDB[0]) {
        res.status(400).send({ message: 'Email y/o contraseña incorrectos' });
        // throw generateError('Email y/o contraseña incorrectos', 400);
    }

    const passwordMatched = bcrypt.compareSync(password, userDB[0].password);
    if (!passwordMatched) {
        res.status(400).send({ message: 'Email y/o contraseña incorrectos' });
        // throw generateError('Email y/o contraseña incorrectos', 400);
    }
    const userInfo = {
        user_id: userDB.user_id,
        role: userDB.role,
        username: userDB.username,
    };
    const token = jwt.sign(userInfo, SECRET, { expiresIn: '1day' });
    res.setHeader('Authorization', token);
    res.send({
        message: `Usuario ${userDB[0].username} logueado`,
        token,
    });
}

export { loginUser };
