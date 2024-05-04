import getConnection from "../../db/getConnection.js";

const selectDistinctCompanies = async () => {

    const connection = await getConnection();

    // select all distinct companies in db
    const [rows] = await connection.query(
        `SELECT DISTINCT company_name FROM companies ORDER BY company_name ASC`
    );

    // send response
    //: filter for falsy values | !! (cast to boolean)
    // return rows.map(row => row.company_name).filter(x => !!x);
    return rows.map(row => row.company_name).filter(x => x);
};
    
export default selectDistinctCompanies;