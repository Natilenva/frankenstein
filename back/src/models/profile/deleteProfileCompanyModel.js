import getConnection from '../../db/getConnection.js';

const deleteProfileCompanyModel = async (id) => {
    let connection;
    connection = await getConnection();
    console.log('delete');
    await connection.query(
        `
    DELETE FROM profile WHERE profile.register_id = ?
    `,
        [id]
    );
    // await connection.query(
    //     `DELETE FROM companies WHERE companies.register_id =?`,
    //     [id]
    // );
    return;
};
export { deleteProfileCompanyModel };
