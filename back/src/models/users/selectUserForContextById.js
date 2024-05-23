import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

// Devuelve la información pública de un usuario por su id
const selectUserForContextById = async (id) => {
    const connection = await getConnection();

    const [result] = await connection.query(
        `SELECT register_id, email, LEFT(email, LOCATE('@', email) - 1) AS usernameOfRegister, created_at FROM register  WHERE register_id = ?`,
        [id]
    );

    if (result.length === 0) {
        throw generateError('No hay ningún usuario con esa id', 404);
    }
    const [[profileResult]] = await connection.query(
        `SELECT profile_id FROM profile  WHERE register_id = ?`,
        [result[0].register_id]
    );
    result[0].profile_id = profileResult?.profile_id;
    console.log('resultado', result[0]);
    return result[0];
};
export { selectUserForContextById };
