import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const insertNewRegisterModel = async (
    register_id,
    email,
    hashedPassword,
    registrationCode
) => {
    let connection;
    try {
        connection = await getConnection();
        await connection.query(
            `INSERT INTO register (register_id, email, register_password, register_code) VALUES (?,?,?,?)`,
            [register_id, email, hashedPassword, registrationCode]
        );
    } catch (error) {
        throw generateError('Problema insert BBDD', 500);
    }
};

export { insertNewRegisterModel };
