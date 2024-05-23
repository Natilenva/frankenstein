// import { zodErrorMap } from '../../helpers/zodErrorMap.js';
// import insertCompanyModel from '../../models/companies/insertCompanyModel.js';
// import { companySchema } from '../../schemas/companyShema.js';

// const newCompanyController = async (req, res, next) => {
//     try {
//         // validation schema with zod
//         const {
//             success,
//             data: companyDataBody,
//             error,
//         } = companySchema.safeParse(req.body);

//         if (!success) {
//             const errors = zodErrorMap(error.issues);
//             return res.status(400).send({ error: errors });
//         }
//         // validated field
//         const { company_name } = companyDataBody;

//         //? controlar que un usuario no inserte mas de una vez la misma empresa?

//         // insert company
//         const id = await insertCompanyModel(company_name, req.userId);

//         // send response
//         res.status(201).send({
//             status: 'ok',
//             message: 'inserted company in db',
//             data: {
//                 company_id: id,
//                 company_name,
//                 userId: req.userId,
//             },
//         });
//     } catch (err) {
//         next(err);
//     }
// };
// export default newCompanyController;
