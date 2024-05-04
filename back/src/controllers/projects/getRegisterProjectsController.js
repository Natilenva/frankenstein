import { getProjectsByRegisterIdModel } from '../../models/projects/getProjectsByRegisterIdModel.js';
const getRegisterProjectsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getProjectsByRegisterIdModel(id);
        if ([]) {
            console.log('Este usuario no tiene proyectos');
        }
        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
export { getRegisterProjectsController };
