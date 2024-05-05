import getConnection from '../../db/getConnection.js';

const selectEventsByRegisterIdModel = async (id) => {
    let connetion;
    connetion = await getConnection();
    const [result] = await connetion.query(
        `
    SELECT events.*, register.email FROM events LEFT JOIN register ON events.register_id = register.register_id WHERE events.register_id = ?
    `,
        [id]
    );
    return result;
};
export { selectEventsByRegisterIdModel };
