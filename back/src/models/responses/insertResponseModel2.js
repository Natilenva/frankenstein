import getConnection from "../../db/getConnection.js";

// insert response
const insertResponseModel=async (response_text, user_id, question_id) => {

    const connection=await getConnection()

    const [response] = await connection.query(`
        INSERT INTO responses (response_text, profile_id, question_id) VALUES (?, ?, ?)
    `,[response_text, user_id, question_id])

    return response.insertId;
};
export default insertResponseModel;

