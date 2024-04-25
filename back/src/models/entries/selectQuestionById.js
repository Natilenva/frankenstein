import selectQuestionById2 from "./selectQuestionById2.js";

const selectQuestionById = async (req, res, next) => {
    console.log('req.params', req.params);

    try {
      const { id } = req.params;
      console.log('id: ', id);

      // select question
      const questionSelected = await selectQuestionById2(id);

      // send response
      res.send({
        status: 'ok',
        data: questionSelected

      });
      
    } catch (error) {
      next(error);
    }
  };
  export default selectQuestionById