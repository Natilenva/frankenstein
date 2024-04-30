import getConnection from "../../db/getConnection.js";

const deleteResponseModel = async(response_id)=>{
    const connection= await getConnection();
    await connection.query(
        `DELETE FROM responses WHERE response_id=?`,
        [response_id]
    );
};

export default deleteResponseModel;