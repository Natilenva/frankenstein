import getConnection from '../../db/getConnection.js';

const selectLoginByEmailModel = async (email) => {
    let connection;
    connection = await getConnection();
    const dataUserRegister = await connection.query(
        `
     SELECT * FROM register WHERE email = ? ;`,
        [email]
    );

    return dataUserRegister[0];
};
export { selectLoginByEmailModel };
