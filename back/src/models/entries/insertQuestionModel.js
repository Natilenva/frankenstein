import getConnection from "../../db/getConnection.js";

/* const insertQuestionModel = async (question_title, question_description, userId) => { */
const insertQuestionModel = async (question_title, question_description, userId) => {

    const connection = await getConnection();

    const [result] = await connection.query(
        `INSERT INTO questions (question_title, question_description, user_id) VALUES (?,?,?)`,
        [question_title, question_description, userId]
    );
return result.insertId
};
    
export default insertQuestionModel;