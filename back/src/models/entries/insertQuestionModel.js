import getConnection from "../../db/getConnection.js";

// insert question 
const insertQuestionModel = async (question_title, question_description, technology, userId) => {

    const connection = await getConnection();

    // insert question in db
    const [result] = await connection.query(
        `INSERT INTO questions (question_title, question_description, technology, user_id) VALUES (?,?,?,?)`,
        [question_title, question_description, technology, userId]
    );

    /* console.log('Datos de result:', result);
    console.log('Número de filas afectadas:', result.affectedRows);
    console.log('ID del registro insertado:', result.insertId);
    console.log('Número de filas insertadas:', result.changedRows); */

    //console.log('Datos de fields:', fields); //undefined

    // validate?
    if (result.affectedRows === 0) {
        throw generateError(`No se pudo insertar la pregunta`, 400);
    }

    // send response
    return result.insertId
};
    
export default insertQuestionModel;