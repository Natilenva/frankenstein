import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const getProfileById = async (register_id) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `SELECT register_id FROM profile  WHERE register_id = ?`,
            [register_id]
        );
        if (result.length > 0) {
            throw generateError(
                `El perfil con id ${profile_id} ya existe`,
                404
            );
        }
        return;
    } catch (error) {
        console.error(error.message);
    }
};
export { getProfileById };
