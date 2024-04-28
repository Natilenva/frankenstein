import getConnection from '../../db/getConnection.js';

const selectProfileById = async (id) => {
    const connection = await getConnection();
    const [profile] = await connection.query(
        `SELECT * FROM profile pr INNER JOIN register re ON pr.register_id = re.register_id WHERE pr.register_id = ?`,
        [id]
    );
    console.log(profile);
    if (profile.length > 0) {
        console.log('Este perfil ya existe');
    }
    console.log(profile[0]);
    return profile[0];
};
export { selectProfileById };
