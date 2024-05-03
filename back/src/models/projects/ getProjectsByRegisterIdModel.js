import getConnection from '../../db/getConnection.js';

const getProjectsByRegisterIdModel = async (id) => {
    let connetion;
    connetion = await getConnection();
    const [result] = await connetion.query(
        `
    SELECT projects.*, register.email FROM projects LEFT JOIN register ON projects.register_id = register.register_id WHERE projects.register_id = ?
    `,
        [id]
    );
    return result;
};
export { getProjectsByRegisterIdModel };
