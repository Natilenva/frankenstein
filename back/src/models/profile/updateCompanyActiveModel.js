import getConnection from '../../db/getConnection.js';

const updateCompanyActiveModel = async (company) => {
    let connection;
    connection = await getConnection();
    await connection.query(
        `
    UPDATE profile SET is_company_validated = true WHERE register_id = ?
    `,
        [company.register_id]
    );
    return;
};
export { updateCompanyActiveModel };
