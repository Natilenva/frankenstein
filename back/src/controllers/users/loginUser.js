import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getConnection } from '../../../db/db.js';
const { SECRET } = process.env;

async function loginUser(req, res) {
    let connection;
    connection = await getConnection();
    console.log(req.body);
    const user = req.body;
    const { email, password } = user;

    const [userDB] = await connection.query(
        `
        SELECT * FROM users WHERE email = ? ;`,
        [email]
    );
    //poner error si no hay usuario en BD
    console.log(userDB[0].password);

    const passwordMatched = bcrypt.compareSync(password, userDB[0].password);
    if (!passwordMatched) {
        console.log('Email y/o contraseñas incorrectos');
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
        user: userInfo,
        data: token,
    });
}

export { loginUser };
