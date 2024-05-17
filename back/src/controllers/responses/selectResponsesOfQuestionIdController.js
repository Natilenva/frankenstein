
import selectAllResponsesOfQuestionIdModel from "../../models/responses/selectAllResponsesOfQuestionModel.js";
const selectAllResponsesOfQuestionIdController = async(req, res, next)=>{
    try {
        const {question_id}= req.params;
        const respuestas = await selectAllResponsesOfQuestionIdModel(question_id);
    
        res.send({
            status: 'ok',
            respuestas,
        })
        
        
    } catch (error) {
        next(error);
    };

}

export default selectAllResponsesOfQuestionIdController;