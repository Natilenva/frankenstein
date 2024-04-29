import getConnection from '../../db/getConnection.js';

const updateProjectModel = async (
    project_title,
    project_description,
    project_photo,
    project_url,
    userId
) => {
    const connection = await getConnection();

    const [result] = await connection.query(
        `UPDATE projects SET project_title = ?, project_description = ?, project_photo = ?, project_url = ? WHERE register_id = ?`,
        [project_title, project_description, project_photo, project_url, userId]
    );

    return result.insertId;
};

export default updateProjectModel;
