import { selectUserForContextById } from '../../models/users/selectUserForContextById.js';
const getMeController = async (req, res, next) => {
    try {
        //const user = await selectUserForContextById(req.userId, false);
        const user = await selectUserForContextById(req.userId);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
export { getMeController };
