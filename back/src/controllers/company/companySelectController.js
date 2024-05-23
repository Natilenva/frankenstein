// import selectDistinctCompanies from "../../models/companies/selectDistinctCompanies.js";

// //TODO no necesito el req, lo elimino?
// const companySelectController = async (req, res, next) => {

//     try {
//         const companiesDistinct = await selectDistinctCompanies();

//         res.status(201).send({
//             status:'ok',
//             message:'companies in db',
//             data: {
//                 companiesDistinct
//             }
//         });

//     } catch (err) {
//         next(err);
//     }
// };
// export { companySelectController};
