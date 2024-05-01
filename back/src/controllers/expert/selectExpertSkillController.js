import selectDistinctSkillsModel from '../../models/skills/selectDistinctSkillsModel.js';

const selectExpertSkillController = async (req, res, next) => {
    try {
        const skills = await selectDistinctSkillsModel();

        res.status(200).send({
            status: 'ok',
            message: 'Skills in dt ExpertSkillsV1',
            data: {
                skills
            },
        });
    } catch (err) {
        next(err);
    }
};
export { selectExpertSkillController };
