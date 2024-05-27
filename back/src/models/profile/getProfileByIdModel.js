import getConnection from '../../db/getConnection.js';

const getProfileByIdModel = async (register_id) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `SELECT * FROM profile INNER JOIN companies ON profile.register_id = companies.register_id WHERE register_id = ?`,
            [register_id]
        );
        console.log(result);

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error(error.message);
    }
};

export { getProfileByIdModel };
