import getConnection from '../../db/getConnection.js';

const selectAllResponsesOfQuestionIdModel = async (question_id) => {
    const connection = await getConnection();

    const [responses] = await connection.query(
        `SELECT 
            r.response_id,
            r.response_text,
            r.register_id,
            r.question_id,
        
            AVG(IFNULL(v.vote_value, 0)) AS votes,
            r.created_at


        FROM responses r 
        LEFT JOIN votes v ON r.response_id = v.response_id  
        WHERE r.question_id = ?
        GROUP BY r.response_id
        ORDER BY r.created_at DESC;
    `,
        [question_id]
    );
    for(const response of responses){
        response.votes = Number(response.votes);  
    }
    // if (responses.length === 0) {
    //     throw generateError(`Question con id: ${question_id} no encontrada`, 404);
    // }
 
  
   return responses;

};

export default selectAllResponsesOfQuestionIdModel;
