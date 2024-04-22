import { generateError } from '../helpers/generateError.js';
import { getConnection } from './db.js';

const getProjectById = async (id) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `
            SELECT project_id, register_id, project_title, project_description, project_created_at FROM projects WHERE project_id = ?
            `,
            [id]
        );
        if (result.length === 0) {
            throw generateError(`El project con id ${id} no existe`, 404);
        }
        return result[0];
    } finally {
        if (connection) connection.release();
    }
};
export { getProjectById };
