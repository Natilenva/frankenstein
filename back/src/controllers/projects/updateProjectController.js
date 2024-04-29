import { projectSchema } from '../../schemas/projectShema.js';
import updateProjectModel from '../../models/projects/updateProjectModel.js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
const updateProjectController = async (req, res) => {
    try {
        const { register_id } = req.user;
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
            console.log(req.files);
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            console.log(__dirname);
            const uploadsDir = path.join(__dirname, '../uploadsProjectPhoto');
            console.log(uploadsDir);
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.project_photo.data);
            image.resize(500);
            imageFileName = `${nanoid(24)}.jpg`;
            console.log(imageFileName);
            await image.toFile(path.join(uploadsDir, imageFileName));
        }
        const {
            project_title,
            project_description,
            project_photo,
            project_url,
        } = project;
        console.log(project);
        const updateProject = await updateProjectModel(
            project_title,
            project_description,
            imageFileName,
            project_url,
            req.userId
        );
        console.log(updateProject);
        res.status(201).send({
            status: 'ok',
            message: 'update project in db',
            data: {
                project: {
                    projectId: updateProject,
                    project_title,
                    project_description,
                    project_photo,
                    project_url,
                    userId: req.userId,
                    createdAt: new Date(),
                },
            },
        });
    } catch (error) {
        console.error(error.message);
    }
};
export { updateProjectController };
