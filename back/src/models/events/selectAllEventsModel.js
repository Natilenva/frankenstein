import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const selectAllEventsModel = async () => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(`
      SELECT events.event_id, events.event_title, events.event_description, events.place, events.event_photo, events.event_url, events.created_at, register.email FROM events  LEFT JOIN register ON events.register_id = register.register_id ORDER BY events.created_at DESC
      `);

        return result;
    } catch (error) {
        throw generateError('Error select events BBDD', 500);
    }
};
export { selectAllEventsModel };
