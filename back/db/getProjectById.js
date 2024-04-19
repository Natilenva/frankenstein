import { generateError } from '../helpers/generateError.js';
import { getConnection } from './db.js';

const getProjectById = async (user_id) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `
            SELECT project_id, projects.user_id, projects.title, projects.description, projects.created_at FROM projects WHERE project_id = ?
            `,
            [user_id]
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
