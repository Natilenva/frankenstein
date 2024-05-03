import getConnection from '../../db/getConnection.js';

// insert company
const insertSkillModel = async (skill, description) => {
    const connection = await getConnection();

    // insert company in db
    // En la tabla skills, se guardaran todos los skill posibles para posteriormente
    // asociarlos a los usuarios.
    const [result] = await connection.query(
        `INSERT INTO skillsv1 (skill, description) VALUES (?,?)`,
        [skill, description]
    );
    return result;
};
export default insertSkillModel;
