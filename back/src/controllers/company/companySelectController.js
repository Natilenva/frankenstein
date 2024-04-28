import { zodErrorMap } from "../../helpers/zodErrorMap.js";
import insertCompanyModel from "../../models/companies/insertCompanyModel.js";
import selectDistinctCompanies from "../../models/companies/selectDistinctCompanies.js";
import { companySchema } from "../../schemas/companyShema.js";

const companySelectController = async (req, res, next) => {
    console.log('req.body: ', req.body);
    //console.log('req.insertId2: ', req.userId);

    try {
        const companiesDistinct = await selectDistinctCompanies();

        res.status(201).send({
            //message:'no implementado, companySelectController',
            status:'ok',
            message:'companies in db',
            data: companiesDistinct
        });
    
    } catch (err) {
        next(err);
    }
};
export { companySelectController};