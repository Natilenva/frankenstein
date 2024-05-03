import selectResponseByIdModel from '../../models/responses/selectResponseByIdModel.js';
import deleteResponseModel from '../../models/responses/deleteResponsesModel.js';
import { unauthorizedUserError } from '../../services/errorService.js';

const deleteResponseController = async (req, res, next) => {
    try {
        const { response_id } = req.params;

        const response = await selectResponseByIdModel(response_id);

        if (response.register_id !== req.user.id) {
            unauthorizedUserError();
        }

        //  if(response.vote_response_id[0]){
        await deleteResponseModel(response_id);
        res.send({
            status: 'ok',
            message: 'Respuesta eliminada',
        });
        // } else{
        //     res.send({
        //         httpStatus: 400,
        //         code: 'NOT_VALID_DELETE_RESPONSE',
        //         message: 'La respuesta tiene votos',
        //     });
        //   };
    } catch (err) {
        next(err);
    }
};
export default deleteResponseController;
