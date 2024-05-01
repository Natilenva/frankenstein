import selectQuestionById from "../../models/questions/selectQuestionById.js";

const questionSelectController = async (req, res, next) => {

    try {
        const questionParamId = req.params.id;
  
        // select question
        const questionSelected = await selectQuestionById(questionParamId);

        // send response
        res.status(200).send({
            status: 'ok',
            data: {
              questionSelected
            }
        });
        
      } catch (error) {
        next(error);
      }
};
export { questionSelectController };