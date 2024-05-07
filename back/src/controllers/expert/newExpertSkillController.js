import { zodErrorMap } from '../../helpers/zodError.js';
import insertExpertSkillModel from '../../models/skills/insertExpertSkillModel.js';
import { skillExpertSchema } from '../../schemas/skillExpertSchema.js';

const newExpertSkillController = async (req, res, next) => {
    try {
        // validation schema with zod
        const {
            success,
            data: skillDataBody,
            error,
        } = skillExpertSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        // validated field
        const { idSkill, expertUserId } = skillDataBody;

        // insert skill
        const id = await insertExpertSkillModel(idSkill, expertUserId);

        // send response
        res.status(201).send({
            status: 'ok',
            message: 'insert skill in db',
            data: {
                skill_id: id,
                userId: req.userId,
                createdAt: new Date(),
            },
        });
    } catch (err) {
        next(err);
    }
};
export default newExpertSkillController;
