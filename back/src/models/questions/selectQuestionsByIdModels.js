// Importamos la función que devuelve una conexión con la base de datos.
import getConnection from '../../db/getConnection.js';

// Importamos las entradas.
import { notFoundError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos retornar una entrada concreta.
const selectQuestionsByIdModels = async (question_id) => {
    const connection = await getConnection();

    // Intentamos localizar la entrada con el id recibido.
    const [question] = await connection.query(
        
         `   SELECT
                q.question_id,
                q.question_title,
                q.question_description,
                q.register_id,
                r.email, 
                q.createdAt
            FROM questions q
            INNER JOIN register r ON r.register_id = q.register_i
            WHERE q.question:id = ?`
        ,
        [question_id],
    );

    // Si no existe la entrada lanzamos un error.
    if (question.length < 1 || !question[0].question_id) {
        notFoundError('pregunta');
    }
return question[0];
};

export default selectQuestionsByIdModels;