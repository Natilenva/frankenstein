import getConnection from '../../db/getConnection.js';
import { notFoundError } from '../../services/errorService.js';

const selectProfileByModel = async (register_id) => {
    let connection;

    connection = await getConnection();
    const [profile] = await connection.query(
        `SELECT profile.register_id, profile_name, profile_lastname, profile_username, birthdate, profile_role, avatar, profile.is_company_validated, company_name FROM profile LEFT JOIN companies ON profile.register_id = companies.register_id WHERE profile.register_id = ?`,
        [register_id]
    );
    // await connection.query(
    //     `SELECT company_name, register_id FROM companies WHERE register_id = ?`,
    //     [register_id]
    // );

    if (profile.length < 1) {
        notFoundError('perfil');
    }
    return profile[0];
};
export default selectProfileByModel;
