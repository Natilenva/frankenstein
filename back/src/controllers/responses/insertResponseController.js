import selectQuestionsByIdModels from "../../models/questions/selectQuestionsByIdModels.js";
import insertResponseModel from "../../models/responses/insertResponseModel.js";
import { missingFieldsError } from "../../services/errorService.js";

const insertResponseController=async(req, res, next)=> {
try {
    const{question_id}=req.params;
    const[response_text]=req.body;
    const question=await selectQuestionsByIdModels(question_id);
    if (!response_text) {missingFieldsError();
        
    }
    const insertResponseModel= await insertResponseModel(response_text, question_id, req.user.id);
    req.status(201).sent({
        status:'ok',
        data:{
            question:{
                response: response_text, 
            },
        },
    })
} catch (error) {
    next(error)
}

};

export default insertResponseController;