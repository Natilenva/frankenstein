import getConnection from '../../db/getConnection.js';

import { profileSchema } from '../../schemas/profileSchema .js';
import { zodErrorMap } from '../../helpers/zodError.js';

const profileUpdateController = async (req, res, next) => {
    console.log('req.body): ', req.body);
    try {
        let connection;

        const {
            success,
            data: profile,
            error,
        } = profileSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }
        const {
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            profile_role,
            company_name,
        } = profile;
        connection = await getConnection();

        const [profileDB] = await connection.query(
            `UPDATE profile SET profile_name = ?,
                profile_lastname = ?,
                profile_username = ?,
                birthdate = ?,
                profile_role = ? WHERE
                register_id = ?
               
            `,
            [
                profile_name,
                profile_lastname,
                profile_username,
                birthdate,
                profile_role,
                req.userId,
            ]
        );
        connection = await getConnection();

        const [company] = await connection.query(
            `UPDATE companies SET company_name = ? WHERE 
                register_id = ? 
                
            `,
            [company_name, req.userId]
        );
        console.log(profileDB);
        console.log(company);

        res.send('Perfil creado');
    } catch (error) {
        console.error(error);
    }
};

export { profileUpdateController };
