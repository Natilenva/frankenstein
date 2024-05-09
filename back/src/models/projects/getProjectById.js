import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const getProjectById = async (project_id) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'SELECT projects.project_id, projects.register_id, projects.project_title, projects.project_description, projects.project_photo, projects.project_url, projects.created_at, register.email FROM projects LEFT JOIN register ON projects.register_id = register.register_id WHERE projects.project_id = ?',
            [project_id]
        );
        if (result.length === 0) {
            throw generateError(
                `El projecto con id ${project_id} no existe`,
                404
            );
        }
        return result[0];
    } catch (error) {
        // throw generateError('Problem select en BBDD', 500);
        console.log(error);
    }
};
export { getProjectById };
