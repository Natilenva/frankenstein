import getConnection from '../../db/getConnection.js';

const updateRegistrationCodeActiveModel = async (user) => {
    let connection;
    connection = await getConnection();
    await connection.query(
        `
    UPDATE register SET register_code = NULL, active = true WHERE register_id = ?
    `,
        [user.register_id]
    );
    return;
};
export { updateRegistrationCodeActiveModel };
