import getConnection from "../../db/getConnection.js";

// insert question 
const insertQuestionModel = async (question_title, question_description, technology, userId) => {

    const connection = await getConnection();

    // insert question in db
    const [result] = await connection.query(
        `INSERT INTO questions (question_title, question_description, technology, user_id) VALUES (?,?,?,?)`,
        [question_title, question_description, technology, userId]
    );

    // send response
    return result.insertId
};
    
export default insertQuestionModel;