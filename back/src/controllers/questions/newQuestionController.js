import { zodErrorMap } from '../../helpers/zodErrorMap.js';
import { questionSchema } from '../../schemas/questionShema.js';
import insertQuestionModel from '../../models/entries/insertQuestionModel.js';

const newQuestionController = async (req, res, next) => {
    try {
        // validation schema with zod
        const {
            success,
            data: questionDataBody,
            error,
        } = questionSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }
        // validated fields
        const { question_title, question_description, technology } =
            questionDataBody;
        console.log(questionDataBody);
        // insert question
        const id = await insertQuestionModel(
            question_title,
            question_description,
            technology,
            req.userId
        );

        // send response
        res.status(201).send({
            status: 'ok',
            message: 'Pregunta creada',
            data: {
                questionId: id,
                question_title,
                question_description,
                technology,
                userId: req.userId,
            },
        });
    } catch (err) {
        next(err);
    }
};
export default newQuestionController;
