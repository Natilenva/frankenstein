import getConnection from "../../db/getConnection.js";

const insertQuestionModel = async (question_title, question_description, register_id) => {

    const connection = await getConnection();

    const [project] = await connection.query(
        `INSERT INTO questions (question_title, question_description, register_id) VALUES (?,?,?)`,
        [question_title, question_description, register_id]
    );
return project.insertId
};
    
export default insertQuestionModel;