import getConnection from "../../db/getConnection.js";
import { generateError } from "../../helpers/generateError.js";

// select question by id 
const selectQuestionById2 = async (questionParamId) => {

      // connection
      const connection = await getConnection();

      // select question
      const [result] = await connection.query('SELECT * FROM questions WHERE question_id = ?', [questionParamId]);

      // if not found
      if (result.length === 0) {
          throw generateError(`Question con id: ${questionParamId} no encontrado`, 404);
      }
      
      return result[0];//result is a object
  };
export default selectQuestionById2