import getConnection from "../../db/getConnection.js";

const selectTotalNumberOfQuestionModel= async()=>{
    const connection= await getConnection();
    const [questions]= await connection.query(
        `SELECT COUNT(question_id) AS totalQuestions FROM questions`);

        return questions[0].totalQuestions;
}

export default selectTotalNumberOfQuestionModel;