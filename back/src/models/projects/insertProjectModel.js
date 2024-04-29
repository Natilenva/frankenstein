import getConnection from '../../db/getConnection.js';

const insertProjectModel = async (
    project_title,
    project_description,
    project_photo,
    project_url,
    userId
) => {
    const connection = await getConnection();

    const [result] = await connection.query(
        `INSERT INTO projects (project_title, project_description, project_photo, project_url, register_id) VALUES (?,?,?,?,?)`,
        [project_title, project_description, project_photo, project_url, userId]
    );

    return result.insertId;
};

export default insertProjectModel;
