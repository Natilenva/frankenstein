import { createProject } from '../../../db/createProject.js';
import { getConnection } from '../../../db/db.js';
import { getProjectById } from '../../../db/getProjectById.js';
import { generateError } from '../../../helpers/generateError.js';

async function newProjectController(req, res) {
    //! Primera opción
    try {
        const { project_title, project_description } = req.body;
        console.log(project_title);
        // if (!project_title || !project_description) {
        //     throw generateError('Título y descripción deben existir', 400);
        // }
        const id = await createProject(
            project_title,
            project_description,
            req.userId
        );
        console.log(id);
        const project = await getProjectById(id);
        res.send({
            status: 'ok',
            data: project,
        });
    } catch (error) {
        throw new Error(error.message);
    }
    //! Segunda opción
    // const userInfo = req.user;
    // console.log(userInfo);
    // const { project_title, project_description } = req.body;
    // try {
    //     let connection;
    //     connection = await getConnection();
    //     const { insertId } = await connection.query(
    //         `
    //     INSERT INTO projects (project_title, project_description, register_id) VALUES (?, ?, ?)
    //     `,
    //         [project_title, project_description, userInfo.register_id]
    //     );
    //     res.send({
    //         message: 'Proyecto creado correctamente',
    //         project: {
    //             project_id: insertId,
    //             title: project_title,
    //             description: project_description,
    //         },
    //     });
    // } catch (error) {
    //     throw new Error(error.message);
    // }
}
export { newProjectController };
