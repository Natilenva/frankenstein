import getConnection from '../../db/getConnection.js';
import { notFoundError } from '../../services/errorService.js';

const selectProfileByModel = async (profile_id) => {
    let connection;

    connection = await getConnection();
    const [profile] = await connection.query(
        `SELECT register_id, profile_name, profile_lastname, profile_username, birthdate, profile_role, avatar FROM profile WHERE profile_id = ?`,
        [profile_id]
    );

    if (profile.length < 1) {
        notFoundError('perfil');
    }
    return profile[0];
};
export default selectProfileByModel;
