import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const getEventByIdModel = async (register_id) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            'SELECT events.event_id, events.register_id, events.event_title, events.event_description, place, events.event_photo, events.event_url, events.created_at, register.email FROM events LEFT JOIN register ON events.register_id = register.register_id WHERE events.event_id = ?',
            [register_id]
        );
        if (result.length === 0) {
            throw generateError(`El evento con id ${event_id} no existe`, 404);
        }
        return result[0];
    } catch (error) {
        throw generateError('Problem select BBDD');
    }
};
export { getEventByIdModel };
