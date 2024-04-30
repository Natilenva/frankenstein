import selectDistinctSkillsModel from '../../models/skills/selectDistinctSkillsModel.js';

const selectExpertSkillController = async (req, res, next) => {
    try {
        const skillsDistinct = await selectDistinctSkillsModel();

        res.status(200).send({
            status: 'ok',
            message: 'Skills in dt ExpertSkillsV1',
            skills: skillsDistinct,
        });
    } catch (err) {
        next(err);
    }
};
export { selectExpertSkillController };
