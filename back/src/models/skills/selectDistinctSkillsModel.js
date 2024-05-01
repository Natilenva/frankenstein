import getConnection from "../../db/getConnection.js";

// select all skills in db
const selectDistinctSkillsModel = async () => {

    const connection = await getConnection();

    const [rows] = await connection.query(
        `SELECT skill FROM ExpertSkillsV1 ORDER BY skill ASC`
    );

    // if not found
    if (rows.length === 0) {
        throw generateError(`No se encontraron skills`, 404);
    }

    // send response
    return rows.map(row => row.skill);
};
export default selectDistinctSkillsModel;
