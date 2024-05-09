import { selectAllProjectsModel } from '../../models/projects/selectAllprojectsModel.js';
const getAllProjectsController = async (req, res, next) => {
    try {
        const projects = await selectAllProjectsModel();
        //console.log('HOLA', projects);
        res.send({
            status: 'ok',
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};
export { getAllProjectsController };
