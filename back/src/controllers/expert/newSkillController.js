import { zodErrorMap } from '../../helpers/zodError.js';
import insertSkillModel from '../../models/skills/insertSkillModel.js';
import { skillSchema } from '../../schemas/skillSchema.js';

const newSkillController = async (req, res, next) => {
    try {
        // validation schema with zod
        const {
            success,
            data: skillDataBody,
            error,
        } = skillSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }
        // validated field
        const { skill, description } = skillDataBody;

        console.log(skill);
        console.log(description);
        // insert skill
        const id = await insertSkillModel(skill, description);

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
export default newSkillController;
