import selectProjectByModel from '../../models/projects/selectProjectbyModel.js';
import { selectUserForContextById } from '../../models/users/selectUserForContextById.js';

const getProjectController = async (req, res, next) => {
    try {
        const project_id = req.params;
        // console.log(project_id.id);

        // Get project by id
        const projectById = await selectProjectByModel(project_id.id);
        //console.log('projectById: ', projectById);

        // desestructurar projectById
        const { 
            project_title, project_description, project_photo, project_url, created_at, register_id 
        } = projectById;
        

        // Get email of project owner
        const user = await selectUserForContextById(projectById.register_id);

        const {email, usernameOfRegister} = user;

        res.send({
            status: 'ok',
            message: 'select project by id',
            data: {
                project_id: project_id,
                project_title: project_title,
                project_description: project_description,
                project_photo: project_photo,
                project_url: project_url,
                created_at: created_at,
                register_id: register_id,
                email,
                usernameOfRegister,
              }
        });
        
    } catch (error) {
        next(error);
    }
};
export { getProjectController };
