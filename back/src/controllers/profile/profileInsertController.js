import { profileSchema } from '../../schemas/profileSchema .js';
import { zodErrorMap } from '../../helpers/zodError.js';
import { createPathIfNotExists } from '../../helpers/createpath.js';
import sharp from 'sharp';
import url from 'url';
import path from 'node:path';
import { nanoid } from 'nanoid';
import { insertProfileByModel } from '../../models/profile/insertProfileByModel.js';

import { getProfileByIdModel } from '../../models/profile/getProfileByIdModel.js';
import { validateProfileRole } from '../../models/profile/insertProfileByModel.js';
// import newCompanyController from '../company/newCompanyController.js';
// import { generateError } from '../../helpers/generateError.js';
const profileInsertController = async (req, res, next) => {
    const { success, data: profile, error } = profileSchema.safeParse(req.body);
    if (!success) {
        const errors = zodErrorMap(error.issues);
        return res.status(400).send({ error: errors });
    }

    try {
        let imageFileName;
        if (req.files && req.files.avatar) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const uploadsDir = path.join(__dirname, '../../../uploads');
            await createPathIfNotExists(uploadsDir);
            const image = sharp(req.files.avatar.data);
            image.resize(300);
            imageFileName = `${nanoid(24)}.jpg`;
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

        if (profileExists) {
            return res.status(400).send({
                httpStatus: '400',
                code: 'PROFILE_ALREADY_EXISTS',
                message: 'Ya existe un perfil asociado a este registro',
            });
        }
        console.log('profile_role: ' + profile_role);
        const msgCompany = await validateProfileRole(
            profile_role,
            company_name,
            req.userId
        );
        const profile_id = await insertProfileByModel(
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

            data: {
                profile_id,
            },

            // message: msgCompany,
        });
    } catch (error) {
        next(error);
    }
};

export { profileInsertController };
