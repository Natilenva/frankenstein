import getConnection from '../../db/getConnection.js';

const updateProjectModel = async (
    project_title,
    project_description,
    project_photo,
    project_url,
    project_id
) => {
    const connection = await getConnection();
    let result;
    if (!project_photo) {
        result = await connection.query(
            `UPDATE projects SET project_title = ?, project_description = ?, project_url = ? WHERE project_id = ?`,
            [project_title, project_description, project_url, project_id]
        );
    } else {
        result = await connection.query(
            `UPDATE projects SET project_title = ?, project_description = ?, project_photo = ?, project_url = ? WHERE project_id = ?`,
            [
                project_title,
                project_description,
                project_photo,
                project_url,
                project_id,
            ]
        );
    }

    return result.insertId;
};

export default updateProjectModel;
