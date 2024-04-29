import getConnection from "../../db/getConnection.js";

// insert company 
const selectDistinctTechnologies = async () => {

    const connection = await getConnection();

    // select all distinct companies in db
    const [rows] = await connection.query(
        `SELECT DISTINCT technology FROM questions ORDER BY technology ASC`
    );
    //console.log('rows: ', rows);

    // send response
    //: filter for falsy values | !! (cast to boolean)
    //return rows.map(row => row.technology).filter(x => !!x);
    return rows.map(row => row.technology).filter(x => x);
};   
export default selectDistinctTechnologies;