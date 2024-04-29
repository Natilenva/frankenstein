import selectDistinctCompanies from "../../models/companies/selectDistinctCompanies.js";

const companySelectController = async (req, res, next) => {
    console.log('req.insertId2: ', req.userId);

    try {
        const companiesDistinct = await selectDistinctCompanies();

        res.status(201).send({
            status:'ok',
            message:'companies in db',
            data: companiesDistinct
        });
    
    } catch (err) {
        next(err);
    }
};
export { companySelectController};