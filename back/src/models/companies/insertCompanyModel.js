// import getConnection from "../../db/getConnection.js";

// // insert company
// const insertCompanyModel = async (company_name, userId) => {

//     const connection = await getConnection();

//     // insert company in db
//     const [result] = await connection.query(
//         `INSERT INTO companies (company_name, register_id) VALUES (?,?)`,
//         [company_name, userId]
//     );

//      // validate?
//      if (result.affectedRows === 0) {
//         throw generateError(`No se pudo insertar la pregunta`, 400);
//     }

//     // send response
//     return result.insertId
// };

// export default insertCompanyModel;
