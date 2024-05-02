import getConnection from "../../db/getConnection.js";

const deleteQuestionsModel = async(question_id)=>{
    const connection= await getConnection();
    await connection.query(
        `DELETE FROM questions WHERE question_id=?`,
        [question_id]
    );
};

export default deleteQuestionsModel;