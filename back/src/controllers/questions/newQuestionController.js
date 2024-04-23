import insertQuestionModel from "../../models/entries/insertQuestionModel.js";
const newQuestionController = async (req, res, next) => {

    console.log('req.insertId2: ', req.insertId);
    //console.log('req.x: ', req);
  
    try {
        const {question_title, question_description}=req.body;
        //const { text } =  req.body;
        
        if(!question_title||!question_description){
            console.error('faltan campos');
        }
        /* if (!text || text.length > 280) {
            throw  generateError('Debes enviar un texto y menor de 280 caracteres', 400);
        } */

        /* const projectId = await insertQuestionModel(
            question_title,
            question_description,
            req.insertId
        ); */

        const id = await insertQuestionModel(question_title, question_description,req.userId);

        res.status(201).send({
            status:'ok',
            message:'question ok',
            /* data:{
                project:{
                    id: projectId,
                    question_title,
                    question_description,
                    userId: req.user.id,
                    //createdAt: new Date(),
                },
            }, */
        });
    } catch (err) {
        next(err);
    }
};
export default newQuestionController;