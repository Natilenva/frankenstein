import getConnection from "../../db/getConnection.js";

// select all skills in db
const selectDistinctSkillsModel = async () => {

    const connection = await getConnection();

    const [rows] = await connection.query(
        `SELECT DISTINCT skill FROM ExpertSkillsV1 ORDER BY skill ASC`
    );

    // send response
    return rows.map(row => row.skill);
};
export default selectDistinctSkillsModel;
