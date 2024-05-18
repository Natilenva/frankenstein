import selectProjectByModel from '../../models/projects/selectProjectbyModel.js';
import { selectUserForContextById } from '../../models/users/selectUserForContextById.js';

const getProjectController = async (req, res, next) => {
    try {
        const project_id = req.params;
        // console.log(project_id.id);

        // Get project by id
        const projectById = await selectProjectByModel(project_id.id);
        //console.log('projectById: ', projectById);

        // Get email of project owner
        const user = await selectUserForContextById(projectById.register_id);
        const email = user.email; 

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
                register_id: projectById.register_id,
                email,
              }
        });
        
    } catch (error) {
        next(error);
    }
};
export { getProjectController };
