import { generateError } from '../../helpers/generateError.js';
import { getEventByIdModel } from '../../models/events/getEventByIdModel.js';
import { deleteEventByIdModel } from '../../models/events/deleteEventByIdmodel.js';

const deleteEventController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await getEventByIdModel(id);
        if (req.userId !== event.register_id) {
            throw generateError(
                'Estas intentando borrar un evento que no es tuyo',
                401
            );
        }
        await deleteEventByIdModel(id);
        res.send({
            status: 'ok',
            message: `El evento con id ${id} fue borrado `,
            data,
        });
    } catch (error) {
        next(error);
    }
};
export { deleteEventController };
