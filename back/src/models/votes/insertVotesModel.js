import getConnection from "../../db/getConnection.js";
import { voteAlreadyExistsError } from "../../services/errorService.js";

const insertVotesModel = async (vote_value, questions_id, register_id) => {
    const connection = await getConnection();
    const [votes]= await connection.query(
        `SELECT vote_response_id WHERE questions_id = ? AND registed_id = ?`,
        [questions_id,register_id],
    );
        if(votes.length>0){
            voteAlreadyExistsError();
        }

    await connection.query(
        `INSERT INTO votes (vote_value, questions_id, register_id) VALUES (?, ?, ?)`,
        [vote_value, questions_id, register_id],
    );

    const [votesAvg] = await connection.query(
        `SELECT AVG(vote_value) AS avg FROM votes WHERE questions_id = ?`,
        [questions_id],
    );
    return Number(votesAvg[0].avg);
} ;
export default insertVotesModel;
