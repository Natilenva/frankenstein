import getConnection from '../../db/getConnection.js';
import { notFoundError } from '../../services/errorService.js';

const selectEventByModel = async (event_id) => {
    let connection;

    connection = await getConnection();
    const [event] = await connection.query(
        `SELECT event_title, event_description, place, event_photo, event_url FROM events WHERE event_id = ?`,
        [event_id]
    );

    if (event.length < 1) {
        notFoundError('evento');
    }
    return event[0];
};
export default selectEventByModel;
