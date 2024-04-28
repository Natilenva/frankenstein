import { zodErrorMap } from "../../helpers/zodErrorMap.js";
import insertResponseModel2 from "../../models/responses/insertResponseModel2.js";
import { responseSchema } from "../../schemas/responseSchema.js";

const insertResponseController2 = async (req, res, next) => {

    const { questionID, profileID} = req.params;

    try {
        // validation schema with zod
        const { success, data: questionDataBody, error } = responseSchema.safeParse(req.body);

        if (!success) {
            const errors = zodErrorMap(error.issues);
            console.log('errors:', errors);
            return res.status(400).send({ error: errors });
        }
        // validated field
        const { response_text } = questionDataBody;
 
        // insert response
        const id = await insertResponseModel2(response_text, profileID, questionID);

        // send response
        res.status(201).send({
            status:'ok',
            message:'insert response in db',
            data:{
                response:{
                    resposeID: id,
                    questionID: questionID,
                    profileID: profileID,
                    response_text,
                    createdAt: new Date(),
                },
            },
        });
    
    } catch (err) {
        next(err);
    }
};
export default insertResponseController2;