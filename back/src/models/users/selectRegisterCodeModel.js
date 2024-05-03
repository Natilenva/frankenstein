import getConnection from '../../db/getConnection.js';

const selectRegisterCodeModel = async (registrationCode) => {
    let connection;
    connection = await getConnection();
    const user = await connection.query(
        `
    SELECT * FROM register WHERE register_code = ?
    `,
        [registrationCode]
    );
    console.log(user);
    if (!user) {
        throw new Error('<h1>El usuario no existe o ya ha sido validado </h1>');
    }
    return user;
};
export { selectRegisterCodeModel };
