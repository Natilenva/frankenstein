import { generateError } from '../../helpers/generateError.js';
import { getProjectById } from '../../models/projects/getProjectById.js';
import { deleteProjectById } from '../../models/projects/deleteProjectById.js';

const deleteProjectController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await getProjectById(id);
        if (req.userId !== project.register_id) {
            throw generateError(
                'Estas intentando borrar un proyecto que no es tuyo',
                401
            );
        }
        await deleteProjectById(id);
        res.send({
            status: 'ok',
            message: `El proyecto con id ${id} fue borrado `,
        });
    } catch (error) {
        next(error);
    }
};
export { deleteProjectController };
