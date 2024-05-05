import getConnection from '../../db/getConnection.js';

const updateEventModel = async (
    event_title,
    event_description,
    place,
    event_photo,
    event_url,
    event_id
) => {
    let connection;
    connection = await getConnection();

    const [result] = await connection.query(
        `UPDATE events SET event_title = ?, event_description = ?, place = ?, event_photo = ?, event_url = ? WHERE event_id = ?`,
        [
            event_title,
            event_description,
            place,
            event_photo,
            event_url,
            event_id,
        ]
    );

    return result.insertId;
};

export { updateEventModel };
