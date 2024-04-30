import getConnection from '../../db/getConnection.js';
import { notFoundError } from '../../services/errorService.js';

const selectResponseByIdModel = async (response_id) => {
    const connection = await getConnection();
    const [responses] = await connection.query(
        `
    SELECT * FROM responses WHERE response_id IN (
        SELECT r.response_id
        FROM responses r
        LEFT JOIN votes v ON r.response_id = v.response_id
        WHERE v.vote_response_id = ? AND v.vote_value IS  NULL 
    ) 
    `,
        [response_id]
    );

    if (responses.length < 1 || !responses[0].response_id) {
        notFoundError('respuestas');
    }
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
    responses[0].votes = Number(questions[0].votes);
};

export default selectResponseByIdModel;
