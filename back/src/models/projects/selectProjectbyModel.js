import getConnection from '../../db/getConnection.js';
import { notFoundError } from '../../services/errorService.js';

const selectProjectByModel = async (project_id) => {
    let connection;

    connection = await getConnection();
    const [project] = await connection.query(
        `SELECT project_id, project_title, project_description, project_photo, project_url, created_at, register_id FROM projects WHERE project_id = ?`,
        [project_id]
    );

    if (project.length < 1) {
        notFoundError('proyecto');
    }
    return project[0];
};
export default selectProjectByModel;
