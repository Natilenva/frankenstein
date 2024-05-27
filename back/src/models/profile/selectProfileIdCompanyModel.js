import getConnection from '../../db/getConnection.js';

const selectProfileIdCompanyModel = async (id) => {
    let connection;
    connection = await getConnection();
    await connection.query('USE frankenstein');
    const company = await connection.query(
        `
    SELECT profile.*, register.email, companies.company_name FROM profile INNER JOIN register ON profile.register_id = register.register_id INNER JOIN companies ON profile.register_id = companies.register_id WHERE profile.register_id = ?
    `,
        [id]
    );
    return company[0];
};
export { selectProfileIdCompanyModel };
