import getConnection from '../../db/getConnection.js';

const deleteProjectById = async (id) => {
    let connection;
    try {
        connection = await getConnection();
        await connection.query(
            `
        DELETE FROM projects WHERE project_id = ?`,
            [id]
        );
        return;
    } catch (error) {
        console.error(error.message);
    }
};
export { deleteProjectById };
