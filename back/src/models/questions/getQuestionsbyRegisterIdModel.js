import getConnection from '../../db/getConnection.js';

const getQuestionsByRegisterIdModel = async (id) => {
    let connetion;
    connetion = await getConnection();
    const [result] = await connetion.query(
        `
    SELECT questions.*, register.email, profile.profile_username, profile.profile_id FROM questions LEFT JOIN register ON questions.user_id = register.register_id LEFT JOIN profile ON questions.user_id = profile.register_id WHERE questions.user_id = ?
    `,
        [id]
    );
    // console.log(result);
    return result;
};
export { getQuestionsByRegisterIdModel };
