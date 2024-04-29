import selectDistinctTechnologies from "../../models/questions/selectDistinctTechnologies.js";

const questionTechSelectFilterController = async (req, res, next) => {

    try {
        const companiesDistinct = await selectDistinctTechnologies();

        res.status(201).send({
            status:'ok',
            message:'Technologies in questions',
            technologies: companiesDistinct
        });
    
    } catch (err) {
        next(err);
    }
};
export { questionTechSelectFilterController};