import getConnection from "../../db/getConnection.js";
const selectUserByEmailModel= async (email)=>{
    const connection = await getConnection();

    const [users]= await connection.query(
        `SELECT register_id, register_password, email FROM register WHERE email =?`,
        [email],
    );
    return users[0];
};

export default selectUserByEmailModel;