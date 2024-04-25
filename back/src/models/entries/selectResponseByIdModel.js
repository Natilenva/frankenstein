import getConnection from "../../db/getConnection.js";
import { notFoundError } from "../../services/errorService.js";

const selectResponseByIdModel = async (response_id) => {
    const connection = await getConnection();
    const [responses] = await connection.query(
        `SELECT
        re.response_id, 
        re.response_text,
        r.email,
        AVG(IFNULL(v.vote_value,0)) AS votes,
        FROM
        responses re
        INNER JOIN register r ON r.register_id ON re.register_id
        LEFT JOIN votes v ON v.response_id = re.response_id WHERE re.response_id = ?
        `,
        [response_id],
    );

    if (responses.length < 1 || !responses[0].response_id){notFoundError('respuestas');
}

responses[0].votes = Number(responses[0].votes);
}

export default selectResponseByIdModel;