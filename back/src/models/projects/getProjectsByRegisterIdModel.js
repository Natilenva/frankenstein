import getConnection from '../../db/getConnection.js';

const getProjectsByRegisterIdModel = async (id) => {
    let connetion;
    connetion = await getConnection();

    const [result] = await connetion.query(
        `
    SELECT projects.*, register.email , profile.profile_username, profile.profile_id FROM projects LEFT JOIN register ON projects.register_id = register.register_id LEFT JOIN profile ON projects.register_id = profile.register_id WHERE projects.register_id = ?
    `,
        [id]
    );

    return result;
};
export { getProjectsByRegisterIdModel };
