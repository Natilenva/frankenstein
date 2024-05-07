import getConnection from '../../db/getConnection.js';

const updateProjectModel = async (
    project_title,
    project_description,
    project_photo,
    project_url,
    project_id
) => {
    let connection;
    connection = await getConnection();

    const [result] = await connection.query(
        `UPDATE projects SET project_title = ?, project_description = ?, project_photo = ?, project_url = ? WHERE project_id = ?`,
        [
            project_title,
            project_description,
            project_photo,
            project_url,
            project_id,
        ]
    );

    return result.insertId;
};

export default updateProjectModel;
