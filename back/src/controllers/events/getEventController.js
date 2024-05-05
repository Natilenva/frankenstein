import selectEventByModel from '../../models/events/selectEventByModel.js';
const getEventController = async (req, res, next) => {
    try {
        const event_id = req.params;

        const eventId = await selectEventByModel(event_id.id);
        res.send({
            status: 'ok',
            data: eventId,
        });
    } catch (error) {
        next(error);
    }
};
export { getEventController };
