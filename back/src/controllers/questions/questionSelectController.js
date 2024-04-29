import selectQuestionById2 from "../../models/questions/selectQuestionById2.js";

const questionSelectController = async (req, res, next) => {

    try {
        const questionParamId = req.params.id;
  
        // select question
        const questionSelected = await selectQuestionById2(questionParamId);
  
        // send response
        res.send({
          status: 'ok',
          data: questionSelected
  
        });
        
      } catch (error) {
        next(error);
      }
    };
//  export default questionSelectController
export { questionSelectController };