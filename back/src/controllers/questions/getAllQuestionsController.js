import { selectAllQuestionsModel } from '../../models/questions/selectAllQuestionsModel.js';
const getAllQuestionsController = async (req, res, next) => {
    try {
        const questions = await selectAllQuestionsModel();
        res.send({
            status: 'ok',
            data: questions,
        });
    } catch (error) {
        next(error);
    }
};
export { getAllQuestionsController };
