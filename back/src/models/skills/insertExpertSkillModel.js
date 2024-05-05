import getConnection from '../../db/getConnection.js';
const insertExpertSkillModel = async (idSkill, expertUserId) => {
    const connection = await getConnection();

    // insert company in db
    const [result] = await connection.query(
        `INSERT INTO ExpertSkillsV1 (idSkill, expertUserId) VALUES (?,?)`,
        [idSkill, expertUserId]
    );
    return result;
};
export default insertExpertSkillModel;
