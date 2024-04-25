
import getConnection from "../../db/getConnection.js";
import { generateError } from "../../helpers/generateError.js";
//import generateError from '../../services/generateError.js';
//import { notFoundError } from "../../services/errorService.js";

const selectQuestionById2 = async (questionParamId) => {
  console.log('selectQuestionById2 id: ', questionParamId);

      // connection
      const connection = await getConnection();

      // select question
      const [result] = await connection.query('SELECT * FROM questions WHERE question_id = ?', [questionParamId]);
      console.log('result: ', result);

      // if not found
      if (result.length === 0) {
          throw generateError(`Question con id: ${questionParamId} no encontrado`, 404);
      }
      
      return result[0];//result is a object
  };
export default selectQuestionById2