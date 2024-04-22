import insertQuestionModel from "../../models/entries/insertQuestionModel.js";
const newQuestionController = async (req, res, next) => {
  
    try {
        const {question_title, question_description}=req.body;
        
        if(!question_title||!question_description){
            console.error('faltan campos');
        }
        const projectId = await insertQuestionModel(
            question_title,
            question_description,
            req.user.id,
        );
        res.status(201).send({
            status:'ok',
            message:'question ok',
            data:{
                project:{
                    id: projectId,
                    question_title,
                    question_description,
                    userId: req.user.id,
                    //createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};
export default newQuestionController;