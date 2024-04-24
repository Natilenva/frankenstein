import getConnection from '../../db/getConnection.js';

const insertProjectModel = async (
    project_title,
    project_description,
    userId
) => {
    const connection = await getConnection();

    const [project] = await connection.query(
        `INSERT INTO projects (project_title, project_description, register_id) VALUES (?,?,?)`,
        [project_title, project_description, userId]
    );
    return project.insertId;
};

export default insertProjectModel;
