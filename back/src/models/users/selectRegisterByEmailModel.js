import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const selectRegisterByEmailModel = async (email) => {
    let connection;
    try {
        connection = await getConnection();

        const [userEmail] = await connection.query(
            `SELECT register_id FROM register WHERE email= ?`,
            [email]
        );

        if (userEmail.length > 0) {
            res.status(400).send('Ya existe un usuario con ese email');
        }
    } catch (error) {
        throw generateError('Ya existe un usuario con ese email', 500);
    }
};

export { selectRegisterByEmailModel };
