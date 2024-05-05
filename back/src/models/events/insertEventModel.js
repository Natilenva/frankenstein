import getConnection from '../../db/getConnection.js';

const insertEventModel = async (
    event_title,
    event_description,
    place,
    event_photo,
    event_url,
    userId
) => {
    let connection;
    connection = await getConnection();

    const [result] = await connection.query(
        `INSERT INTO events (event_title, event_description, place, event_photo, event_url, register_id) VALUES (?,?,?,?,?,?)`,
        [event_title, event_description, place, event_photo, event_url, userId]
    );

    return result.insertId;
};

export { insertEventModel };
