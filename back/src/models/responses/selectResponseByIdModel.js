import getConnection from '../../db/getConnection.js';
import { notFoundError } from '../../services/errorService.js';

const selectResponseByIdModel = async (response_id='') => {
    const connection = await getConnection();

    const [responses] = await connection.query(
        `SELECT
         re.response_id, 
        re.response_text,
         re.register_id,
          v.vote_response_id FROM responses re
           LEFT JOIN votes v ON v.vote_response_id = re.response_id WHERE re.response_id = ?;
    `,
        [response_id]
    );

    if (responses.length < 1 || !responses[0].response_id===null) {
        notFoundError('respuestas');
    }
    console.log(responses);
    responses[0].register_id= Number(responses[0].register_id)

    responses[0].vote_response_id= Boolean(responses[0].vote_response_id);
    
    console.log(responses[0]);

    return responses[0];
    //    `SELECT
    //     re.response_id,
    //     re.response_text,
    //     re.register_id,

    //     v.vote_response_id,
    //     FROM responses re

    //     LEFT JOIN votes v ON v.response_id = re.response_id WHERE re.response_id = ?
    //     `
    //INNER JOIN register r ON r.register_id =  re.register_id
    //AVG(IFNULL(v.vote_value, 0)) AS votes,
    // responses[0].votes = Number(questions[0].votes);
};

export default selectResponseByIdModel;
