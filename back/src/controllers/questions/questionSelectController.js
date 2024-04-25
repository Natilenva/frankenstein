import selectQuestionById2 from "../../models/entries/selectQuestionById2.js";

const questionSelectController = async (req, res, next) => {
    console.log('req.params', req.params);

    try {
        const questionParamId = req.params.id;
        console.log('questionParamId: ', questionParamId);

        /* const { id } = req.params;
        console.log('id: ', id); */
  
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