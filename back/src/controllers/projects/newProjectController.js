import { zodErrorMap } from '../../helpers/zodError.js';
import { projectSchema } from '../../schemas/projectShema.js';
import insertProjectModel from '../../models/projects/insertProjectModel.js';
import selectUserByIdModel from '../../models/users/selectUserById.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
const newProjectController = async (req, res, next) => {
    try {
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

        // validated fields
        const {
            project_title,
            project_description,
            project_photo,
            project_url,
        } = project;
        console.log(project);

        const id = await insertProjectModel(
            project_title,
            project_description,
            imageFileName,
            project_url,
            req.userId
        ); //Busca el email del usuario desde BBDD
        let email = '';
        const users = await selectUserByIdModel(req.userId);
        console.log('req.userId: ' + req.userId + ', email: ' + users);
        if (users != null) {
            //console.log('email: ', users.email);
            email = users.email;
        }
        res.status(201).send({
            status: 'ok',
            message: 'insert project in db',
            data: {
                /* project: {
                    projectId: id,
                    project_title,
                    project_description,
                    project_photo,
                    project_url,
                    userId: req.userId,
                    createdAt: new Date(),
                }, */
                project_id: id,
                project_title,
                project_description,
                project_photo,
                project_url,
                project_photo: imageFileName,
                userId: req.userId,
                register_id: req.userId,
                email: email,
                created_at: new Date(),
            },
        });
    } catch (err) {
        next(err);
    }
};
export default newProjectController;
