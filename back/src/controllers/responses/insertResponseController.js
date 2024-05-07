import { zodErrorMap } from '../../helpers/zodErrorMap.js';
import insertResponseModel from '../../models/responses/insertResponseModel.js';
import { responseSchema } from '../../schemas/responseSchema.js';

const insertResponseController = async (req, res, next) => {
    const { questionID } = req.params;

    try {
        // validation schema with zod
        const {
            success,
            data: questionDataBody,
            error,
        } = responseSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }
        const { response_text } = questionDataBody; // validated field

        // insert response
        const id = await insertResponseModel(
            response_text,
            req.userId,
            questionID
        );

        // send response
        res.status(201).send({
            status: 'ok',
            message: 'insert response in db',
            data: {
                resposeID: id,
                questionID: questionID,
                userId: req.userId,
                response_text,
            },
        });
    } catch (err) {
        next(err);
    }
};
export default insertResponseController;
