import { getQuestionsByRegisterIdModel } from '../../models/questions/getQuestionsbyRegisterIdModel.js';
const getRegisterQuestionsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getQuestionsByRegisterIdModel(id);
        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
export { getRegisterQuestionsController };
