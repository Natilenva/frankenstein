//import { zodErrorMap } from "../../helpers/zodError.js";
import { zodErrorMap } from "../../helpers/zodErrorMap.js";
import { questionSchema } from "../../schemas/questionShema.js";
import insertQuestionModel from "../../models/entries/insertQuestionModel.js";

const newQuestionController = async (req, res, next) => {
    console.log('req.insertId2: ', req.userId);

    try {

        // TODO delete this old validation
        //const {question_title, question_description}=req.body;
        
        // validation fields
        /* if(!question_title||!question_description){
            console.error('faltan campos');
        } */
        // validation length
        /* if (question_description > 280) {
            throw  generateError('Debes enviar un texto menor de 280 caracteres', 400);
        } */

        // validation schema with zod
        const { success, data: questionDataBody, error } = questionSchema.safeParse(req.body);
        console.log('questionDataBody:', questionDataBody); // Add this line
        console.log('error:', error); // Add this line

        if (!success) {
            const errors = zodErrorMap(error.issues);
            console.log('errors:', errors);
            return res.status(400).send({ error: errors });
        }

        // validated fields
        const { question_title, question_description } = questionDataBody;

        // insert question
        const id = await insertQuestionModel(question_title, question_description,req.userId);

        // send response
        res.status(201).send({
            status:'ok',
            message:'insert question in db',
            data:{
                question:{
                    questionId: id,
                    question_title,
                    question_description,
                    userId: req.userId,
                    createdAt: new Date(),
                },
            },
        });
    
    } catch (err) {
        next(err);
    }
};
export default newQuestionController;