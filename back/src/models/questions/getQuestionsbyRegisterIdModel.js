import getConnection from '../../db/getConnection.js';

const getQuestionsByRegisterIdModel = async (id) => {
    let connetion;
    connetion = await getConnection();
    const [result] = await connetion.query(
        `
    SELECT questions.*, register.email FROM questions LEFT JOIN register ON questions.user_id = register.register_id WHERE questions.user_id = ?
    `,
        [id]
    );
    return result;
};
export { getQuestionsByRegisterIdModel };
