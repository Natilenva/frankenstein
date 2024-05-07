import { selectAllEventsModel } from '../../models/events/selectAllEventsModel.js';
const getAllEventsController = async (req, res, next) => {
    try {
        const events = await selectAllEventsModel();
        res.send({
            status: 'ok',
            message: 'Estos son todos los eventos',
            data: events,
        });
    } catch (error) {
        next(error);
    }
};
export { getAllEventsController };
