import { profileSchema } from '../../schemas/profileSchema .js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
import { insertProfileByModel } from '../../models/profile/insertProfileByModel.js';

import { getProfileByIdModel } from '../../models/profile/getProfileByIdModel.js';
import { generateError } from '../../helpers/generateError.js';
const profileInsertController = async (req, res, next) => {
    const { success, data: profile, error } = profileSchema.safeParse(req.body);
    if (!success) {
        const errors = zodErrorMap(error.issues);
        return res.status(400).send({ error: errors });
    }

    try {
        let imageFileName;
        if (req.files && req.files.avatar) {
            console.log(req.files);
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            console.log(__dirname);
            const uploadsDir = path.join(__dirname, '../uploadsAvatar');
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
        } = profile;

        const profileExists = await getProfileByIdModel(req.userId);
        console.log(profileExists);
        if (profileExists) {
            return res.status(400).send({
                httpStatus: '400',
                code: 'PROFILE_ALREADY_EXISTS',
                message: 'Ya existe un perfil asociado a este registro',
            });
        }

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
        res.send({
            httpStatus: '201',
            code: 'PROFILE_CREATED',
            message: 'Perfil creado',
        });
    } catch (error) {
        next(error);
    }
};

export { profileInsertController };
