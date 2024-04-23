import getConnection from "../../db/getConnection.js";
import { notFoundError } from "../../services/errorService.js";

const selectUserByIdModel = async (register_id) => {
    const connection= await getConnection();
    const [users]= await connection.query(
     `SELECT register_id, email, register_password FROM register WHERE register_id = ?`,
     [register_id],
    );
    
    if (users.length<1){
        notFoundError('usuario');
    }
    return users[0];
};
export default selectUserByIdModel;