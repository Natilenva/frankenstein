import { selectAllQuestionsModel } from '../../models/questions/selectAllQuestionsModel.js';

import selectTotalNumberOfQuestionModel from '../../models/questions/selectTotalNumberOfQuestionsModel.js';

const getAllQuestionsController = async (req, res, next) => {
    try {

        let {question_title, technology, keyword, page = 1} = req.query;

        page= Number(page);

        const limit= 4;

        const offset= (page - 1) * limit;

        const totalQuestions = await selectTotalNumberOfQuestionModel();

        const totalPages = Math.ceil(totalQuestions /limit);

        const questions = await selectAllQuestionsModel(
            question_title,
            technology,
            keyword,
            req.user?.id,
            limit,
            offset,
        );

        res.send({
            status: 'ok',
            data: {
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null, 
                questions,

            },
        });
    } catch (error) {
        next(error);
    }
};
export { getAllQuestionsController };
