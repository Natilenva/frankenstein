import getConnection from '../../db/getConnection.js';

const updateProfileModel = async (
    profile_name,
    profile_lastname,
    profile_username,
    birthdate,
    avatar,
    profile_role,
    company_name,
    email,
    userId
) => {
    const connection = await getConnection();

    const [result] = await connection.query(
        `UPDATE profile SET profile_name = ?, profile_lastname = ?, profile_username = ?, birthdate = ?, avatar= ?, profile_role = ? WHERE register_id = ?`,
        [
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            avatar,
            profile_role,
            userId,
        ]
    );
    await connection.query(
        `
    UPDATE companies SET company_name = ? WHERE register_id =? `,
        [company_name, userId]
    );

    await connection.query(
        `
    UPDATE register SET email = ? WHERE register_id =? `,
        [email, userId]
    );

    console.log(result);
    return result.insertId;
};
export { updateProfileModel };
