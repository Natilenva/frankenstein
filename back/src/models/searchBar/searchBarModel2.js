import getConnection from "../../db/getConnection.js";

const connection= await getConnection()

const searchBarModel= async(
   
 )=>{
    const [projects] = await connection.query(`
SELECT *
FROM projects 
`)


    const [questions] = await connection.query(`
    SELECT 
      *
   FROM questions 
   
`)

const [profile] = await connection.query(`
SELECT 
  *
FROM profile 

`,

)
const [companies] = await connection.query(`
SELECT 
      *
FROM companies  
`,
)

return [{projects}, {questions}, {profile}, {companies}]
}

export default searchBarModel;