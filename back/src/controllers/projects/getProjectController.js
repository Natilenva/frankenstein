import selectProjectByModel from '../../models/projects/selectProjectbyModel.js';

const getProjectController = async (req, res, next) => {
    try {
        const project_id = req.params;
        console.log(project_id.id);

        const projectId = await selectProjectByModel(project_id.id);
        res.send({
            status: 'ok',
            data: projectId,
        });
        console.log(projectId);
    } catch (error) {
        next(error);
    }
};
export { getProjectController };
