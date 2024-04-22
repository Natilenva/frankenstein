import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { SECRET } = process.env;
import { getConnection } from '../../../db/db.js';
import { userSchema } from '../../../schemas/userSchema.js';
import { zodErrorMap } from '../../../helpers/zodError.js';
import { generateError } from '../../../helpers/generateError.js';

async function registerNewUser(req, res) {
    //console.log('req.body: ',req.body );

    // zod validation for new user data 
    // TODO en userSchema falta agregar la validación de register_code 
    const { success, data: user, error } = userSchema.safeParse(req.body); 

    if (!success) {
        const errors = zodErrorMap(error.issues);
        return res.status(400).send({ error: errors });
    }
    // TODO me está dejando insertar un email mal construido 

    try {
        let connection; // create new connection to db
        connection = await getConnection(); // get connection to db

        const { register_id, email, register_password, register_code } = user;
        
        // check if user exists by email
        const [userEmail] = await connection.query(
            `SELECT register_id FROM register WHERE email= ?`,[email]
        );
        // if user exists, throw error 
        if (userEmail.length > 0) {
            throw generateError('Ya existe un usuario con ese mail', 409);
        }
        // TODO si Ya existe un usuario con ese mail, Postman no recibe Response, solo la recibo en la terminal 

        // hash password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(register_password, saltRounds);

        const insertInfo = await connection.query(
            `INSERT INTO register (register_id, email, register_password, register_code) VALUES (?,?,?,?)`,
            [register_id, email, hashedPassword, register_code]
        );

        // define user info
        const userInfo = {
            user_id: insertInfo.insertId,
            user,
        };

        // generate token
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
