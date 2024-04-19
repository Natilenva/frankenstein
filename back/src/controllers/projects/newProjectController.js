import { createProject } from '../../../db/createProject.js';
import { getProjectById } from '../../../db/getProjectById.js';
import { generateError } from '../../../helpers/generateError.js';

async function newProjectController(req, res) {
    const { title, description } = req.body;
    console.log(title);
    // if (!title || !description) {
    //     throw generateError('Título y descripción deben existir', 400);
    // }
    const id = await createProject(title, description, req.userId);
    console.log(id);
    const project = await getProjectById(id);
    res.send({
        status: 'ok',
        data: project,
    });
    // } catch (error) {
    //     throw generateError('Error', 400);
    // }
}
export { newProjectController };
