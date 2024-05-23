import getConnection from '../../db/getConnection.js';

const selectProfileIdCompanyModel = async (id) => {
    let connection;
    connection = await getConnection();
    const company = await connection.query(
        `
    SELECT * FROM profile WHERE register_id = ?
    `,
        [id]
    );
    return company[0];
};
export { selectProfileIdCompanyModel };
