import getConnection from '../../db/getConnection.js';
import jwt from 'jsonwebtoken';
const { SECRET } = process.env;

const profileInsertController = async (req, res, next) => {
    try {
        // read token from header
        //! token 
        const { authorization } = req.headers;
        let tokenInfo;

        tokenInfo = jwt.verify(authorization, SECRET);
        //! token sin usar
        const user = tokenInfo;
        console.log('req.user.user_id): ',req.user.user_id);
        
        // create new connection to db
        const {
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            profile_role,
            company_name,
        } = req.body;
        const connection = await getConnection();

        // insert new profile into db
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
                req.user.user_id,
            ]
        );
        console.log(profile);

        res.send('Perfil creado');

    } catch (error) {
        console.error(error);
    }
};

export { profileInsertController };