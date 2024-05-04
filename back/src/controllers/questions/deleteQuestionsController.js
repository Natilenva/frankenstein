import selectQuestionById from '../../models/questions/selectQuestionById.js';
import deleteQuestionsModel from '../../models/questions/deleteQuestionsModel.js';
import { unauthorizedUserError } from '../../services/errorService.js';

const deleteQuestionsController = async (req, res, next) => {
    try {
        const { question_id } = req.params;

        const questions = await selectQuestionById(question_id);
      

        if (questions.user_id !== req.user.id) {
            unauthorizedUserError();
        }
     

         if(questions.response_id[true]){ 
           throw({
                    httpStatus: 400,
                    code: 'NOT_VALID_DELETE_RESPONSE',
                    message: 'La pregunta tiene respuestas',})
                };

        await deleteQuestionsModel(question_id);
        res.status(200).send({
            status: 'ok',
            message: 'pregunta eliminada',
        });

    } catch (err) {
        next(err);
    }}

export default deleteQuestionsController;
