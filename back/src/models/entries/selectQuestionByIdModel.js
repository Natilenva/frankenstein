import getConnection from "../../db/getConnection.js";
import { notFoundError } from "../../services/errorService.js";

const selectQuestionByIdModel = async (question_id) => {
    const connection = await getConnection();
    const [questions] = await connection.query(
        `SELECT
        q.questions_id, 
        q.questions_titles,
        q.questions_description,
        q.register_id,
        r.email,
        AVG(IFNULL(v.vote_value,0)) AS votes,
        q.create_ad
        FROM
        questions q
        INNER JOIN register r ON r.register_id ON q.register_id
        LEFT JOIN votes v ON v.question_id = q.questions_id WHERE q.questions_id = ?
        `,
        [question_id],
    );

    if (questions.length < 1 || !questions[0].questions_id){notFoundError('preguntas');
}

questions[0].votes = Number(questions[0].votes);
}

export default selectQuestionByIdModel;