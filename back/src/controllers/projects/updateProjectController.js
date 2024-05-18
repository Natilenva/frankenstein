import { projectSchema } from '../../schemas/projectShema.js';
import updateProjectModel from '../../models/projects/updateProjectModel.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
import selectUserByIdModel from '../../models/users/selectUserById.js';
const updateProjectController = async (req, res, next) => {
    try {
        const { project_id } = req.params;
        const {
            success,
            data: project,
            error,
        } = projectSchema.safeParse(req.body);
        if (!success) {
            const errors = zodErrorMap(error.issues);
            return res.status(400).send({ error: errors });
        }

        let imageFileName;
        if (req.files && req.files.project_photo) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const uploadsDir = path.join(__dirname, '../../../uploads');
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.project_photo.data);
            image.resize(500);
            imageFileName = `${nanoid(24)}.jpg`;
            await image.toFile(path.join(uploadsDir, imageFileName));
        }
        const {
            project_title,
            project_description,
            project_photo,
            project_url,
        } = project;

        const updateProject = await updateProjectModel(
            project_title,
            project_description,
            imageFileName,
            project_url,
            project_id
        );
        //console.log('updateProject:', updateProject);
        //console.log('project:', project);
        //console.log('imageFileName:', imageFileName);
        //console.log('req.userId:', req.userId);

        //Busca el email del usuario desde BBDD
        let email = '';
        const users = await selectUserByIdModel(req.userId);
        if (users != null) {
            //console.log('email: ', users.email);
            email = users.email;
        }

        res.status(201).send({
            status: 'ok',
            message: 'update project in db',
            data: {
                project_title,
                project_description,
                project_photo,
                project_url,
                project_id,
                createdAt: new Date(),
                project_photo: imageFileName,
                userId: req.userId,
                register_id: req.userId,
                email: email,
            },
        });
    } catch (error) {
        next(error);
    }
};
export { updateProjectController };
