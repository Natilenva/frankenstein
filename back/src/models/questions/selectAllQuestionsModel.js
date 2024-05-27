import getConnection from '../../db/getConnection.js';
import { generateError } from '../../helpers/generateError.js';

const selectAllQuestionsModel = async (
    question_title='',
    technology='',
    keyword='',
    user_id,
    limit,
    offset,
) => {
    const connection = await getConnection();
        
        const [questions] = await connection.query(`
             SELECT 
                questions.question_id,
                questions.question_title,
                questions.question_description,
                questions.technology, 
                questions.user_id = ? as owner,
                register.email,
                questions.created_at
            FROM questions 
            INNER JOIN register ON questions.user_id = register.register_id  
            WHERE questions.question_title LIKE ? AND technology LIKE ? AND questions.question_description LIKE ?
            ORDER BY questions.created_at DESC
            LIMIT ? OFFSET ?
        `,
        [
            user_id,
            `%${question_title}%`,
            `%${technology}%`,
            `%${keyword}%`,
            limit,
            offset,
            
        ],
    );
    
    for(const question of questions){
        question.owner= Boolean(question.owner);
    }

    return questions;
 
};
export { selectAllQuestionsModel };
