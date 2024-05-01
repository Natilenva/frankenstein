import { zodErrorMap } from "../../helpers/zodError.js";
import insertSkillModel from "../../models/skills/insertSkillModel.js";
import { skillSchema } from "../../schemas/skillSchema.js";

const newExpertSkillController = async (req, res, next) => {

    try {
        // validation schema with zod
        const { success, data: skillDataBody, error } = skillSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }
        const { skill } = skillDataBody; // validated field

        // insert skill
        const id = await insertSkillModel(skill ,req.userId);

        // send response
        res.status(201).send({
            status:'ok',
            message:'insert skill in db',
            data:{
                skill_id: id,
                skill,
                userId: req.userId,
            },
        });
        
    } catch (err) {
        next(err);
    }
};
export default newExpertSkillController;
