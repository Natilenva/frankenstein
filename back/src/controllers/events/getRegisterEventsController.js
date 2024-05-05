import { selectEventsByRegisterIdModel } from '../../models/events/selectEventsByRegisterIdModel.js';

const getRegisterEventsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await selectEventsByRegisterIdModel(id);
        if ([]) {
            console.log('Este usuario no tiene eventos creados');
        }
        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
export { getRegisterEventsController };
