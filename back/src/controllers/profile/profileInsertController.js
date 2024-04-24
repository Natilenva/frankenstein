import getConnection from '../../db/getConnection.js';
import jwt from 'jsonwebtoken';
const { SECRET } = process.env;

const profileInsertController = async (req, res, next) => {
    console.log('req.body): ', req.body);
    try {
        const { authorization } = req.headers;
        let tokenInfo;

        tokenInfo = jwt.verify(authorization, SECRET);

        const user = tokenInfo;
        console.log('req.user.user_id): ', req.user.user_id);

        const {
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            profile_role,
            company_name,
        } = req.body;
        const connection = await getConnection();

        const [profile] = await connection.query(
            `INSERT INTO profile (profile_name,
                profile_lastname,
                profile_username,
                birthdate,
                profile_role,
                company_name, 
                register_id) 
                VALUES (?,?,?,?,?,?,?)
            `,
            [
                profile_name,
                profile_lastname,
                profile_username,
                birthdate,
                profile_role,
                company_name,
                //req.user.user_id,
                //comente la linea anterior porque no me funcionaba, igual lo miramos todos mañana
                req.userId,
            ]
        );
        console.log(profile);

        res.send('Perfil creado');
    } catch (error) {
        console.error(error);
    }
};

export { profileInsertController };
