import getConnection from '../../db/getConnection.js';

const insertProfileByModel = async (
    imageFileName,
    profile_name,
    profile_lastname,
    profile_username,
    birthdate,
    profile_role,
    company_name,
    userId
) => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `
            INSERT INTO profile (avatar, profile_name, profile_lastname, profile_username, birthdate, profile_role, register_id) VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                imageFileName,
                profile_name,
                profile_lastname,
                profile_username,
                birthdate,
                profile_role,
                userId,
            ]
        );

        connection = await getConnection();

        const [company] = await connection.query(
            `INSERT INTO companies (company_name,
                register_id)
                VALUES (?,?)
            `,
            [company_name, userId]
        );

        return result.inserId;
    } catch (error) {
        console.log(error);
    }
};
export { insertProfileByModel };
