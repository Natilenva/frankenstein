import selectQuestionById from "../../models/questions/selectQuestionById.js";

const questionSelectController = async (req, res, next) => {

    try {
        const {id} = req.params;
  
        // select question
        const questionSelected = await selectQuestionById(id);

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