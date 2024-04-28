import getConnection from "../../db/getConnection.js";

// insert company 
const insertSkillModel = async (skill, userId) => {

    const connection = await getConnection();

    // insert company in db
    const [result] = await connection.query(
        `INSERT INTO ExpertSkillsV1 (skill, expertUserID) VALUES (?,?)`,
        [skill, userId]
    );
    return skill 
};
export default insertSkillModel;
