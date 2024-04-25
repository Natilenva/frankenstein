import { profileSchema } from '../../schemas/profileSchema .js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
import { insertProfileByModel } from '../../models/profile/insertProfileByModel.js';
import { selectProfileById } from '../../models/users/selectProfileById.js';

const profileInsertController = async (req, res) => {
    const { success, data: profile, error } = profileSchema.safeParse(req.body);
    if (!success) {
        const errors = zodErrorMap(error.issues);
        return res.status(400).send({ error: errors });
    }

    // console.log('req.body): ', req.body);

    try {
        let imageFileName;
        if (req.files && req.files.avatar) {
            console.log(req.files);
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            console.log(__dirname);
            const uploadsDir = path.join(__dirname, '../uploads');
            console.log(uploadsDir);
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.avatar.data);
            image.resize(500);
            imageFileName = `${nanoid(24)}.jpg`;
            console.log(imageFileName);
            await image.toFile(path.join(uploadsDir, imageFileName));
        }

        const {
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            profile_role,
            company_name,
            register_id,
        } = profile;
        await selectProfileById(register_id);

        await insertProfileByModel(
            imageFileName,
            profile_name,
            profile_lastname,
            profile_username,
            birthdate,
            profile_role,
            company_name,
            req.userId
        );
        res.send('Perfil creado');
    } catch (error) {
        console.log(error);
    }
};

export { profileInsertController };
