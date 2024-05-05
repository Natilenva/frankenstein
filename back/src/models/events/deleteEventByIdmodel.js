import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const deleteEventByIdModel = async (id) => {
    let connection;
    try {
        connection = await getConnection();
        await connection.query(
            `
        DELETE FROM events WHERE event_id = ?`,
            [id]
        );
        return;
    } catch (error) {
        throw generateError('Problema al borrar en BBDD');
    }
};
export { deleteEventByIdModel };
