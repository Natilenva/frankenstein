import getConnection from '../../db/getConnection.js';

const updateProfileModel = async (
    profile_name,
    profile_lastname,
    profile_username,
    birthdate,
    avatar,
    profile_role,
    company_name,
    userId
) => {
    console.log({
        profile_name,
        profile_lastname,
        profile_username,
        birthdate,
        avatar,
        profile_role,
        company_name,
        userId,
    });
    const connection = await getConnection();
    let result;
    if (!avatar) {
        [result] = await connection.query(
            `UPDATE profile SET profile_name = ?, profile_lastname = ?, profile_username = ?, birthdate = ?, profile_role = ? WHERE register_id = ?`,
            [
                profile_name,
                profile_lastname,
                profile_username,
                birthdate,
                profile_role,
                userId,
            ]
        );
    } else {
        [result] = await connection.query(
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
    }

    if (profile_role === 'company')
        await connection.query(
            `INSERT INTO companies (company_name,
                register_id)
                VALUES (?,?)
            `,
            [company_name, userId]
        );

    // await connection.query(
    //     `
    // UPDATE register SET email = ? WHERE register_id =? `,
    //     [email, userId]
    // );

    console.log(result);
    return result.insertId;
};
export { updateProfileModel };
