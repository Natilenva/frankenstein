import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const selectAllQuestionsModel = async () => {
    let connection;
    try {
        connection = await getConnection();
        const [result] = await connection.query(`
        SELECT questions.question_id, questions.question_title, questions.question_description, questions.technology, questions.created_at, register.email, responses.response_id, responses.response_text FROM questions  LEFT JOIN register ON questions.user_id = register.register_id  RIGHT JOIN responses ON questions.question_id = responses.question_id ORDER BY questions.created_at DESC
        `);
        return result;
    } catch (error) {
        throw generateError('Error con select questions BBDD', 500);
    }
};
export { selectAllQuestionsModel };
