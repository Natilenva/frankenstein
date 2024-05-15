import selectProjectByModel from '../../models/projects/selectProjectbyModel.js';

const getProjectController = async (req, res, next) => {
    try {
        const project_id = req.params;
        // console.log(project_id.id);

        const projectById = await selectProjectByModel(project_id.id);
        console.log('projectById: ', projectById);

        res.send({
            status: 'ok',
            message: 'select project by id',
            data: {
                project_id: projectById.project_id,
                project_title: projectById.project_title,
                project_description: projectById.project_description,
                project_photo: projectById.project_photo,
                project_url: projectById.project_url,
                created_at: projectById.created_at,
              }
        });
        
    } catch (error) {
        next(error);
    }
};
export { getProjectController };
