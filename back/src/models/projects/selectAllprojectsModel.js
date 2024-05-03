import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const selectAllProjectsModel = async () => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(`
      SELECT projects.project_id, projects.project_title, projects.project_description, projects.project_photo, projects.project_url, projects.created_at, register.email FROM projects  LEFT JOIN register ON projects.register_id = register.register_id ORDER BY projects.created_at DESC
      `);
        console.log(result);
        return result;
    } catch (error) {
        throw generateError('Error select projects BBDD', 500);
    }
};
export { selectAllProjectsModel };
