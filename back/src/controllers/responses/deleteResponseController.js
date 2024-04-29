import deleteResponseModel from "../../models/responses/deleteResponsesModel.js";

const deleteResponseController= async(req, res, next)=>{
    try {
        const {response_id}= req.params;

        const response= await de
        
    } catch (err) {
        next(err);
    }
}