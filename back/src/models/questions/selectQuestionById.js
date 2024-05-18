import getConnection from "../../db/getConnection.js";
import { generateError } from "../../helpers/generateError.js";

// select question by id 
const selectQuestionById = async (id) => {

      // connection
      const connection = await getConnection();

      // select question
      const [result] = await connection.query(
        `SELECT 
          q.question_id,
          q.question_title,
          q.question_description,
          q.technology,
          q.created_at,
          q.modified_at,
          q.user_id, 
          r.response_id,
          r.response_text,
          v.vote_response_id,
          v.vote_value    
        FROM questions q
        LEFT JOIN responses r ON r.question_id = q.question_id
        LEFT JOIN votes v ON v.response_id = r.response_id
        WHERE q.question_id = ?;
         `,
         [id]);

      // if not found
      if (result.length === 0) {
          throw generateError(`Question con id: ${id} no encontrada`, 404);
      }

      result[0].response_id= Boolean(result[0].response_id);
     console.log(result);
      
      return result[0];//result is a object
  };
export default selectQuestionById